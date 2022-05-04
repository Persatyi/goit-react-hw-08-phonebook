import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://626e48dce58c6fabe2dd984d.mockapi.io/contacts';
axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set: token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset: () => {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const createAccount = createAsyncThunk(
  'user/signup',
  async (userData, thunkAPI) => {
    try {
      const response = await axios({
        method: 'post',
        url: '/users/signup',
        data: userData,
      });
      token.set(response.data.token);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'login',
  async (contact, thunkAPI) => {
    try {
      const response = await axios({
        method: 'post',
        url: '/users/login',
        data: contact,
      });
      token.set(response.data.token);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshAccount = createAsyncThunk(
  'refresh',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      token.set(state.token);

      const response = await axios({
        method: 'get',
        url: '/users/current',
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('logout', async (_, thunkAPI) => {
  try {
    const response = await axios({
      method: 'post',
      url: '/users/logout',
    });
    token.unset();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchContacts = createAsyncThunk(
  'contacts/get',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const contacts = await response.json();
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/add',
  async (contact, thunkAPI) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      const newContact = await response.json();
      return newContact;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contact/delete',
  async (id, thunkAPI) => {
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
