import { useState, useEffect } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { get, save, contactKey } from 'components/localStorage/localStorage';

export default function App() {
  const [contacts, setContacts] = useState(get(contactKey) ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    save(contactKey, contacts);
  }, [contacts]);

  const addContact = (contact, form) => {
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

    setContacts(prev => [...prev, contact]);

    form();
  };

  const findTarget = () => {
    return contacts.filter(el => el.name.toLowerCase().includes(filter));
  };

  const changeFilter = word => {
    setFilter(word);
  };

  const deleteItem = e => {
    const id = e.target.id;
    const newList = contacts.filter(el => el.id !== id);
    setContacts(newList);
  };

  return (
    <div
      style={{
        padding: '10px',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} findTarget={changeFilter} />
      <ContactList deleteItem={deleteItem} contacts={findTarget()} />
    </div>
  );
}
