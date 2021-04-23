import React from 'react'

/**
 * functional component that renders a form for use in user creation
 */
const Form = (props) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements
  } = props

  function handleSubmit (event) {
    event.preventDefault()
    submit()
  }

  function handleCancel (event) {
    event.preventDefault()
    cancel()
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="pad-bottom">
          <button className="button" type="submit">{submitButtonText}</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

/**
 * function that renders errors if they exist when creating a new user
 */
function ErrorsDisplay ({ errors }) {
  let errorsDisplay = null

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    )
  }

  return errorsDisplay
}

export default Form
