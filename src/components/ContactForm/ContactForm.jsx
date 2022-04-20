import s from './ContactForm.module.css';
import { Fragment, useReducer } from 'react';
import data from 'db/input.json';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export default function ContactForm(props) {
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

  const [state, dispatch] = useReducer(reducer, initialState);

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
        return;
    }
  }

  const onSubmit = e => {
    e.preventDefault();
    const contact = { id: nanoid(), ...state };

    props.addContact(contact, () => dispatch({ type: initialTypes.reset }));
  };

  const controlTheInput = e => {
    const { value, name } = e.target;
    dispatch({ type: name, payload: value });
  };

  const keysArr = Object.keys(initialState);
  return (
    <form className={s.form} onSubmit={onSubmit}>
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
  addContact: PropTypes.func.isRequired,
};
