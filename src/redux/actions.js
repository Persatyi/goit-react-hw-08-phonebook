import { createAction } from '@reduxjs/toolkit';

export const addContact = createAction('add');

// export const addContact = contact => ({
//   type: 'add',
//   payload: contact,
// });

export const removeContact = createAction('remove');

// export const removeContact = id => ({
//   type: 'remove',
//   payload: id,
// });

export const filterContacts = createAction('filter');

// export const filterContacts = text => ({
//   type: 'filter',
//   payload: text,
// });
