import React, { Component } from 'react';
import { PopoverDay } from '../components/PopoverDay';
import { PopReserve } from '../components/PopReserve'
import { Calendar } from 'antd';

export class CreateCalendar extends Component {

    state = {
        schedules: [] // { date: ,timeRange: , price: }    
    }
    
  dateCellRender = (moment) => {      

    let handleAddSchedule = (fromtime,totime,price) => {
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
        schedule => schedule.date.slice(3,5) === moment.date()
      )  
      result = result.filter(
        schedule => schedule.date.slice(0,2) === moment.month()+1
      )
      result = result.filter(
        schedule => schedule.date.slice(6) === moment.year()
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
  }

  render() {
    return (
        <Calendar 
            dateCellRender={this.dateCellRender} 
            monthCellRender={this.monthCellRender} 
        />
    );
  }
}

