import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link, useParams } from 'react-router-dom'

/**
 * functional component that uses hooks to update state
 * fetches a single course from the API and renders the details
 */
const CourseDetail = (props) => {
  const [course, setCourse] = useState({})
  const [courseOwner, setCourseOwner] = useState('')
  // const [errors, setErrors] = useState([])
  // const [ownerEmail, setOwnerEmail] = useState('')
  const { id } = useParams()

  const authUser = props.context.authenticatedUser

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setCourse(json.course[0])
        setCourseOwner(json.course[0].User)
        // setOwnerEmail(json.course[0].User.emailAddress)
      })
      .catch((error) => console.error(error))
  }, [id])

  /**
   * submit function that when the delete course button is clicked a
   * DELETE request is sent to the API to remove the course from the db
   */
  const submit = (e) => {
    const { context } = props
    e.preventDefault()

    context.data.deleteCourse(course, authUser.emailAddress, authUser.password)
      .then(() => props.history.push('/'))
      // .then((errors) => {
      //   if (errors.length) {
      //     setErrors(errors)
      //   } else {
      //     props.history.push('/')
      //   }
      // })
  }

  return (
    <>
      <main>
        <div className='actions--bar'>
          <div className='wrap'>
            {authUser != null && (authUser.emailAddress === courseOwner.emailAddress)
              ? <> 
             <Link className='button' to={`/courses/${id}/update`}>
               Update Course
             </Link>
             <button
              className='button'
              type='submit'
              onClick={submit}
             >
               Delete Course
             </button>
             </>
              :
              null
            }

            <Link className='button button-secondary' to='/courses'>
              Return to List
            </Link>
          </div>
        </div>

        <div className='wrap'>
          <h2>Course Detail</h2>
          <form>
            <div className='main--flex'>
              <div>
                <h3 className='course--detail--title'>Course</h3>
                <h4 className='course--name'>{course.title}</h4>
                <p>By {courseOwner.firstName} {courseOwner.lastName}</p>

                <ReactMarkdown children={course.description} />
              </div>
              <div>
                <h3 className='course--detail--title'>Estimated Time</h3>
                <p>{course.estimatedTime}</p>

                <h3 className='course--detail--title'>Materials Needed</h3>
                <ul className='course--detail--list'>
                  <ReactMarkdown children={course.materialsNeeded} />
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

export default CourseDetail
