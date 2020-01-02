import React, { Component } from 'react';
import './Tutor.css'
import { Descriptions, Tabs, Input, Button, Popover } from 'antd';
import { WriteComment } from '../components/Comment'
import { CreateCalendar } from '../components/CreateCalendar';
import Axios from '../config/axios.setup'

// === Tabs === //
const { TabPane } = Tabs;
function callback(key) {
  // console.log(key);
} // End Tabs

class Tutor extends Component {

  state = {
    username: '',
    telephone: '',
    image: '',
    skills: [],
    edus: [],
    awards: []  
  }

  handleAddSkill = () => {
    this.setState(
      { skills: [...this.state.skills,{id:Math.round(Math.random()*1000)}] },
      // ()=>console.log(this.state.skills)
    )
  }
  handleChangeSkill = (targetId) => (e) => {
    this.setState(
      { 
        skills: this.state.skills.map(skill => skill.id === targetId ? 
          {...skill, detail: e.target.value} : skill) 
      },
      // ()=>console.log(this.state.skills)
    )
  }
  handleDeleteSkill = (targetId) => () => {
    this.setState(
      {skills: this.state.skills.filter(skill => skill.id !== targetId)},
      // ()=>console.log(this.state.skills)
    )
  }

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

  handleAddAward = () => {
    this.setState(
      { awards: [...this.state.awards, {id:Math.round(Math.random()*1000)}] },
      // ()=>console.log(this.state.awards)
    )
  }
  handleChangeAward = (targetId) => (e) => {
    this.setState(
      { 
        awards: this.state.awards.map(award => award.id === targetId ? 
          {...award, detail: e.target.value} : award) 
      },
      // ()=>console.log(this.state.awards)
    )
  }
  handleDeleteAward = (targetId) => () => {
    this.setState(
      {awards: this.state.awards.filter(award => award.id !== targetId)},
      // ()=>console.log(this.state.awards)
    )
  } 

  updateProfile = async () => {
    try {
        let result = await Axios.put('/updateProfile',{
          telephone: this.state.telephone,
          skills: this.state.skills,
          edus: this.state.edus,
          awards: this.state.awards
        })  
      console.log(result.data)
    } catch (err) {
      console.log(err)
    }   
  }
  
  componentDidMount = async () => {
    try {
      let result = await Axios.get('/getProfile')
      console.log(result.data)
      this.setState({
        username: result.data.username,
        telephone: result.data.telephone,
        image: result.data.image,
        skills: result.data.skills,
        edus: result.data.education,
        awards: result.data.awards
      })
    } catch (error) {
      console.log(error)
    }    
  }

  render() {
    return (
      <div id='container-tutor'> 
        
        <Tabs onChange={callback} type="card" >
          {/* Tab 1 */}
          <TabPane id='tutor-left-tab' tab="Tutor Profile" key="1">

            <Popover placement="right" title={'Image URL'} 
              content={'asdf'} 
              trigger="click"
            >
              <div id='img-profile-tab1'>
                <img id='img-profile' src={this.state.image} />
              </div> 
            </Popover>                  
                     
            <Descriptions
              title={`Teacher ${this.state.username}`}
              bordered
              column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
              >

              <Descriptions.Item label='Telephone'>
                <Input className='tutor-input' 
                  placeholder='Type somthing ...' 
                  onChange={e => this.setState({telephone: e.target.value})}
                  value={this.state.telephone}
                />                              
              </Descriptions.Item>

              <Descriptions.Item label="Skills">
                {this.state.skills.map((skill, index) =>
                  <Input key={skill.id}
                    className='tutor-input'
                    placeholder='Type somthing ...' 
                    onChange={this.handleChangeSkill(skill.id)}
                    value={skill.detail}
                    suffix = {<span id='write-delete'>
                      <i className="fas fa-trash"
                        onClick={this.handleDeleteSkill(skill.id)}
                      ></i>                      
                    </span>}
                  />                 
                )}
                <div className='addEdu' onClick={this.handleAddSkill} > 
                 ... 
                </div>
              </Descriptions.Item> 
      
              <Descriptions.Item label="Education">
                {this.state.edus.map((edu, index) =>
                  <Input key={edu.id}
                    className='tutor-input'
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

              <Descriptions.Item label="Awards">
                {this.state.awards.map((award, index) =>  
                  <Input key={award.id}
                    className='tutor-input'
                    placeholder='Type somthing ...' 
                    onChange={this.handleChangeAward(award.id)}
                    value={award.detail}
                    suffix = {<span id='write-delete'>
                      <i className="fas fa-trash"
                        onClick={this.handleDeleteAward(award.id)}
                      ></i>                      
                    </span>}
                  />                 
                )}
                <div className='addAward'
                  onClick={ this.handleAddAward }
                > 
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
          <TabPane tab="Comment" key="2">
            <WriteComment  style={{overflow:'auto'}} />                                    
          </TabPane>

        </Tabs>        
            
        <CreateCalendar />
        
      </div>
    );
  }
}

export default Tutor;

