import React, { Component } from 'react';
import './LogIn.css'
import { LogInForm } from '../../components/LogInForm'
import SignUpForm from '../../components/SignUpForm';

class LogIn extends Component {

  state={
    linkToSignUpForm: false,    
  }

  handleLinkSignUpForm = () => {
    this.setState({linkToSignUpForm: !this.state.linkToSignUpForm})
  }

  pushToTutor = () => {
    this.props.history.push('/tutor')
  }

  pushToStudent = () => {
    this.props.history.push('/student')
  }

  render() {
    return (
      <div id='container-login'>
        
        <div id='frame-logo'>         
         <img id='img-logo' src='images/why.jpeg' alt='' />
        </div>

        <div id='frame-login'>     
          {this.state.linkToSignUpForm ? 
            <SignUpForm handleLinkSignUpForm={this.handleLinkSignUpForm} /> : 
            <LogInForm 
              handleLinkSignUpForm={this.handleLinkSignUpForm} 
              pushToTutor={this.pushToTutor}
              pushToStudent={this.pushToStudent}
            /> 
          }
        </div>

      </div>
    );
  }
}

export default LogIn;