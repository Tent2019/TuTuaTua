import React, { Component } from 'react';
import './Tutor.css'
import { Descriptions, Tabs, Input } from 'antd';
import { TagSkill } from '../components/TagSkill';
import { WriteComment } from '../components/Comment'
import { Calendar } from 'antd';
import { PopoverDay } from '../components/PopoverDay';
import { PopReserve } from '../components/PopReserve'

// === Tabs === //
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
} // End Tabs

class Tutor extends Component {

  state = {
    edus: [{id:0}],
    awards: [{id:0}],
    schedules: [] // { date: ,timeRange: , price: }    
  }

  handleDeleteEdu = (targetId) => () => {
    this.setState({edus: this.state.edus.filter(edu => edu.id !== targetId)})
  }
  handleDeleteAward = (targetId) => () => {
    this.setState({awards: this.state.awards.filter(award => award.id !== targetId)})
  }  

  // === Calendar === //
  dateCellRender = (moment) => {      
    let handleAddSchedule = (fromtime,totime,price) => () => {
      this.setState({schedules:[...this.state.schedules, {
        date: moment.format('L'),
        timeRange: fromtime + '-' + totime,
        price: price,
        isReserved: false
      } ] },
        //()=>console.log(this.state.schedules)
      )
    }

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
    

    return (       
      <div>
        
        <PopoverDay handleAddSchedule={handleAddSchedule} />         
        {filterScheduleDay(this.state.schedules).map( (offer, offerId) => 
          <PopReserve key={offerId}
            offer={offer}            
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
  }// End Calendar

  render() {
    return (
      <div id='container-tutor'> 
        
        <Tabs onChange={callback} type="card" >
          {/* Tab 1 */}
          <TabPane tab="Tutor Profile" key="1">
            <div id='img-profile-tab1'>
              <img id='img-profile' src='images/tutor01.jpeg' />
            </div>          
                     
            <Descriptions
              // title="Tutor Descriptions"
              bordered
              column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
              >

              <Descriptions.Item label='Telephone'>
                <Input className='tutor-input' 
                  placeholder='Type somthing ...' 
                />                              
              </Descriptions.Item>

              <Descriptions.Item label='Skills'>
                <TagSkill />                              
              </Descriptions.Item>
      
              <Descriptions.Item label="Education">
                {this.state.edus.map((edu, index) =>
                  index === 0 ? 
                  <Input key={edu.id} className='tutor-input'  placeholder='Type somthing ...' /> :    
                  <Input key={edu.id}
                    className='tutor-input'
                    placeholder='Type somthing ...' 
                    suffix = {<span id='write-delete'>
                      <i className="fas fa-trash"
                        onClick={this.handleDeleteEdu(edu.id)}
                      ></i>                      
                    </span>}
                  />                 
                )}
                <div className='addEdu'
                  onClick={() => this.setState({ edus: [...this.state.edus,{id: Math.round(Math.random()*1000)}] } ,()=>console.log(this.state.edus))}
                > 
                 ... 
                </div>
              </Descriptions.Item>              

              <Descriptions.Item label="Awards">
              {this.state.awards.map((award, index) =>
                  index === 0 ? 
                  <Input key={award.id} placeholder='Type somthing...' style={{border:'0px solid'}}/> :    
                  <Input key={award.id}
                    className='tutor-input'
                    placeholder='Type somthing ...' 
                    suffix = {<span id='write-delete'>
                      <i className="fas fa-trash"
                        onClick={this.handleDeleteAward(award.id)}
                      ></i>                      
                    </span>}
                  />                 
                )}
                <div className='addAward'
                  onClick={() => this.setState({ awards: [...this.state.awards,{id: Math.round(Math.random()*1000)}] }) }
                > 
                 ... 
                </div>
              </Descriptions.Item>
            </Descriptions>
               
          </TabPane>

          {/* Tab 2 */}
          <TabPane tab="Comment" key="2">
            <WriteComment  style={{overflow:'auto'}} />                                    
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

export default Tutor;

