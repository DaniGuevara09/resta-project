import express from 'express';
import {
  createInvoice,
  getInvoices,
  payInvoice
} from '../controllers/billing-controller.js';

const router = express.Router();

export default (keycloak) => {

  // protegido (cajero)
  router.post('/', keycloak.protect(), createInvoice);

  router.get('/', keycloak.protect(), getInvoices);

  router.put('/:id/pay', keycloak.protect(), payInvoice);

  router.get('/:id', keycloak.protect(), getOrderById);

  return router;
};