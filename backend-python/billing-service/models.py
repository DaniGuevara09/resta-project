from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

db = SQLAlchemy()
SCHEMA = os.getenv('DB_SCHEMA')

class Invoice(db.Model):
    __tablename__ = "invoices"
    __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    order_id = db.Column(db.Integer, unique=True, nullable=False) # Conecta lógicamente con order-service
    total = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default="GENERADA")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_json(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "total": self.total,
            "status": self.status,
            "date": self.created_at.isoformat()
        }