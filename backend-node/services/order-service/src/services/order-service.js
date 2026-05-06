import { PrismaClient } from '@prisma/client';
import { getProductById } from '../clients/product-client.js';

const prisma = new PrismaClient();

export const create = async (data) => {
 for (const item of data.items) {
    const product = await getProductById(item.productId);

    if (!product) {
      throw new Error(`Producto ${item.productId} no existe`);
    }
  }


  return await prisma.order.create({
    data: {
      tableNumber: data.tableNumber,
      preferences: data.preferences,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,
      items: {
        create: data.items
      }
    },
    include: { items: true }
  });
};

export const getAll = async () => {
  return await prisma.order.findMany({
    include: { items: true }
  });
};

export const updateStatus = async (id, status) => {
  return await prisma.order.update({
    where: { id },
    data: { status }
  });
};