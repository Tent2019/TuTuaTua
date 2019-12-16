import React, {Component} from 'react';
import { Popconfirm, message, Button } from 'antd';
import './PopReserve.css'

export class PopReserve extends Component {

    confirm = () => {
        message.info('Clicked on Yes.');
    }

    render() {
        const {offer} = this.props
        const text = <div>
                        <b style={{color:'red'}}>Price: {offer.price} Baht</b>
                        <div>Are you sure ?</div>
                    </div>        
        return (
            <Popconfirm placement="right" 
                title={text} 
                onConfirm={this.confirm} 
                content={'xxx'}
                okText="Yes" 
                cancelText="No">
                <Button className='confirm-button'>{offer.timeRange}</Button>
            </Popconfirm>
        );
    }
}


