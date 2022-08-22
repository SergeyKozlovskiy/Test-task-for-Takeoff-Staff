import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from '../../types/enums';
import { Contact } from '../../types/types';

type InitialState = {
  isLoading: boolean;
  contacts: Contact[] | null;
};

const initialState: InitialState = {
  isLoading: false,
  contacts: null,
};

export const getContacts = createAsyncThunk('getContacts', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get(URL.CONTACTS);
    return response.data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: {
    [getContacts.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getContacts.fulfilled.type]: (state, action: PayloadAction<Contact[]>) => {
      state.isLoading = false;
      state.contacts = action.payload;
    },
    [getContacts.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export default contactsSlice.reducer;
