export const addContact = contact => ({
  type: 'add',
  payload: contact,
});

export const removeContact = id => ({
  type: 'remove',
  payload: id,
});

export const filterContacts = text => ({
  type: 'filter',
  payload: text,
});
