import axios from 'axios'

const api = axios.create({
  // Use Vite proxy in dev: set baseURL to '/' so '/api' requests are proxied to the backend.
  // In production, set VITE_API_BASE_URL to your API origin.
  baseURL: import.meta.env.VITE_API_BASE_URL || '/',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
