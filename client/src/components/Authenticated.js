import React from 'react'

const Authenticated = ({ context }) => {
  const authUser = context.authenticatedUser

  return (
    <div className='bounds'>
      <div className='grid-100'>
        <h1>{authUser.firstName} has been authenticated!</h1>
        <p>Your email address is {authUser.emailAddress}</p>
      </div>
    </div>
  )
}

export default Authenticated
