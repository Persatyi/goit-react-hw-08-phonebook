import s from './EditContact.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useReducer } from 'react';
import { getContact } from 'redux/selectors';
import { edit } from 'redux/contacts-slice';
import { editContact } from 'redux/contacts-thunk';
import data from 'db/input.json';
import PropTypes from 'prop-types';

const EditContact = () => {
  const contact = useSelector(state => getContact(state));
  const dispatch = useDispatch();

  const initialState = {
    name: contact.name,
    number: contact.number,
    id: contact.id,
  };

  const initialTypes = {
    name: 'name',
    number: 'number',
    id: 'id',
  };

  const [state, dispatchLocal] = useReducer(reducer, initialState);

  function reducer(state, action) {
    const { type, payload } = action;
    switch (type) {
      case initialTypes.name:
        return { ...state, name: payload };
      case initialTypes.number:
        return { ...state, number: payload };
      case initialTypes.id:
        return { ...state, id: payload };
      default:
        return state;
    }
  }

  const controlTheInput = e => {
    const { value, name } = e.target;
    dispatchLocal({ type: name, payload: value });
  };

  const cancelEdit = () => {
    dispatch(edit(''));
  };

  const saveChanges = e => {
    e.preventDefault();
    dispatch(editContact(state));
    dispatch(edit(''));
  };

  const { name, number } = data;
  return (
    <div className={s.backdrop}>
      <form className={s.form} onSubmit={saveChanges}>
        <label className={s.label} htmlFor={contact.name}>
          name: {contact.name}
        </label>
        <input
          onChange={controlTheInput}
          className={s.input}
          value={state.name}
          type={name.type}
          name={name.name}
          pattern={name.pattern}
          title={name.title}
          id={contact.name}
          required
        />
        <label className={s.label} htmlFor={contact.number}>
          number: {contact.number}
        </label>
        <input
          onChange={controlTheInput}
          className={s.input}
          value={state.number}
          type={number.type}
          name={number.name}
          pattern={number.pattern}
          title={number.title}
          id={contact.number}
          required
        />
        <div className={s.wrapper}>
          <button className={s.button} type="submit">
            Submit
          </button>
          <button className={s.button} type="button" onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

EditContact.propTypes = {
  saveChanges: PropTypes.func,
  controlTheInput: PropTypes.func,
  cancelEdit: PropTypes.func,
  number: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    pattern: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  name: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    pattern: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

export default EditContact;
