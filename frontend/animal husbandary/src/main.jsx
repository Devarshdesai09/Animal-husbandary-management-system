import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index.js'

const root = createRoot(document.getElementById('root'))

root.render(
  
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  ) 
  // <React.StrictMode>
  //   <Provider store={store}>
  //     <Router>
  //       <App />
  //     </Router>
  //   </Provider>
  // </React.StrictMode>

