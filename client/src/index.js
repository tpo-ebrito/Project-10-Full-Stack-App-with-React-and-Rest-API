import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from './Context'
import App from './App'
import './styles/global.css'

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
)
