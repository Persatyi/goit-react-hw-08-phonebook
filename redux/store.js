import { createStore } from 'redux';

const initialState = {
  name: '',
  number: '',
  email: '',
};

const initialTypes = {
  name: 'name',
  number: 'number',
  reset: 'reset',
  email: 'email',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case initialTypes.name:
      return { ...state, name: payload };
    case initialTypes.number:
      return { ...state, number: payload };
    case initialTypes.reset:
      return initialState;
    case initialTypes.email:
      return { ...state, email: payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
