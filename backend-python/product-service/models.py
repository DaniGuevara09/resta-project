from flask_sqlalchemy import SQLAlchemy
from config import DB_SCHEMA

db = SQLAlchemy()

class Product(db.Model):
    __tablename__ = "products"
    __table_args__ = {'schema': DB_SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    price = db.Column(db.Float, nullable=False)
    availability = db.Column(db.Boolean, default=True)

    def to_json(self):
        return {
            "id": self.id, 
            "name": self.name, 
            "description": self.description,
            "price": self.price, 
            "availability": self.availability
        }