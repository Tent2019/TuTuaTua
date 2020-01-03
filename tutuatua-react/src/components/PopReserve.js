import React, {Component} from 'react';
import { Popconfirm, message, Button } from 'antd';
import './PopReserve.css'

export class PopReserve extends Component {

    confirm = (scheduleId) => () => {
        message.info('success');
        this.props.handleReserveSchedule(scheduleId,this.props.schedule.tutorId)   
    }

    render() {
        const {schedule, handleDeleteSchedule} = this.props
        const text = <div>
                        <b style={{color:'red'}}>Price: {schedule.price} Baht &nbsp;
                            <i className="fas fa-trash"
                                onClick={handleDeleteSchedule(schedule.id)}
                            ></i>  
                        </b>
                        <div>Are you sure ?</div>                        
                    </div>        
        return (
            <Popconfirm placement="right" 
                title={text} 
                onConfirm={this.confirm(schedule.id)} 
                okText="Yes" 
                cancelText="No"
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


