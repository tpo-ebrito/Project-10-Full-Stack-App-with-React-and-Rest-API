import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
// import ReactMarkdown from 'react-markdown'

/**
 * functional component that creates a course using hooks for state
 */
const CreateCourse = (props) => {
  // state variables
  const [materialsNeeded, setMaterialsNeeded] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')
  const [errors, setErrors] = useState([])

  const history = useHistory()
  const authUser = props.context.authenticatedUser

  // useRef variables
  const courseTitleInput = useRef('')
  const courseDescriptionInput = useRef('')
  const courseEstTimeInput = useRef('')
  const courseMaterialsNeededInput = useRef('')

  const change = () => {
    setTitle(courseTitleInput.current.value)
    setDescription(courseDescriptionInput.current.value)
    setEstimatedTime(courseEstTimeInput.current.value)
    setMaterialsNeeded(courseMaterialsNeededInput.current.value)
  }

  /**
   * submit function that sends a POST request to create a new course on click
   */
  const submit = (e) => {
    e.preventDefault()
    const { context } = props
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded
    }

    context.data.createCourse(course, authUser.emailAddress, authUser.password)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors)
        } else {
          props.history.push('/courses/')
        }
      })
  }

  return (
    <>
      <main>
        <div className='wrap'>
          <h2>Create Course</h2>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={submit}>
            <div className='main--flex'>
              <div>
                <label htmlFor='courseTitle'>Course Title</label>
                <input
                  id='courseTitle'
                  name='courseTitle'
                  type='text'
                  ref={courseTitleInput}
                  value={title}
                  onChange={change}
                />

                <label htmlFor='courseAuthor'>Course Author</label>
                <input
                  id='courseAuthor'
                  name='courseAuthor'
                  type='text'
                  value={`${authUser.firstName} ${authUser.lastName}`}
                  readOnly
                />

                <label htmlFor='courseDescription'>Course Description</label>
                <textarea
                  id='courseDescription'
                  name='courseDescription'
                  ref={courseDescriptionInput}
                  value={description}
                  onChange={change}
                >
                  {/* <ReactMarkdown children={description} /> */}
                </textarea>
              </div>
              <div>
                <label htmlFor='estimatedTime'>Estimated Time</label>
                <input
                  id='estimatedTime'
                  name='estimatedTime'
                  type='text'
                  ref={courseEstTimeInput}
                  value={estimatedTime}
                  onChange={change}
                />

                <label htmlFor='materialsNeeded'>Materials Needed</label>
                <textarea
                  id='materialsNeeded'
                  name='materialsNeeded'
                  ref={courseMaterialsNeededInput}
                  value={materialsNeeded}
                  onChange={change}
                >
                  {/* <ReactMarkdown children={materialsNeeded} /> */}
                </textarea>
              </div>
            </div>
            <button className='button' type='submit'>
              Create Course
            </button>
            <button
              className='button button-secondary'
              onClick={(event) => { event.preventDefault(); history.push('/') }}
            >
              Cancel
            </button>
          </form>
        </div>
      </main>
    </>
  )
}
 /**
  * function that renders errors if any exist
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

export default CreateCourse
