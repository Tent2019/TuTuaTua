import React from 'react';
import './LogInForm.css'
import Axios from '../config/axios.setup'
import { Form, Input, Button, notification, Icon  } from 'antd';

const successRegister = (succmsg) => {
  notification.open({
    message: 'Register success',
    description: succmsg,
    icon: <Icon type="smile" style={{color:'blue'}} /> ,
  });
};
const failRegister = (errmsg) => {
  notification.open({
    message: 'Fail to register',
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
          localStorage.setItem('ACCESS_TOKEN', result.data.token)
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
      // pushToTutor 
    } = this.props
    
    return (      
      <div id='container-form'>
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

          <Form.Item>
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

export const LogInForm = Form.create({ name: 'register' })(RegistrationForm);