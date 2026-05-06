import express from 'express';
import cors from 'cors';
import session from "express-session";
import Keycloak from "keycloak-connect";
import productRoutes from './routes/product-routes.js';

const app = express(); 

//  Sesión (requerida por keycloak-connect)
const memoryStore = new session.MemoryStore();

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

//  Configuración de Keycloak
const keycloak = new Keycloak({ store: memoryStore }, {
  realm: "Restaurant",
  "auth-server-url": "http://10.206.193.130:8082",
  resource: "restaurantPy",
  credentials: {
    secret: "2CGAtYqKPdj5LZrGK6d2tFLGRdafML16"
  }
});

//  Middleware Keycloak
app.use(keycloak.middleware());

//  Middlewares base
app.use(cors());
app.use(express.json());

//  Rutas
app.use('/api/products', productRoutes(keycloak)); 

//  Servidor
app.listen(3001, () => {
  console.log('Product Service running on port 3001');
});

