import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://626e48dce58c6fabe2dd984d.mockapi.io/contacts';

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
