import React, { Component } from 'react';
import './Student.css'
import { Descriptions, Input } from 'antd';

class Student extends Component {

  state = {
    edus: [{id:0}],
    schedules: [] // { date: ,timeRange: , price: }    
  }

  handleDeleteEdu = (targetId) => () => {
    this.setState({edus: this.state.edus.filter(edu => edu.id !== targetId)})
  }

  render() {
    return (
      <div id='container-student'> 

        {/* profile */}
        <div id='student-profile'>      
          <img id='img-profile' src='images/student01.jpg' alt=''/> 
          <Descriptions
            // title="Tutor Descriptions"
            bordered
            column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            >

            <Descriptions.Item label='Telephone'>
              <Input className='student-input' 
                placeholder='Type somthing ...' 
              />                              
            </Descriptions.Item>

            <Descriptions.Item label="Education">
              {this.state.edus.map((edu, index) =>
                index === 0 ? 
                <Input key={edu.id} className='student-input'  placeholder='Type somthing ...' /> :    
                <Input key={edu.id}    
                  className='student-input'              
                  placeholder='Type somthing ...' 
                  suffix = {<span id='write-delete'>
                    <i className="fas fa-trash"
                      onClick={this.handleDeleteEdu(edu.id)}
                    ></i>                      
                  </span>}
                />                 
              )}
              <div className='addEdu'
                onClick={() => this.setState({ edus: [...this.state.edus,{id: Math.round(Math.random()*1000)}] } )}
              > 
                ... 
              </div>
            </Descriptions.Item> 

            <Descriptions.Item label='Balance'>
              <Input className='tutor-input' 
                placeholder='Type somthing ...' 
              />                              
            </Descriptions.Item>

          </Descriptions>              
        </div>

        {/* filter */}
        <div id='search-tutor'>      
          <div id='search-inputs'>
            <Input id='search-input' placeholder='search by subject' />    
            <Input id='search-input' placeholder='search by grade' />                
          </div>
            
        </div>

      </div>
    );
  }
}

export default Student;

