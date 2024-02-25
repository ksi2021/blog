import { json } from 'react-router-dom';

export const fetchArticles = async (page = 0) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const token = localStorage.getItem('TOKEN');
  if (token) headers.Authorization = `Bearer ${token}`;
  const limit = 5;
  const offset = page > 1 ? limit * (page - 1) : 0;
  let response = await fetch(
    `https://blog.kata.academy/api/articles?limit=${limit}&offset=${offset}`,
    { headers },
  );
  // Возвращаем данные из ответа
  response = await response.json();

  return response;
};
export const fetchArticleBySlug = async (slug = '') => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const token = localStorage.getItem('TOKEN');
  if (token) headers.Authorization = `Bearer ${token}`;
  let response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    headers,
  });
  // Возвращаем данные из ответа
  response = await response.json();

  return response;
};

export const fetchRegistration = async (user = {}) => {
  let response = await fetch('https://blog.kata.academy/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  });
  // Возвращаем данные из ответа
  response = await response.json();

  return response;
};
export const fetchLogin = async (user = {}) => {
  let response = await fetch('https://blog.kata.academy/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  });
  // Возвращаем данные из ответа
  response = await response.json();

  return response;
};

export const fetchAuthoriseByToken = async () => {
  const token = localStorage.getItem('TOKEN');
  if (!token) return;

  let response = await fetch('https://blog.kata.academy/api/user', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  // Возвращаем данные из ответа
  response = await response.json();
  // eslint-disable-next-line consistent-return
  return response;
};
export const fetchUpdateUser = async (data) => {
  const token = localStorage.getItem('TOKEN');
  if (!token) return;
  let response = await fetch('https://blog.kata.academy/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user: { ...data, repeatPassword: data.password } }),
  });
  // Возвращаем данные из ответа
  response = await response.json();
  // eslint-disable-next-line consistent-return
  return response;
};

export const fetchCreateArticle = async (article) => {
  const token = localStorage.getItem('TOKEN');
  if (!token) return;
  let response = await fetch('https://blog.kata.academy/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ article }),
  });
  response = await response.json();
  // eslint-disable-next-line consistent-return
  return response;
};
export const fetchUpdateArticle = async (data) => {
  const { article, slug } = data;
  const token = localStorage.getItem('TOKEN');
  if (!token) return;
  let response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ article }),
  });
  response = await response.json();
  // eslint-disable-next-line consistent-return
  return response;
};

export const fetchDeleteArticle = async (slug) => {
  const token = localStorage.getItem('TOKEN');
  if (!token) return;
  let response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  response = await response.json();
  // eslint-disable-next-line consistent-return
  return response;
};

export const fetchLikeArticle = async (slug) => {
  const token = localStorage.getItem('TOKEN');
  if (!token) return;
  let response = await fetch(
    `https://blog.kata.academy/api/articles/${slug}/favorite`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  response = await response.json();
  // eslint-disable-next-line consistent-return
  return response;
};

export const fetchDislikeArticle = async (slug) => {
  const token = localStorage.getItem('TOKEN');
  if (!token) return;
  let response = await fetch(
    `https://blog.kata.academy/api/articles/${slug}/`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  response = await response.json();
  // eslint-disable-next-line consistent-return
  return response;
};
