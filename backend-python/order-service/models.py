from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

db = SQLAlchemy()
SCHEMA = os.getenv('DB_SCHEMA')

class Order(db.Model):
    __tablename__ = "orders"
    __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    table_id = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(50), default="RECIBIDO") # RECIBIDO, PREPARANDO, LISTO
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    items = db.relationship('OrderItem', backref='order', lazy=True)

    def to_json(self):
        return {
            "id": self.id,
            "table_id": self.table_id,
            "status": self.status,
            "items": [item.to_json() for item in self.items]
        }

class OrderItem(db.Model):
    __tablename__ = "order_items"
    __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey(f'{SCHEMA}.orders.id'), nullable=False)
    product_id = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    def to_json(self):
        return {"product_id": self.product_id, "quantity": self.quantity}