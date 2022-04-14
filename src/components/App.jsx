import { Component } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { get, save, remove } from 'components/localStorage/localStorage';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = (contact, form) => {
    const ifName = this.state.contacts.find(
      el => el.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (ifName) {
      alert(`${ifName.name} is already exist, please type new name`);
      return;
    }

    const ifNumber = this.state.contacts.find(
      el => el.number.replaceAll('-', '') === contact.number.replaceAll('-', '')
    );

    if (ifNumber) {
      alert(`${ifNumber.number} is already exist, please type new number`);
      return;
    }

    this.setState(prev => ({
      contacts: [...prev.contacts, contact],
    }));

    form();
  };

  findTarget = () => {
    return this.state.contacts.filter(el =>
      el.name.toLowerCase().includes(this.state.filter)
    );
  };

  changeFilter = word => {
    this.setState({
      filter: word,
    });
  };

  deleteItem = e => {
    const id = e.target.id;
    const newList = this.state.contacts.filter(el => el.id !== id);
    this.setState({
      contacts: newList,
    });
  };

  render() {
    return (
      <div
        style={{
          padding: '10px',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} findTarget={this.changeFilter} />
        <ContactList
          deleteItem={this.deleteItem}
          contacts={this.findTarget()}
        />
      </div>
    );
  }
}

export default App;
