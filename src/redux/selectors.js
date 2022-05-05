export const contactsSelector = state => {
  return state.contacts;
};

export const filterSelector = state => {
  return state.filter;
};

export const filteredContactsSelector = state => {
  const contacts = contactsSelector(state);
  const filter = filterSelector(state);
  return contacts?.filter(el => el.name.toLowerCase().includes(filter));
};

export const editIdSelector = state => {
  return state.edit;
};

export const getContact = state => {
  const contacts = contactsSelector(state);
  const id = editIdSelector(state);
  return contacts.find(el => el.id === id);
};
