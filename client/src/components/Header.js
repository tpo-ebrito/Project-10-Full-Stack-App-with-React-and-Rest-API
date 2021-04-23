import React from 'react'
import { Link } from 'react-router-dom'

/**
 * class component that renders a header
 * sign in/sign up or sign out displays based on user sign in status
 */
export default class Header extends React.PureComponent {
  render () {
    const { context } = this.props
    const authUser = context.authenticatedUser

    return (
      <header>
        <div className='wrap header--flex'>
          <h1 className='header--logo'><Link to='/'> Courses </Link></h1>
          <nav>
            {authUser
               ? <>
                   <ul className='header--signedin'></ul>
                   <span>Welcome, {authUser.firstName}!</span>
                   <Link to='/signout'> Sign Out
                   </Link>
                 </>
               :
               <>
                 <Link className='header--signedout' to='/signup'> Sign Up
                 </Link>
                 <Link className='header--signedout' to='/signin'> Sign In
                 </Link>
               </>}
          </nav>
        </div>
      </header>
    )
  }
}
