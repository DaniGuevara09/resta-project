import express from 'express';
import {
  createOrder,
  getOrders,
  updateOrderStatus
} from '../controllers/order-controller.js';

const router = express.Router();

export default (keycloak) => {

  // Público (cliente)
  router.post('/', createOrder);

  // Protegidos
  router.get('/', keycloak.protect(), getOrders);
  router.put('/:id/status', keycloak.protect(), updateOrderStatus);

  return router;
};