import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contacts-thunk';
import { toast } from 'react-toastify';

const initialState = {
  contacts: [],
  filter: '',
  loading: false,
};

const slice = createSlice({
  name: 'reducer',
  initialState,
  reducers: {
    filter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchContacts.pending]: (state, _) => {
      state.loading = true;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.loading = false;
      state.contacts = action.payload;
    },
    [fetchContacts.rejected]: (state, action) => {
      action.payload === '404'
        ? toast.info('There are no contacts yet, please add a new contact')
        : toast.error('Oops, something went wrong, please try again');
      state.loading = false;
    },
    [addContact.pending]: (state, _) => {
      state.loading = true;
    },
    [addContact.fulfilled]: (state, action) => {
      state.loading = false;
      toast.success('Success, your contact was added to list');
      state.contacts = [...state.contacts, action.payload];
    },
    [addContact.rejected]: (state, _) => {
      state.loading = false;
      toast.error('Oops, something went wrong, please try again');
    },
    [deleteContact.pending]: (state, _) => {
      state.loading = true;
    },
    [deleteContact.fulfilled]: (state, action) => {
      state.loading = false;
      toast.success('Contact successfully removed from the list');
      state.contacts = state.contacts.filter(el => el.id !== action.meta.arg);
    },
    [deleteContact.rejected]: (state, _) => {
      state.loading = false;
      toast.error('Oops, something went wrong, please try again');
    },
  },
});

export default slice;
export const { filter } = slice.actions;
