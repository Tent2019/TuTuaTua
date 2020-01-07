import React from 'react';
import './App.css';
import 'antd/dist/antd.css'; 
import { Switch } from 'react-router-dom' 
// * use PrivateRoute
// import { Route, Redirect } from 'react-router-dom' 
// import LogIn from './pages/authentication/LogIn';
// import Tutor from './pages/Tutor';
// import Student from './pages/Student';
import PrivateRoute from './components/routes/PrivateRoute'
import { connect } from 'react-redux'

class App extends React.Component {
  render() {    
    return (
      <div>
        <div id='header'>
          <div>
            <i className="fas fa-user-edit"></i>
            <span id='brand'>TuTuaTua - Online</span>
            <i className="fas fa-laptop"></i>
          </div>
          <div>
             - &nbsp; Learn Anywhere, Anytime &nbsp; -  
          </div>
        </div>
        <div id='content'>
          <Switch>
            <PrivateRoute role={this.props.user.role} />
            {/* <Route exact path='/login' component={LogIn} />         
            <Route exact path='/tutor' component={Tutor} />
            <Route exact path='/student' component={Student} />
            <Redirect to='/login' /> */}
          </Switch>
        </div>    
        <div id='footer'>
          <span></span>
          <span>
            <span>presented by </span>
            <span><i className="fab fa-facebook"></i><span>Kittipong Tent</span></span>
            <span><i className="fab fa-line"></i><span>tent.k</span></span>
          </span>        
        </div>  
      </div>
    );
  }  
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps,null)(App);
