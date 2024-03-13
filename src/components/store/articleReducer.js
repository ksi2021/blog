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
  // fetchDeleteArticle,
  async (slug) => {
    try {
      const res = await fetchDeleteArticle(slug);
      if (res.errors) return Promise.reject('Something goes wrong');
      return Promise.resolve();
    } catch (e) {
      console.log(e);
      return Promise.reject();
    }
  },
);
export const login = createAsyncThunk('users/login', fetchLogin);

const initialState = {
  articles: [],
  article: null,
  loading: true,
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
    builder.addCase(getArticles.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getArticles.fulfilled, (state, action) => {
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        loading: false,
      };
    });
    builder.addCase(getArticleBySlug.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getArticleBySlug.fulfilled, (state, action) => {
      return { ...state, article: action.payload.article, loading: false };
    });

    builder.addCase(getArticleBySlug.rejected, (state, action) => {
      return { ...state, article: null, loading: false };
    });

    builder.addCase(createArticle.fulfilled, (state, action) => {
      console.log(action.payload);
      state.articleFlag = !state.articleFlag;
    });

    builder.addCase(updateArticle.fulfilled, (state, action) => {
      state.articleFlag = !state.articleFlag;
    });

    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      console.log(action.payload);
      console.log('delete');
      state.articleFlag = !state.articleFlag;
    });

    builder.addCase(dislikeArticle.fulfilled, (state, action) => {
      console.log(action.payload);
      console.log('DISLIKE');
      if (!!state.article && state.article.slug === action.payload.article.slug)
        state.article = action.payload.article;
      for (let i = 0; i < state.articles.length; i++) {
        if (state.articles[i].slug === action.payload.article.slug) {
          state.articles[i] = action.payload.article;
          break;
        }
      }
    });

    builder.addCase(likeArticle.fulfilled, (state, action) => {
      console.log(action.payload);
      console.log('LIKE');
      if (!!state.article && state.article.slug === action.payload.article.slug)
        state.article = action.payload.article;
      for (let i = 0; i < state.articles.length; i++) {
        if (state.articles[i].slug === action.payload.article.slug) {
          state.articles[i] = action.payload.article;
          break;
        }
      }
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
