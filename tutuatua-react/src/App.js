import React from 'react';
import './App.css';
import 'antd/dist/antd.css'; 
import { Switch, Route, Redirect } from 'react-router-dom' 
import LogIn from './pages/LogIn';
import Tutor from './pages/Tutor';
import Student from './pages/Student';

function App() {
  return (
    <div>
      <div id='header'>Tutuatua</div>
      <div id='content'>
        <Switch>
          <Route path='/login' component={LogIn} />         
          <Route exact path='/tutor' component={Tutor} />
          <Route exact path='/student' component={Student} />
          <Redirect to='login' />
        </Switch>
      </div>    
      <div id='footer'>footer</div>  
    </div>
  );
}

export default App;
