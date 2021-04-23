import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Form from './Form'

/**
 * class component that renders the sign up page
 */
export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: []
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors
    } = this.state

    return (
      <div className='form--centered'>
        <h2>Sign Up</h2>
        <Form 
        cancel={this.cancel}
        errors={errors}
        submit={this.submit}
        submitButtonText="Sign Up"
        elements={() => (
          <>
            <label htmlFor='firstName'>First Name</label>
            <input
              id='firstName'
              name='firstName'
              type='text'
              value={firstName}
              onChange={this.change}
            />

            <label htmlFor='lastName'>Last Name</label>
            <input
              id='lastName'
              name='lastName'
              type='text'
              value={lastName}
              onChange={this.change}
            />

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

            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              value={confirmPassword}
              onChange={this.change}
            />
          </>
        )} />
        <p>
          Already have a user account? Click here to{' '}
          <Link to='/signin'>Sign In</Link>!
        </p>
      </div>
    )
  }

  change = (event) => {
    const name = event.target.name
    const value = event.target.value

    this.setState(() => {
      return {
        [name]: value
      }
    })
  }

  /**
   * submit function that sends a POST request to create a new user on submit
  */
  submit = () => {
    const { context } = this.props;
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state

    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    }

    context.data.createUser(user)
    .then(errors => {
      if (errors.length) {
        this.setState({ errors })

        if (password !== confirmPassword) {
          const newError = [...this.state.errors]
          newError.push('Both passwords must match')
          this.setState({ errors: newError })
          return
        } 
      } else {
        context.actions.signIn(emailAddress, password)
        .then(() => {
          this.props.history.push('/authenticated')
        })
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
