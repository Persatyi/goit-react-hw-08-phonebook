import s from './ContactList.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { filteredContactsSelector } from 'redux/selectors';
import { getContacts } from 'redux/contacts-thunk';
import { useEffect } from 'react';
import { deleteContact } from 'redux/contacts-thunk';
import { edit } from 'redux/contacts-slice';

export default function ContactList() {
  const contacts = useSelector(state => filteredContactsSelector(state));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const deleteItem = e => {
    const id = e.target.id;
    dispatch(deleteContact(id));
  };

  const editItem = e => {
    const id = e.target.id;
    dispatch(edit(id));
  };

  return contacts.length === 0 ? null : (
    <ul className={s.list}>
      {contacts.map(contact => (
        <li className={s.item} key={contact.id}>
          {Object.keys(contact).map(el =>
            el === 'id' ? null : (
              <p className={s.element} key={contact[el]}>
                <span className={s.details}>{el}:</span>
                {contact[el]}
              </p>
            )
          )}
          <button
            onClick={editItem}
            id={contact.id}
            className={s.editBtn}
            type="button"
          >
            Edit
          </button>
          <button
            onClick={deleteItem}
            id={contact.id}
            className={s.button}
            type="button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  editItem: PropTypes.func,
  deleteItem: PropTypes.func,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ),
};
