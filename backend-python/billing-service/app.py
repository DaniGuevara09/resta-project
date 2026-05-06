from flask import Flask, jsonify
from sqlalchemy import text
import threading
from models import db, Invoice
from auth_utils import token_required
from config import SQLALCHEMY_DATABASE_URI, DB_SCHEMA
from kafka_consumer import start_consumer

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
db.init_app(app)

@app.route('/invoices', methods=['GET'])
@token_required(allowed_roles=["admin"]) # Solo un administrador/cajero ve la plata
def get_invoices():
    invoices = Invoice.query.all()
    return jsonify([i.to_json() for i in invoices]), 200

if __name__ == '__main__':
    with app.app_context():
        db.session.execute(text(f"CREATE SCHEMA IF NOT EXISTS {DB_SCHEMA}"))
        db.session.commit()
        db.create_all()

    hilo_kafka = threading.Thread(target=start_consumer, args=(app,), daemon=True)
    hilo_kafka.start()

    app.run(host='0.0.0.0', port=5003, debug=False)