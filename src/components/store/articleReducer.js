import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  fetchArticles,
  fetchArticleBySlug,
  fetchLogin,
  fetchCreateArticle,
  fetchDeleteArticle,
  fetchUpdateArticle,
  fetchDislikeArticle,
  fetchLikeArticle,
} from '../services';

export const getArticles = createAsyncThunk(
  'articles/getArticles',
  fetchArticles,
);
export const getArticleBySlug = createAsyncThunk(
  'articles/getArticleBySlug',
  fetchArticleBySlug,
);

export const createArticle = createAsyncThunk(
  'articles/createArticle',
  fetchCreateArticle,
);
export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  fetchUpdateArticle,
);
export const likeArticle = createAsyncThunk(
  'articles/likeArticle',
  fetchLikeArticle,
);
export const dislikeArticle = createAsyncThunk(
  'articles/dislikeArticle',
  fetchDislikeArticle,
);

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  fetchDeleteArticle,
);
export const login = createAsyncThunk('users/login', fetchLogin);

const initialState = {
  articles: [],
  article: null,
  loading: false,
  page: 1,
  error: null,
  articlesCount: null,
  articleFlag: false,
};
export const counterSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Добавляем обработчик для асинхронного экшна
    builder.addCase(getArticles.fulfilled, (state, action) => {
      // Здесь мы также можем сохранять данные, если это необходимо
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    });
    builder.addCase(getArticleBySlug.fulfilled, (state, action) => {
      // Здесь мы также можем сохранять данные, если это необходимо
      state.article = action.payload.article;
    });
    builder.addCase(createArticle.fulfilled, (state, action) => {
      // Здесь мы также можем сохранять данные, если это необходимо
      console.log(action.payload);
      state.articleFlag = !state.articleFlag;
    });
    builder.addCase(updateArticle.fulfilled, (state, action) => {
      state.articleFlag = !state.articleFlag;
    });
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      // Здесь мы также можем сохранять данные, если это необходимо
      console.log(action.payload);
      console.log('delete');
      state.articleFlag = !state.articleFlag;
    });

    builder.addCase(dislikeArticle.fulfilled, (state, action) => {
      // Здесь мы также можем сохранять данные, если это необходимо
      console.log(action.payload);
      console.log('DISLIKE');
    });

    builder.addCase(likeArticle.fulfilled, (state, action) => {
      // Здесь мы также можем сохранять данные, если это необходимо
      console.log(action.payload);
      console.log('LIKE');
    });
    // builder.addCase(deleteArticle.pending, (state, action) => {
    //   // Здесь мы также можем сохранять данные, если это необходимо
    //   console.log(action.payload);
    //   console.log('delete');
    //   state.articleFlag = !state.articleFlag;
    // });
  },
});

export const { setPage } = counterSlice.actions;
export default counterSlice.reducer;
