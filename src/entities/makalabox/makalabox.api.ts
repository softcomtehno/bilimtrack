import axios from 'axios';

export function getCategory() {
  return axios.get(`https://api.makalabox.com/api/articles/categories/`);
}

export function getMakalas(categoryId?: number | 'all') {
  const url = categoryId && categoryId !== 'all'
    ? `https://api.makalabox.com/api/articles/?category=${categoryId}`
    : `https://api.makalabox.com/api/articles/`;
  return axios.get(url);
}