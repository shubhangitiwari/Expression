import React from 'react'
import {Route} from "react-router-dom";
import Nbar from './components/Nbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/Contact';
const App = () => {
  return(
    <>
    <Nbar/>

    <Route exact path='/'>
      <Home />
    </Route>

    <Route path='/About'>
      <About />
    </Route>

    <Route path='/Login'>
      <Login />
    </Route>

    <Route path='/Signup'>
      <Signup />
    </Route>

    <Route path='/Contact'>
      <Contact />
    </Route>
  
    </>
  )
}

export default App