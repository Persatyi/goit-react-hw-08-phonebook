import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contacts-thunk';

const initialState = {
  contacts: [],
  filter: '',
};

export const slice = createSlice({
  name: 'reducer',
  initialState,
  reducers: {
    filter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchContacts.pending]: (state, action) => {},
    [fetchContacts.fulfilled]: (state, action) => {
      state.contacts = action.payload;
    },
    [fetchContacts.rejected]: (state, action) => {},
    [addContact.pending]: (state, action) => {},
    [addContact.fulfilled]: (state, action) => {
      state.contacts = [...state.contacts, action.payload];
    },
    [addContact.rejected]: (state, action) => {},
    [deleteContact.pending]: (state, action) => {},
    [deleteContact.fulfilled]: (state, action) => {
      state.contacts = state.contacts.filter(el => el.id !== action.meta.arg);
    },
    [deleteContact.rejected]: (state, action) => {},
  },
});
