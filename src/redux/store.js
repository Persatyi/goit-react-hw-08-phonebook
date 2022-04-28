import { createStore } from 'redux';
import { get, save, contactKey } from 'components/localStorage/localStorage';

const initialState = {
  contacts: get(contactKey) ?? [],
  filter: '',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'add':
      const contacts = [...state.contacts, payload];
      save(contactKey, contacts);
      return { ...state, contacts };
    case 'remove':
      const newContactsArr = state.contacts.filter(el => el.id !== payload);
      save(contactKey, newContactsArr);
      return {
        ...state,
        contacts: newContactsArr,
      };
    case 'filter':
      const filter = { ...initialState, filter: payload };
      const filteredArr = filter.contacts.filter(el =>
        el.name.toLowerCase().includes(filter.filter)
      );
      return {
        ...state,
        contacts: filteredArr,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
