import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getContacts = createAsyncThunk(
  'contacts/get',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      token.set(state.token);
      const response = await axios({
        method: 'get',
        url: '/contacts',
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/add',
  async (contact, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      token.set(state.token);
      const response = await axios({
        method: 'post',
        url: '/contacts',
        data: contact,
      });
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const editContact = createAsyncThunk(
  'contact/edit',
  async ({ id, name, number }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      token.set(state.token);
      const response = await axios({
        method: 'patch',
        url: `/contacts/${id}`,
        data: { name: name, number: number },
      });
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contact/delete',
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      token.set(state.token);
      await axios({
        method: 'delete',
        url: `/contacts/${id}`,
      });
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
