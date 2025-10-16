// Use the backend HTTP launch URL (from launchSettings) for local development to avoid TLS trust issues
const API_BASE_URL = 'http://localhost:5134';

export const api = {
  async getProducts() {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    return response.json();
  },

  async getCart(token) {
    const response = await fetch(`${API_BASE_URL}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.json();
  },

  async addToCart(token, productId, quantity = 1) {
    const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ ProductId: productId, Quantity: quantity })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async clearCart(token) {
    const response = await fetch(`${API_BASE_URL}/api/cart`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.ok;
  }
};