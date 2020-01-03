import React, {Component} from 'react';
import { Popconfirm, message, Button } from 'antd';
import './PopReserve.css'

export class PopReserve extends Component {

    confirm = () => {
        message.info('Clicked on Yes.');
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
                onConfirm={this.confirm} 
                okText="Yes" 
                cancelText="No"
            >
                <Button id={schedule.id} className='confirm-button'>
                    {schedule.timeRange}
                </Button>
            </Popconfirm>
        );
    }
}


