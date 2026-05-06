import axios from 'axios';

const PRODUCT_SERVICE_URL = 'http://localhost:3001/api/products';

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${PRODUCT_SERVICE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Producto no encontrado');
  }
};