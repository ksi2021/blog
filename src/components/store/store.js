import { configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import articleReducer from './articleReducer';
import userReducer from './userReducer';

const store = configureStore({
  reducer: {
    article: articleReducer,
    user: userReducer,
  },
  // enhancers: [devToolsEnhancer({ realtime: true })],
});

export default store;
