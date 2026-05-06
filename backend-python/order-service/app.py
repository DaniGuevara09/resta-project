from flask import Flask, request, jsonify
from sqlalchemy import text
from models import db, Order, OrderItem
from auth_utils import token_required
from kafka_utils import send_order_event
from config import SQLALCHEMY_DATABASE_URI, DB_SCHEMA

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
db.init_app(app)

@app.route('/orders', methods=['POST'])
@token_required(allowed_roles=["waiter"])
def create_order():
    data = request.get_json()
    new_order = Order(table_id=data['table_id'])
    db.session.add(new_order)
    db.session.commit()

    for item in data['items']:
        oi = OrderItem(order_id=new_order.id, product_id=item['id'], quantity=item['qty'])
        db.session.add(oi)
    
    db.session.commit()
    
    # Notificar a Kafka para que el Chef sepa
    send_order_event("NEW_ORDER", new_order.to_json())
    
    return jsonify(new_order.to_json()), 201

@app.route('/orders/<int:id>/status', methods=['PUT'])
@token_required(allowed_roles=["chef"])
def update_status(id):
    order = Order.query.get(id)
    order.status = request.get_json()['status']
    db.session.commit()
    
    send_order_event("STATUS_UPDATED", order.to_json())
    return jsonify(order.to_json()), 200

if __name__ == '__main__':
    with app.app_context():
        db.session.execute(text(f"CREATE SCHEMA IF NOT EXISTS {DB_SCHEMA}"))
        db.session.commit()
        db.create_all()
    app.run(host='0.0.0.0', port=5002, debug=True)