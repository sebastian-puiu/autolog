import React, { Component, Fragment } from 'react';
import FormErrors from "./FormErrors";
import Validate from "./utility/FormValidation";
import axios from "axios";
const config = require('../config.json');

export default class Contact extends Component {

  state = {
    email: "",
    subject: "",
    message: "",
    errors: {
      blankfield: false
    }
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        blankfield: false
      }
    });
  }

  handleSendEmail = async event => {
    event.preventDefault();
    try {
      // Form validation
      this.clearErrorState();
      const error = Validate(event, this.state);
      if (error) {
        this.setState({
          errors: { ...this.state.errors, ...error }
        });
      }
      else {
        const params = {
          "from": this.state.email,
          "subject": this.state.subject,
          "message": this.state.message
        };

        await axios.post(`${config.api.invokeUrl}/contact`, params);
        this.setState({
          "email": "",
          "subject": "",
          "message": ""
        });
      }
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }

  render() {
    return (
      <Fragment>
        <section className="section contact">
          <div className="container">
            <h1>Contact</h1>
            <FormErrors formerrors={this.state.errors} />

            <form onSubmit={event => this.handleSendEmail(event)}>
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input 
                    className="input" 
                    type="email"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Email address*"
                    value={this.state.email}
                    onChange={this.onInputChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <input 
                    className="input" 
                    type="text"
                    id="subject"
                    placeholder="Subject*"
                    value={this.state.subject}
                    onChange={this.onInputChange}
                  />
                </p>
              </div>
              <div className="field">
                <textarea 
                  className="input"
                  style={{ minHeight: 200 }}
                  id="message"
                  placeholder="Message*"
                  value={this.state.message}
                  onChange={this.onInputChange}
                  ></textarea>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-primary">
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </Fragment>
    )
  }
}
