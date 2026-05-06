import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (data) => {
  return await prisma.product.create({ data });
};

export const getAll = async () => {
  return await prisma.product.findMany();
};

export const getById = async (id) => {
  return await prisma.product.findUnique({ where: { id } });
};

export const update = async (id, data) => {
  return await prisma.product.update({
    where: { id },
    data
  });
};

export const remove = async (id) => {
  return await prisma.product.delete({
    where: { id }
  });
};