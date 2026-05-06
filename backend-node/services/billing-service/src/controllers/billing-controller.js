import * as billingService from '../services/billing-service.js';

export const createInvoice = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const invoice = await billingService.create(req.body, token);

  res.json(invoice);
};

export const getInvoices = async (req, res) => {
  const invoices = await billingService.getAll();
  res.json(invoices);
};

export const payInvoice = async (req, res) => {
  const invoice = await billingService.pay(req.params.id);
  res.json(invoice);
};

export const getOrderById = async (req, res) => {
  const order = await orderService.getById(req.params.id);
  res.json(order);
};