import axios from 'axios';

const API_BASE = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    throw error;
  }
);

export const predictAPI = {
  // Single prediction
  predict: (houseData) => 
    api.post('/predict', houseData),

  // Batch predictions
  batchPredict: (houses) =>
    api.post('/batch-predict', { houses }),

  // Get model info
  getModelInfo: () =>
    api.get('/model-info'),

  // Get available features
  getFeatures: () =>
    api.get('/features'),

  // Health check
  health: () =>
    api.get('/health'),
};

export default api;
