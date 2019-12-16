import React from 'react';
import './LogInForm.css'

// == FORM ==
import {
  Form,
  Input,
  Button
} from 'antd';

// == SELECT ==
import { Select } from 'antd';

// == SELECT ==
const { Option } = Select;

function onBlur() {
  // console.log('blur');
}

function onFocus() {
  // console.log('focus');
}

function onSearch(val) {
  // console.log('search:', val);
}


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],

    username: '',
    password: '',
    usertypes: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
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

    const { handleLinkSignUpForm } = this.props

    return (
      <div id='container-form'>
        <Form id='form'
          {...formItemLayout} onSubmit={this.handleSubmit}
        >
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

          <Form.Item label="User Types">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please select your user types!' }],
              // ***
            })(<Select
              showSearch
              className='select-input'            
              placeholder="Select type"
              optionFilterProp="children"
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Tutor">Tutor</Option>
              <Option value="Student">Student</Option>
            </Select>)}
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

