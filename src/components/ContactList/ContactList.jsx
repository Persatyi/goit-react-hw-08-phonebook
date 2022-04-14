import s from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = props => {
  const { contacts, deleteItem } = props;
  return (
    <ul className={s.list}>
      {contacts.map(contact => (
        <li className={s.item} key={contact.id}>
          <p id={contact.id}>
            {contact.name}: {contact.number}
          </p>
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
};

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

export default ContactList;
