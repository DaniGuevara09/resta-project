import axios from 'axios';

const ORDER_SERVICE_URL = 'http://localhost:3002/api/orders';

export const getOrderById = async (id, token) => {
  try {
    const response = await axios.get(`${ORDER_SERVICE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Pedido no encontrado');
  }
};