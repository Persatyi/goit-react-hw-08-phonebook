import s from './EditContact.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useReducer } from 'react';
import { getContact } from 'redux/selectors';
import { edit } from 'redux/contacts-slice';
import { editContact } from 'redux/contacts-thunk';
import data from 'db/input.json';

const EditContact = () => {
  const contact = useSelector(state => getContact(state));
  const dispatch = useDispatch();

  const initialState = {
    name: '',
    number: '',
    id: '',
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
    dispatchLocal({ type: 'id', payload: contact.id });
    editContact(state);
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
          value={contact.name}
          type={name.type}
          name="name"
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
          value={contact.number}
          type={number.type}
          name="number"
          pattern={number.pattern}
          title={number.title}
          id={contact.number}
          required
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={cancelEdit}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditContact;
