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

export const createContact = createAsyncThunk(
  'createContact',
  async (
    data: {
      name: string;
      street: string;
      city: string;
      phone: string;
      email: string;
      website: string;
    },
    { rejectWithValue }
  ) => {
    const { name, street, city, phone, email, website } = data;
    try {
      const response = await axios.post(
        URL.CONTACTS,
        {
          name: name,
          address: {
            street: street,
            city: city,
          },
          phone: phone,
          email: email,
          website: website,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const changeContact = createAsyncThunk(
  'createContact',
  async (
    data: {
      name: string;
      street: string;
      city: string;
      phone: string;
      email: string;
      website: string;
      id: number;
    },
    { rejectWithValue }
  ) => {
    const { name, street, city, phone, email, website, id } = data;
    try {
      const response = await axios.put(
        `${URL.CONTACTS}/${id}`,
        {
          name: name,
          address: {
            street: street,
            city: city,
          },
          phone: phone,
          email: email,
          website: website,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'createContact',
  async (data: { id: number }, { rejectWithValue }) => {
    const { id } = data;
    try {
      const response = await axios.delete(`${URL.CONTACTS}/${id}`);
      console.log(response.data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

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
