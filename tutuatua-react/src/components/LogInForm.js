import React from 'react';
import './LogInForm.css'
import Axios from '../config/api.service'
import { Form, Input, Button, notification, Icon  } from 'antd';
import jwtDecode from 'jwt-decode'
import {login} from '../redux/actions/actions'
import {connect} from 'react-redux'

const successRegister = (succmsg) => {
  notification.open({
    message: 'Login success',
    description: succmsg,
    icon: <Icon type="smile" style={{color:'blue'}} /> ,
  });
};
const failRegister = (errmsg) => {
  notification.open({
    message: 'Fail to login',
    description: errmsg,
    icon: <Icon type="warning" style={{color:'red'}} /> ,
  });
};

class RegistrationForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {     
        try {
          let result = await Axios.post('/loginUser', { 
                  username: values.username, 
                  password: values.password
                })
          // console.log(result.data)

          // === before -> no redux === //      
          // localStorage.setItem('ACCESS_TOKEN', result.data.token)
          //  let user =  jwtDecode(localStorage.getItem('ACCESS_TOKEN'))         
          
          // === REDUX === //
          let user = jwtDecode(result.data.token)
          // console.log(user)
          this.props.login(user, result.data.token)
          let role = this.props.user.role
          role === 'tutor' ? this.props.pushToTutor() : this.props.pushToStudent()

          successRegister(result.data.message)
        } catch (err) {                    
          failRegister(err.response.data.message)    
        }
      }
    });
  };

  render() {    
    const { getFieldDecorator } = this.props.form;    
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const { 
      handleLinkSignUpForm, 
    } = this.props
    
    return (      
      <div id='container-form'>

        <i id='logo' className="fas fa-desktop"></i>
        <b id='logo-text'>TuTuaTua Online</b>

        <Form id='form' {...formItemLayout} onSubmit={this.handleSubmit} >
          <Form.Item label="Username">
            {getFieldDecorator('username', {
              rules: [{ 
                  required: true,
                  message: 'Please input your username!',
                }]
            })(<Input className='login-input' />)}
          </Form.Item>

          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your password!'},
                { validator: this.validateToNextPassword }
              ]
            })(<Input.Password className='login-input' />)}
          </Form.Item>     

          <Form.Item style={{marginTop:'30px'}}>
            <Button type="primary" ghost htmlType="submit">
              Login
            </Button>            
            <Button type="primary" htmlType="submit"
              style={{marginLeft:'30px'}} 
              onClick={handleLinkSignUpForm}
            >
              Sign Up
            </Button>                                    
          </Form.Item>

        </Form>

      </div>      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = {
  login: login
}

const LogInForm = Form.create({ name: 'register' })(RegistrationForm);
export default connect(mapStateToProps,mapDispatchToProps)(LogInForm)
