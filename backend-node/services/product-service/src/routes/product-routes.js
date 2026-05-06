import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/product-controller.js';

export default function (keycloak) {
  const router = express.Router();

  //  Públicas (cliente)
  router.get('/', getProducts);
  router.get('/:id', getProductById);

  //  Protegidas (requieren login)
  router.post('/', keycloak.protect(), createProduct);
  router.put('/:id', keycloak.protect(), updateProduct);
  router.delete('/:id', keycloak.protect(), deleteProduct);

  return router;
}