import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from '../../types/enums';
import { User } from '../../types/types';

type InitialState = {
  isLoading: boolean;
  isLogin: boolean;
  user: User | null;
};

const initialState: InitialState = {
  isLoading: false,
  isLogin: false,
  user: null,
};

export const signUp = createAsyncThunk(
  'signUp',
  async (data: { name: string; email: string; password: string }, { rejectWithValue }) => {
    const { name, email, password } = data;
    try {
      const response = await axios.post(URL.SIGNUP, {
        name: name,
        email: email,
        password: password,
      });
      console.log(response.data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const signIn = createAsyncThunk(
  'signIn',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    const { email, password } = data;
    try {
      const response = await axios.post(URL.SIGNIN, {
        email: email,
        password: password,
      });
      console.log(response.data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
  extraReducers: {
    [signUp.pending.type]: (state) => {
      state.isLoading = true;
    },
    [signUp.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isLogin = true;
    },
    [signUp.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [signIn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [signIn.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isLogin = true;
    },
    [signIn.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
