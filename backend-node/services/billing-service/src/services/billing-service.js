import { PrismaClient } from '@prisma/client';
import { getOrderById } from '../clients/order.client.js';

const prisma = new PrismaClient();

export const create = async (data) => {
const order = await getOrderById(data.orderId, token);

if (!order) {
    throw new Error('Pedido no existe');
  }

  //  calcular total 
  const total = order.items.length * 10000;

  return await prisma.invoice.create({
    data: {
      orderId: data.orderId,
      total: data.total
    }
  });
};

export const getAll = async () => {
  return await prisma.invoice.findMany();
};

export const pay = async (id) => {
  return await prisma.invoice.update({
    where: { id },
    data: { status: 'PAID' }
  });
};

export const getById = async (id) => {
  return await prisma.order.findUnique({
    where: { id },
    include: { items: true }
  });
};