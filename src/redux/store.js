// import { createStore } from 'redux';
import { configureStore, createReducer } from '@reduxjs/toolkit';
import { get, save, contactKey } from 'components/localStorage/localStorage';

const initialState = {
  contacts: get(contactKey) ?? [],
  filter: '',
};

const reducer = createReducer(initialState, builder => {
  builder
    .addCase('add', (state, { payload }) => {
      const contacts = (state.contacts = [...state.contacts, payload]);
      save(contactKey, contacts);
    })
    .addCase('remove', (state, { payload }) => {
      const newContactsArr = (state.contacts = state.contacts.filter(
        el => el.id !== payload
      ));
      save(contactKey, newContactsArr);
    })
    .addCase('filter', (state, { payload }) => {
      state.filter = payload;
    });
});

// const reducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case 'add':
//       const contacts = [...state.contacts, payload];
//       save(contactKey, contacts);
//       return { ...state, contacts };
//     case 'remove':
//       const newContactsArr = state.contacts.filter(el => el.id !== payload);
//       save(contactKey, newContactsArr);
//       return {
//         ...state,
//         contacts: newContactsArr,
//       };
//     case 'filter':
//       return {
//         ...state,
//         filter: payload,
//       };
//     default:
//       return state;
//   }
// };

const store = configureStore({
  reducer,
});

export default store;
