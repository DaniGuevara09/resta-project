import os
from dotenv import load_dotenv

load_dotenv()

DANI_IP = os.getenv('DANI_PC_IP')
KAFKA_SERVER = f"{DANI_IP}:{os.getenv('KAFKA_PORT')}"
KEYCLOAK_URL = f"http://{DANI_IP}:{os.getenv('KEYCLOAK_PORT')}"

DB_USER, DB_PASS = os.getenv('DB_USER'), os.getenv('DB_PASS')
DB_HOST, DB_NAME = os.getenv('DB_HOST'), os.getenv('DB_NAME')
DB_SCHEMA = os.getenv('DB_SCHEMA')

SQLALCHEMY_DATABASE_URI = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:5432/{DB_NAME}"