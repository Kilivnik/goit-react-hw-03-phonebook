import { React, Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import s from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  deleteContact = id => {
    this.setState({
      contacts: [...this.state.contacts.filter(contact => contact.id !== id)],
    });
  };

  handleFilterChange = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  addContact = data => {
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    for (const item of this.state.contacts) {
      if (item.name.toLowerCase() === data.name.toLowerCase()) {
        alert(`${item.name} is already in contacts`);
        return;
      }
    }
    this.setState(prevState => {
      return {
        contacts: [contact, ...prevState.contacts],
      };
    });
  };

  // Реализуэм сохранение контактов в localStorage
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts) ?? [];

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  // Реализуэм сохранение контактов в localStorage
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    return (
      <div className={s.container}>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} contacts={contacts} />
        <h2>Contacts</h2>
        <Filter filter={filter} handleChange={this.handleFilterChange} />
        <ContactList
          contacts={contacts}
          filter={filter}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export { App };
