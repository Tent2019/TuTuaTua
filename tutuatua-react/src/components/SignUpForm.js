import React from 'react';
import './SignUpForm.css'
import { connect } from 'react-redux'
import { addTutor, addStudent } from '../redux/actions/actions';
// === test - store === //
import store from '../redux/store/store'

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
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {      
      if (!err) {
        // console.log(values)  
        if (values.usertypes === 'Tutor') {
          this.props.addTutor(values.username, values.confirm)    
        } else {
          this.props.addStudent(values.username, values.confirm)    
        }        
        console.log(store.getState())
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
      <div id='container-form2'>
        <Form id='form2'
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
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password className='login-input' />)}
          </Form.Item>     

          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password  className='login-input' onBlur={this.handleConfirmBlur} />)}
          </Form.Item>

          <Form.Item label="User Types">
            {getFieldDecorator('usertypes', {
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
            <Button type="primary" htmlType="submit"
              onClick={handleLinkSignUpForm}
            >
              Back
            </Button>              
            <Button type="primary" ghost htmlType="submit"
              style={{marginLeft:'30px'}} 
            >
              Register
            </Button>              
          </Form.Item>
        </Form>
      </div>      
    );
  }
}

const mapDispatchToProps = {
  addTutor: addTutor,
  addStudent: addStudent
}

// export const SignUpForm = Form.create({ name: 'register' })(RegistrationForm);
const SignUpForm = Form.create({ name: 'register' })(RegistrationForm);
export default connect(null, mapDispatchToProps)(SignUpForm)