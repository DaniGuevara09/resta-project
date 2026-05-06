from kafka import KafkaProducer
import json
import os

def get_producer():
    return KafkaProducer(
        bootstrap_servers=[f"{os.getenv('DANI_PC_IP')}:9092"],
        value_serializer=lambda v: json.dumps(v).encode('utf-8')
    )

producer = get_producer()

def send_order_event(event_type, order_data):
    event = {"type": event_type, "order": order_data}
    producer.send("restaurant.orders", value=event)
    producer.flush()