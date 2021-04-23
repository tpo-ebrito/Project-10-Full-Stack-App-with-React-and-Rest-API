import React, { useState, useEffect, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'

/**
 * functional component that renders fields to update a course
 * uses hooks to manage state
 */
const UpdateCourse = (props) => {
  // state variables
  // const [course, setCourse] = useState({})
  const [materialsNeeded, setMaterialsNeeded] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')
  const [errors, setErrors] = useState([])
  const [author, setAuthor] = useState('')
  const { id } = useParams()

  // useRef variables
  const courseTitleInput = useRef('')
  const courseDescriptionInput = useRef('')
  const courseEstTimeInput = useRef('')
  const courseMaterialsNeededInput = useRef('')

  const authUser = props.context.authenticatedUser
  const history = useHistory()

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((response) => response.json())
      .then((json) => {
        // setCourse(json.course[0])
        setMaterialsNeeded(json.course[0].materialsNeeded)
        setTitle(json.course[0].title)
        setDescription(json.course[0].description)
        setEstimatedTime(json.course[0].estimatedTime)
        setAuthor(`${json.course[0].User.firstName} ${json.course[0].User.lastName}`)
      })
      .catch((error) => console.error(error))
  }, [id])

  /**
   * submit function that submits a PUT request to update a course 
   */
  const submit = (e) => {
    e.preventDefault()
    const { context } = props
    const course = {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded
    }

    context.data.updateCourse(course, authUser.emailAddress, authUser.password)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors)
        } else {
          props.history.push('/courses/' + id)
        }
      })
  }

  const change = () => {
    setTitle(courseTitleInput.current.value)
    setDescription(courseDescriptionInput.current.value)
    setEstimatedTime(courseEstTimeInput.current.value)
    setMaterialsNeeded(courseMaterialsNeededInput.current.value)
  }

  return (
    <>
      <main>
        <div className='wrap'>
          <h2>Update Course</h2>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={submit}>
            <div className='main--flex'>
              <div>
                <label htmlFor='courseTitle'>Course Title</label>
                <input
                  id='Title'
                  name='Title'
                  type='text'
                  value={title}
                  ref={courseTitleInput}
                  onChange={change}
                />

                <label htmlFor='courseAuthor'>Course Author</label>
                <input
                  id='courseAuthor'
                  name='courseAuthor'
                  type='text'
                  value={author}
                  readOnly={true}
                />

                <label htmlFor='courseDescription'>Course Description</label>
                <textarea
                  id='courseDescription'
                  name='courseDescription'
                  ref={courseDescriptionInput}
                  value={description}
                  onChange={change}
                >
                  {/*  */}
                </textarea>
              </div>
              <div>
                <label htmlFor='estimatedTime'>Estimated Time</label>
                <input
                  id='estimatedTime'
                  name='estimatedTime'
                  type='text'
                  value={estimatedTime}
                  ref={courseEstTimeInput}
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
                  {/*  */}
                </textarea>
              </div>
            </div>
            <button className='button' type='submit'>
              Update Course
            </button>
            <button
              className='button button-secondary'
              onClick={(event) => { event.preventDefault(); history.goBack() }}
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

export default UpdateCourse
