import express from 'express';
import cors from 'cors';
import session from "express-session";
import Keycloak from "keycloak-connect";
import orderRoutes from './routes/order-routes.js';


const app = express();

const memoryStore = new session.MemoryStore();

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

const keycloak = new Keycloak({ store: memoryStore }, {
  realm: "Restaurant",
  "auth-server-url": "http://10.206.193.130:8082",
  resource: "restaurantPy",
  credentials: {
    secret: "2CGAtYqKPdj5LZrGK6d2tFLGRdafML16"
  }
});

app.use(keycloak.middleware());

app.use(cors());
app.use(express.json());

app.use('/api/orders', orderRoutes(keycloak));

app.listen(3002, () => {
  console.log('Order Service running on port 3002');
});

