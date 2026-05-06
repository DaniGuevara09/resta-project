from kafka import KafkaConsumer
import json
import os
import requests
from models import db, Invoice
from config import PRODUCT_SERVICE_URL, KAFKA_SERVER

def start_consumer(app):
    print("Iniciando oyente de facturación en Kafka...")
    
    try:
        consumer = KafkaConsumer(
            'restaurant.orders',
            bootstrap_servers=[KAFKA_SERVER],
            value_deserializer=lambda m: json.loads(m.decode('utf-8')),
            group_id='billing-group'
        )

        for message in consumer:
            event = message.value
            
            if event.get('type') == 'STATUS_UPDATED':
                order = event.get('order')
                
                if order.get('status') == 'LISTO':
                    print(f"[*] Pedido {order['id']} listo. Calculando factura...")
                    
                    with app.app_context():
                        if Invoice.query.filter_by(order_id=order['id']).first():
                            continue
                        
                        try:
                            resp = requests.get(f"{PRODUCT_SERVICE_URL}/products")
                            if resp.status_code == 200:
                                catalog = {p['id']: p['price'] for p in resp.json()}
                            else:
                                catalog = {}
                        except Exception as e:
                            print(f"[!] Error contactando a product-service: {e}")
                            catalog = {}

                        total = sum(catalog.get(item['product_id'], 0) * item['quantity'] for item in order['items'])

                        new_invoice = Invoice(order_id=order['id'], total=total)
                        db.session.add(new_invoice)
                        db.session.commit()
                        print(f"[+] Factura creada con éxito. Total: ${total}")
                        
    except Exception as e:
        print(f"Error fatal en el consumidor de Kafka: {e}")