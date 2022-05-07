import s from './ContactForm.module.css';
import { Fragment, useReducer } from 'react';
import data from 'db/input.json';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts-thunk';
import { toast } from 'react-toastify';

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  const initialState = {
    name: '',
    number: '',
  };

  const initialTypes = {
    name: 'name',
    number: 'number',
    reset: 'reset',
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
      toast.info(`${ifName.name} is already exist, please type new name`);
      return;
    }

    const ifNumber = contacts.find(
      el => el.number.replaceAll('-', '') === contact.number.replaceAll('-', '')
    );

    if (ifNumber) {
      toast.info(`${ifNumber.number} is already exist, please type new number`);
      return;
    }

    dispatch(addContact(contact));
    dispatchLocal({ type: 'reset' });
  };

  const keysArr = Object.keys(initialState);
  return (
    <>
      <h1 className="title">Phonebook</h1>
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
    </>
  );
}

ContactForm.propTypes = {
  controlTheInput: PropTypes.func,
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
