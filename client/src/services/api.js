import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Interceptors ────────────────────────────────────────────────────────────
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message = err.response?.data?.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// ─── Food API ─────────────────────────────────────────────────────────────────
export const foodApi = {
  getAll:      (params) => api.get('/foods', { params }),
  getById:     (id)     => api.get(`/foods/${id}`),
  getCategories: ()     => api.get('/foods/categories'),
  getPopular:  ()       => api.get('/foods/popular'),
  getFeatured: ()       => api.get('/foods/featured'),
  getStats:    ()       => api.get('/foods/stats'),
};

// ─── Order API ────────────────────────────────────────────────────────────────
export const orderApi = {
  create:  (data)    => api.post('/orders', data),
  getById: (orderId) => api.get(`/orders/${orderId}`),
};

// ─── Review API ───────────────────────────────────────────────────────────────
export const reviewApi = {
  getAll:   (params) => api.get('/reviews', { params }),
  getByFood: (foodId) => api.get('/reviews', { params: { foodId } }),
};

export default api;
