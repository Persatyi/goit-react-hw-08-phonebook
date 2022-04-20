import s from './ContactList.module.css';
import PropTypes from 'prop-types';

export default function ContactList(props) {
  const { contacts, deleteItem } = props;

  return (
    <ul className={s.list}>
      {contacts.map(contact => (
        <li className={s.item} key={contact.id}>
          {Object.keys(contact).map(el =>
            el === 'id' ? null : <p className={s.element} key={contact[el]}>{contact[el]}</p>
          )}
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
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteItem: PropTypes.func.isRequired,
};
