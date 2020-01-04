import React, { Component } from 'react';
import './Student.css';
import { Descriptions, Tabs, Input, Button, Popover, Calendar, Card } from 'antd';
import { PopoverDay } from '../components/PopoverDay';
import { PopReserve } from '../components/PopReserve';
import Axios from '../config/axios.setup';

// === Tab === //
const { TabPane } = Tabs;
function callback(key) {
  // console.log(key);
} 

// === Card === //
class Student extends Component {

  state = {
    // === profile === //
    username: '',
    telephone: '',
    image: '',
    edus: [],
    changeImage: '',
    tutors: [],

    // === calendar === //
    schedules: [] // { id: ,date: ,timeRange: , price: ,status:}   
  }

  // === Profile Function === //
  handleAddEdu = () => {
    this.setState(
      { edus: [...this.state.edus,{id:Math.round(Math.random()*1000)}] },
      // ()=>console.log(this.state.edus)
    )
  }
  handleChangeEdu = (targetId) => (e) => {
    this.setState(
      { 
        edus: this.state.edus.map(edu => edu.id === targetId ? 
          {...edu, detail: e.target.value} : edu) 
      },
      // ()=>console.log(this.state.edus)
    )
  }
  handleDeleteEdu = (targetId) => () => {
    this.setState(
      {edus: this.state.edus.filter(edu => edu.id !== targetId)},
      // ()=>console.log(this.state.edus)
    )
  }

  updateProfile = async () => {
    try {
        let result = await Axios.put('/updateProfile',{
          telephone: this.state.telephone,
          image: this.state.changeImage ? this.state.changeImage : this.state.image,
          edus: this.state.edus,
        })  
      console.log(result.data)
      this.setState({ changeImage: '' })
    } catch (err) {
      console.log(err)
    }   

    // refresh
    try {
      let result = await Axios.get('/getProfile')
      console.log(result.data)
      this.setState({
        image: result.data.image
      })
    } catch (error) {
      console.log(error)
    }  
  }
  
  // === Calendar Function === //
  dateCellRender = (moment) => {      

    let filterScheduleDay = (schedules) => {
      let result = schedules.filter(
        schedule => schedule.date.slice(3,5) == moment.date()
      )  
      result = result.filter(
        schedule => schedule.date.slice(0,2) == moment.month()+1
      )
      result = result.filter(
        schedule => schedule.date.slice(6) == moment.year()
      )
      return result
    }    

    let handleDeleteSchedule = (targerId) => async () => {
      try {
        let result = await Axios.delete('/deleteSchedule/'+targerId)
        console.log(result)

        // === refresh === //
        try {
          let resultSchedule = await Axios.get('/getSchedule')
          this.setState({ schedules: resultSchedule.data })
        } catch (error) {
          console.log(error)
        }  

      } catch (error) {
        console.log(error)
      }           
    }

    let handleReserveSchedule = async (targerId,tutorId) => {
      try {
        let result = await Axios.put('/reserveSchedule/'+targerId)
        console.log(result.data)

        // refresh
        let resultSchedule = await Axios.get('/getScheduleBySelectTutor/'+tutorId)
        this.setState({ schedules: resultSchedule.data })
      } catch (error) {
        console.log(error)
      }           
    }

    return (       
      <div>        
        {filterScheduleDay(this.state.schedules).map( schedule => 
          <PopReserve key={schedule.id}
            schedule={schedule}      
            handleDeleteSchedule={handleDeleteSchedule}  
            handleReserveSchedule={handleReserveSchedule}    
          />
        )}             
      </div>    
    );
  }

  getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  }
  monthCellRender = (value) => {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  handleGetSchedule = (tutorId) => async () => {
    try {
      let resultSchedule = await Axios.get('/getScheduleBySelectTutor/'+tutorId)
      // console.log(resultSchedule.data)
      this.setState({ schedules: resultSchedule.data })
    } catch (error) {
      console.log(error)
    }    
  }

  // === @ Initiate === //

  componentDidMount = async () => {
    try {
      let resultProfile = await Axios.get('/getProfile')
      // console.log(resultProfile.data)
      this.setState({
        username: resultProfile.data.username,
        telephone: resultProfile.data.telephone,
        image: resultProfile.data.image,
        edus: resultProfile.data.education
      })

      let resultTutors = await Axios.get('/getTutors')
      // console.log(resultTutors.data)
      this.setState({ tutors: resultTutors.data })

    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div id='container-student'> 
        
        <Tabs onChange={callback} type="card" >
          {/* Tab 1 */}
          <TabPane id='student-left-tab' tab="Student Profile" key="1">

            <Popover placement="right" title={'Image URL'} 
              content={<Input onChange={e => this.setState({ changeImage: e.target.value })}
                value={this.state.changeImage} 
              />} 
              trigger="click"
            >
              <div id='img-profile-tab1'>
                {this.state.image ?
                  <img id='img-profile' src={this.state.image} /> :
                  <div>Choose Image</div>
                }                
              </div> 
            </Popover>                  
                     
            <Descriptions
              title={`Student ${this.state.username}`}
              bordered
              column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
              >

              <Descriptions.Item label='Telephone'>
                <Input className='student-input' 
                  placeholder='Type somthing ...' 
                  onChange={e => this.setState({telephone: e.target.value})}
                  value={this.state.telephone}
                />                              
              </Descriptions.Item>

              <Descriptions.Item label="Education">
                {this.state.edus.map((edu, index) =>
                  <Input key={edu.id}
                    className='student-input'
                    placeholder='Type somthing ...' 
                    onChange={this.handleChangeEdu(edu.id)}
                    value={edu.detail}
                    suffix = {<span id='write-delete'>
                      <i className="fas fa-trash"
                        onClick={this.handleDeleteEdu(edu.id)}
                      ></i>                      
                    </span>}
                  />                 
                )}
                <div className='addEdu' onClick={this.handleAddEdu} > 
                 ... 
                </div>
              </Descriptions.Item>  

            </Descriptions>                   

            <Button style={{margin:'15px 0px 0px'}}
              onClick={this.updateProfile}
            >
              Save
            </Button>   

          </TabPane>

          {/* Tab 2 */}
          <TabPane id='student-right-tab' tab="Select Tutor" key="2">
            <div id='card-container'>
              {this.state.tutors.map(tutor => 
                <Card key={tutor.id}
                  style={{ width: 140 }} 
                  cover={
                  <img alt="" src={tutor.image}
                    onClick={this.handleGetSchedule(tutor.id)}
                  />
                  }
                >
                  <b>{tutor.username}</b><br />
                  {tutor.skills.map( (skill,skillId) => 
                    <span key={skillId}>{skill.detail+' | '}</span>
                  )}                  
                </Card>                
              )}           
            </div>            
          </TabPane>

        </Tabs>        
            
        <Calendar 
            dateCellRender={this.dateCellRender} 
            monthCellRender={this.monthCellRender} 
        />         
        
      </div>
    );
  }
}

export default Student;