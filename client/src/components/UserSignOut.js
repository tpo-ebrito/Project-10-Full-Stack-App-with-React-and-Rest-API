import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

/**
 * functional component that handles the user sign out and redirects to /
 */
const UserSignOut = ({ context }) => {
  useEffect(() => context.actions.signOut())
  return (
    <Redirect to='/' />
  )
}
export default UserSignOut
