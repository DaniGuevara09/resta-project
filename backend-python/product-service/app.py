from sqlalchemy import text
from flask import Flask, request, jsonify
from models import db, Product
from auth_utils import token_required
from config import SQLALCHEMY_DATABASE_URI, DB_SCHEMA

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar Base de Datos
db.init_app(app)

# --- ENDPOINTS ---
# Obtener todos los productos
@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([p.to_json() for p in products]), 200

# Crear un producto (Admin)
@app.route('/products', methods=['POST'])
@token_required(allowed_roles=["admin"])
def create_product():
    data = request.get_json()
    
    if not all(k in data for k in ("name", "price")):
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    new_product = Product(
        name=data['name'],
        price=data['price'],
        description=data.get('description', ""),
        availability=data.get('availability', True)
    )
    
    db.session.add(new_product)
    db.session.commit()
    
    return jsonify(new_product.to_json()), 201

# Editar un producto (Admin)
@app.route('/products/<int:id>', methods=['PUT'])
@token_required(allowed_roles=["admin"])
def update_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"error": "Producto no encontrado"}), 404

    data = request.get_json()
    product.name = data.get('name', product.name)
    product.price = data.get('price', product.price)
    product.description = data.get('description', product.description)
    product.availability = data.get('availability', product.availability)

    db.session.commit()
    return jsonify(product.to_json()), 200

# Eliminar un producto (Admin)
@app.route('/products/<int:id>', methods=['DELETE'])
@token_required(allowed_roles=["admin"])
def delete_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"error": "Producto no encontrado"}), 404

    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Producto eliminado"}), 200

if __name__ == '__main__':
    with app.app_context():
        db.session.execute(text(f"CREATE SCHEMA IF NOT EXISTS {DB_SCHEMA}"))
        db.session.commit()
        db.create_all() 
    
    app.run(host='0.0.0.0', port=5001, debug=True)