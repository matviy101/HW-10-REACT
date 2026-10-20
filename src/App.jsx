import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleAddContact = ({ name, number }) => {
    const { contacts } = this.state;

    const duplicate = contacts.some(
      contact => contact.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (duplicate) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name.trim(),
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };



  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  handleDeleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>

        <ContactForm onAddContact={this.handleAddContact} />

        <h2>Contacts</h2>

        <Filter
          value={filter}
          onChange={this.handleFilterChange}
        />

        <ContactList contacts={visibleContacts} onDelete={this.handleDeleteContact} />
      </div>
    );
  }
}

export default App;
