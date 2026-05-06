from functools import wraps
from flask import request, jsonify
from keycloak import KeycloakOpenID
import os
from dotenv import load_dotenv

load_dotenv()

keycloak_openid = KeycloakOpenID(
    server_url=f"http://{os.getenv('DANI_PC_IP')}:{os.getenv('KEYCLOAK_PORT')}",
    client_id=os.getenv('KEYCLOAK_CLIENT'),
    realm_name="Restaurant",
    client_secret_key=os.getenv('KEYCLOAK_SECRET')
)

def token_required(allowed_roles=None):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            auth_header = request.headers.get("Authorization")
            if not auth_header or not auth_header.startswith("Bearer "):
                return jsonify({"error": "Falta el token de autorización"}), 401
            
            token = auth_header.split(" ")[1]
            try:
                token_info = keycloak_openid.decode_token(token)
                
                client_id = os.getenv('KEYCLOAK_CLIENT')
                user_roles = token_info.get("resource_access", {}).get(client_id, {}).get("roles", [])
                
                if allowed_roles:
                    if not any(role in user_roles for role in allowed_roles):
                        return jsonify({"error": "No tienes permisos para esta acción"}), 403
                
                return f(*args, **kwargs)
            except Exception as e:
                return jsonify({"error": f"Token inválido: {str(e)}"}), 401
        return decorated
    return decorator