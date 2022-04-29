import s from './ContactForm.module.css';
import { Fragment, useReducer } from 'react';
import data from 'db/input.json';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/actions';

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

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

  const [state, dispatchLocal] = useReducer(reducer, initialState);

  function reducer(state, action) {
    const { type, payload } = action;
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
  }

  const controlTheInput = e => {
    const { value, name } = e.target;
    dispatchLocal({ type: name, payload: value });
  };

  const addContactOnSubmit = e => {
    e.preventDefault();

    const contact = { id: nanoid(), ...state };

    const ifName = contacts.find(
      el => el.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (ifName) {
      alert(`${ifName.name} is already exist, please type new name`);
      return;
    }

    const ifNumber = contacts.find(
      el => el.number.replaceAll('-', '') === contact.number.replaceAll('-', '')
    );

    if (ifNumber) {
      alert(`${ifNumber.number} is already exist, please type new number`);
      return;
    }

    // setContacts(prev => [...prev, contact]);
    dispatch(addContact(contact));
    dispatchLocal({ type: 'reset' });
  };

  // const onSubmit = e => {
  //   addContact(contact, dispatch(addContact));
  //   props.addContact(contact, () => dispatch({ type: initialTypes.reset }));
  // };

  const keysArr = Object.keys(initialState);
  return (
    <form className={s.form} onSubmit={addContactOnSubmit}>
      {keysArr.map(key => {
        const { id, type, name, pattern, title } = data[key];
        return (
          <Fragment key={id}>
            <label className={s.label} htmlFor={id}>
              {name}
            </label>
            <input
              onChange={controlTheInput}
              value={state[key]}
              id={id}
              className={s.input}
              type={type}
              name={name}
              pattern={pattern}
              title={title}
              required
            />
          </Fragment>
        );
      })}
      <button className={s.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  addContactOnSubmit: PropTypes.func,
  keysArr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      type: PropTypes.string,
      name: PropTypes.string,
      pattern: PropTypes.string,
      title: PropTypes.string,
    })
  ),
};
