import * as productService from '../services/product-service.js';

export const createProduct = async (req, res) => {
  const product = await productService.create(req.body);
  res.json(product);
};

export const getProducts = async (req, res) => {
  const products = await productService.getAll();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await productService.getById(req.params.id);
  res.json(product);
};

export const updateProduct = async (req, res) => {
  const product = await productService.update(req.params.id, req.body);
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  await productService.remove(req.params.id);
  res.json({ message: 'Deleted' });
};