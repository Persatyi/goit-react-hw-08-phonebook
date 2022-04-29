import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

export default function App() {
  return (
    <div
      style={{
        padding: '10px',
      }}
    >
      <h1 className="title">Phonebook</h1>
      <ContactForm />
      <h2 className="title">Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
}
