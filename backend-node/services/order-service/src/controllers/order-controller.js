import * as orderService from '../services/order-service.js';

export const createOrder = async (req, res) => {
  const order = await orderService.create(req.body);
  res.json(order);
};

export const getOrders = async (req, res) => {
  const orders = await orderService.getAll();
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await orderService.updateStatus(req.params.id, status);
  res.json(order);
};