import s from './ContactForm.module.css';
import { Component, Fragment } from 'react';
import data from 'db/input.json';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    addContact: PropTypes.func.isRequired,
  };

  onSubmit = e => {
    e.preventDefault();
    const contact = { id: nanoid(), ...this.state };

    this.props.addContact(contact, this.formReset);
  };

  formReset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  controlTheInput = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const keysArr = Object.keys(this.state);
    return (
      <form className={s.form} onSubmit={this.onSubmit}>
        {keysArr.map(key => {
          const { id, type, name, pattern, title } = data[key];
          return (
            <Fragment key={id}>
              <label className={s.label} htmlFor={id}>
                {name}
              </label>
              <input
                onChange={this.controlTheInput}
                value={this.state[key]}
                id={id}
                className={s.input}
                type={type}
                name={name}
                pattern={pattern}
                title={title}
                required
              />
            </Fragment>
          );
        })}
        <button className={s.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
