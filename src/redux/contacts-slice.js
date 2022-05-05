import { createSlice } from '@reduxjs/toolkit';
import {
  getContacts,
  addContact,
  deleteContact,
  editContact,
} from './contacts-thunk';
import { toast } from 'react-toastify';
import {
  createAccount,
  loginUser,
  refreshAccount,
  logOut,
} from './contacts-thunk';

const initialState = {
  contacts: [],
  filter: '',
  loading: false,
  token: '',
  edit: '',
  user: {
    name: '',
    email: '',
  },
};

const slice = createSlice({
  name: 'reducer',
  initialState,
  reducers: {
    filter(state, action) {
      state.filter = action.payload;
    },
    edit(state, action) {
      state.edit = action.payload;
    },
  },
  extraReducers: {
    [getContacts.pending]: (state, _) => {
      state.loading = true;
    },
    [getContacts.fulfilled]: (state, action) => {
      state.loading = false;
      state.contacts = action.payload;
    },
    [getContacts.rejected]: (state, action) => {
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
    [editContact.pending]: (state, _) => {
      state.loading = true;
    },
    [editContact.fulfilled]: (state, action) => {
      state.loading = false;
      toast.success('Сontact successfully updated');
      state.contacts = [...state.contacts, action.payload];
    },
    [editContact.rejected]: (state, _) => {
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
    [createAccount.pending]: (state, _) => {
      state.loading = true;
    },
    [createAccount.fulfilled]: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    [createAccount.rejected]: (state, _) => {
      state.loading = false;
      toast.error('Oops, something went wrong, please try again');
    },
    [loginUser.pending]: (state, _) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    [loginUser.rejected]: (state, _) => {
      state.loading = false;
      toast.error('Oops, something went wrong, please try again');
    },
    [refreshAccount.pending]: (state, _) => {
      state.loading = true;
    },
    [refreshAccount.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [refreshAccount.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action.payload);
    },
    [logOut.pending]: (state, _) => {
      state.loading = true;
    },
    [logOut.fulfilled]: () => {
      return initialState;
    },
    [logOut.rejected]: (state, _) => {
      state.loading = false;
      toast.error('Oops, something went wrong, please try again');
    },
  },
});

export default slice;
export const { filter, edit } = slice.actions;
