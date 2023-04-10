import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { Wrapper } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');
    if (localContacts) {
      this.setState({ contacts: JSON.parse(localContacts) });
    }
  }

  async componentDidUpdate(PrevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length)
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    console.log(`prevState`);
    console.log(prevState.contacts);
    console.log(`state`);
    console.log(this.state.contacts);
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name, number, contacts } = this.state;
    const alreadyInContacts = contacts.find(contact => contact.name === name);

    alreadyInContacts
      ? alert(`${name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, { id: nanoid(), name, number }],
          name: '',
        }));
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDelete = e => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== e.target.id
      ),
    }));
  };
  render() {
    return (
      <Wrapper>
        <h1>Phonebook</h1>
        <ContactForm
          name={this.state.name}
          number={this.state.number}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} handleChange={this.handleChange} />
        <ContactList
          contacts={this.state.contacts}
          filter={this.state.filter}
          handleDelete={this.handleDelete}
        />
      </Wrapper>
    );
  }
}
