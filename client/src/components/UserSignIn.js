import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Form from './Form'

/**
 * class component that renders the sign in page
 */
export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className='form--centered'>
        <h2>Sign In</h2>
        <Form 
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Sign In"
          elements={() => (
            <>
          <label htmlFor='emailAddress'>Email Address</label>
          <input
            id='emailAddress'
            name='emailAddress'
            type='email'
            value={emailAddress} 
            onChange={this.change} 
          />
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            value={password}
            onChange={this.change}
          />
          </>
          )} />
        <p>
          Don't have a user account? Click here to {' '}
          <Link to='/signup'>Sign Up</Link>!
        </p>
      </div>
    )
  }

    change = (event) => {
      const name = event.target.name;
      const value = event.target.value;

      this.setState(() => {
        return {
          [name]: value
        };
      });
    }

    submit = () => {
      const { context } = this.props;
      const { from } = this.props.location.state || { from: { pathname: '/authenticated' } }
      const { emailAddress, password } = this.state
      context.actions.signIn(emailAddress, password)
      .then( user => {
        if (user === null) {
          return { errors: [ 'Sign-in was unsuccessful' ] }
        }  else {
          this.props.history.push(from)
       }
      })
      .catch( err => {
        this.props.history.push('/error')
      })
    }

    cancel = () => {
      this.props.history.push('/')
    }
}

