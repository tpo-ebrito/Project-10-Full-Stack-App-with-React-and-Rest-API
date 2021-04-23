import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import Authenticated from './components/Authenticated'
import CourseDetail from './components/CourseDetail'
import Courses from './components/Courses'
import CreateCourse from './components/CreateCourse'
import Header from './components/Header'
import NotFound from './components/NotFound'
import PrivateRoute from './components/PrivateRoute'
import UpdateCourse from './components/UpdateCourse'
import UserSignIn from './components/UserSignIn'
import UserSignOut from './components/UserSignOut'
import UserSignUp from './components/UserSignUp'
import withContext from './Context'

// components that use context for authentication
const AuthWithContext = withContext(Authenticated)
const CourseDetailWithContext = withContext(CourseDetail)
const CreateCourseWithContext = withContext(CreateCourse)
const HeaderWithContext = withContext(Header)
const UpdateCourseWithContext = withContext(UpdateCourse)
const UserSignInWithContext = withContext(UserSignIn)
const UserSignOutWithContext = withContext(UserSignOut)
const UserSignUpWithContext = withContext(UserSignUp)

const App = () => (
  <Router>
    <div>
      <HeaderWithContext />
      <Switch>
        <Route exact path='/courses'>
          <Courses />
        </Route>
        <PrivateRoute exact path='/courses/create' component={CreateCourseWithContext} />
        <Route exact path='/courses/:id' component={CourseDetailWithContext} />
        <PrivateRoute exact path='/courses/:id/update' component={UpdateCourseWithContext} />
        <Redirect exact path='/' to='/courses' />
        <Route path='/signin' component={UserSignInWithContext} />
        <Route path='/signup' component={UserSignUpWithContext} />
        <Route path='/signout' component={UserSignOutWithContext} />
        <PrivateRoute path='/authenticated' component={AuthWithContext} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)

export default App
