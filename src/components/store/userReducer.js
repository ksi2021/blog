import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  fetchLogin,
  fetchRegistration,
  fetchAuthoriseByToken,
  fetchUpdateUser,
} from '../services';

export const registration = createAsyncThunk(
  'users/registration',
  fetchRegistration,
);
export const login = createAsyncThunk('users/login', fetchLogin);

export const authorise = createAsyncThunk(
  'users/authorise',
  fetchAuthoriseByToken,
);

export const update = createAsyncThunk('users/update', fetchUpdateUser);

const initialState = {
  loading: true,
  user: null,
  errors: [],
  authorization: false,
};
export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.authorization = false;
      localStorage.removeItem('TOKEN');
    },
  },
  extraReducers: (builder) => {
    // Добавляем обработчик для асинхронного экшна
    builder.addCase(registration.fulfilled, (state, action) => {
      const errors = [];
      if (action.payload.errors) {
        const errorKeys = Object.keys(action.payload.errors);
        errorKeys.forEach((key) => {
          errors.push(`${key} : ${action.payload.errors[key]}`);
        });
      } else {
        state.user = action.payload.user;
        state.authorization = true;
        localStorage.setItem('TOKEN', action.payload.user.token);
      }
      if (errors.length !== state.errors.length) state.errors = errors;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const errors = [];
      if (action.payload.errors) {
        const errorKeys = Object.keys(action.payload.errors);
        errorKeys.forEach((key) => {
          errors.push(`${key} : ${action.payload.errors[key]}`);
        });
      } else {
        state.user = action.payload.user;
        state.authorization = true;
        localStorage.setItem('TOKEN', action.payload.user.token);
      }
      if (errors.length !== state.errors.length) state.errors = errors;
    });

    builder.addCase(authorise.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(authorise.fulfilled, (state, action) => {
      if (action.payload?.user) {
        return {
          ...state,
          user: action.payload.user,
          authorization: true,
          loading: false,
        };
      }
      return { ...state, loading: false };
    });
    builder.addCase(authorise.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(update.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      if (action.payload?.user) {
        return { ...state, user: action.payload.user, loading: false };
      }
      return { ...state, loading: false };
    });
    builder.addCase(update.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { logOut } = counterSlice.actions;
export default counterSlice.reducer;
