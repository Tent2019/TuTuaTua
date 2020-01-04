import React, {Component} from 'react';
import { Popconfirm, message, Button } from 'antd';
import './PopReserve.css'
import jwtDecode from 'jwt-decode'

let user = jwtDecode(localStorage.getItem('ACCESS_TOKEN'))

export class PopReserveStudent extends Component {

    confirm = (scheduleId) => () => {
        message.info('success');
        this.props.handleReserveSchedule(scheduleId,this.props.schedule.tutorId)   
    }

    render() {
        const {schedule} = this.props
        const text = <div>
                        <b style={{color:'red'}}>Price: {schedule.price} Baht &nbsp; </b>
                        <div>Are you sure ?</div>                        
                    </div>        
        return (           
            <Popconfirm placement="right" 
                title={text} 
                onConfirm={this.confirm(schedule.id)} 
                okText="Yes" 
                cancelText="No"
                disabled={schedule.status ? true : false}
            >               
                <Button id={schedule.id} className='confirm-button'
                    style={{ backgroundColor: schedule.status === false ? '#00ff99' : '#ff6666' }}                    
                >
                    {schedule.timeRange}
                </Button>
            </Popconfirm>
        );
    }
}


