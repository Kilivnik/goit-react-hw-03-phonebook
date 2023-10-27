import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import s from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = nanoid(); // генерируем уникальный id для input
  numberInputId = nanoid(); // генерируем уникальный id для input

  handleChange = e => {
    const { name } = e.currentTarget;
    this.setState({
      [name]: e.currentTarget.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.addContact({
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    });

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { handleSubmit, handleChange, nameInputId, numberInputId } = this;
    const { name, number } = this.state;
    return (
      <form onSubmit={handleSubmit} className={s.form}>
        <label htmlFor={nameInputId} className={s.label}>
          Name
        </label>
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          id={nameInputId}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor={numberInputId} className={s.label}>
          Number
        </label>
        <input
          className={s.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          id={numberInputId}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button type="submit" className={s.button}>
          Add contact
        </button>
      </form>
    );
  }
}

export { ContactForm };
