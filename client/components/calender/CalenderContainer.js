import React from 'react';

import { connect } from 'react-redux';
import CalenderPage from "./CalenderPage";
import moment from 'moment';
import {isEmpty} from '../../utils/common';

/**
 * mapping of time with number
 * 9am->1
 * 9pm->23
 */
class CalenderContainer extends React.Component {


    constructor(props){
        super(props);
        this.state={
            currentDate:moment().toDate(),
            show:false,
            eventsMap:{}
        }
    }

    nextDateClick=()=>{
        this.setState({currentDate:moment(this.state.currentDate).add(1,"days").toDate()});
    }
    previousDateClick=()=>{
        this.setState({currentDate:moment(this.state.currentDate).subtract(1,"days").toDate()});
    }

    todayClick=()=>{
        this.setState({currentDate:moment().toDate()});

    }

    addEvent=()=>{
        this.setState({show:true});
    }

    validateEvent=(eventData)=>{

        var eventsMap = {...this.state.eventsMap};
        var currentDate = this.state.currentDate.toDateString();
        var currentDayEvents = eventsMap[currentDate];
        if(isEmpty(currentDayEvents)){
            return true;
        }
        var slot = 0;
        while(slot<eventData.numberOfSlots){
            if(!isEmpty(currentDayEvents.allEvents[eventData.eventStartTime+slot])){
                return false;

            }
            slot++;
        }
        return true;




    }
    hideAddModal=()=>{
        this.setState({show: false});

    }


    createEvent=(eventData)=>{
        if(!this.validateEvent(eventData)){
            return false;
        }
        var eventsMap = {...this.state.eventsMap};
        var currentDate = this.state.currentDate.toDateString();
        var currentDayEvents = eventsMap[currentDate];
        if(isEmpty(currentDayEvents)){
            currentDayEvents = {};
            currentDayEvents.allEvents={};
        }else{
            currentDayEvents = {...currentDayEvents};
        }
        currentDayEvents[eventData.eventStartTime]=eventData;
        eventsMap[currentDate]=currentDayEvents;
        this.setState({eventsMap:eventsMap});
        this.setState({show:false});
        var slot = 0;
        while(slot<eventData.numberOfSlots){
            currentDayEvents.allEvents[eventData.eventStartTime+slot]=true;
            slot++;
        }
        return true;
    }


    deleteEvent=(delEventData)=>{
        var eventsMap = {...this.state.eventsMap};
        var currentDate = this.state.currentDate.toDateString();
        var currentDayEvents = eventsMap[currentDate];
        var eventData = currentDayEvents[delEventData];
        delete eventsMap[currentDate][delEventData];
        this.setState({eventsMap:eventsMap});
        var slot= 0;
        while(slot<eventData.numberOfSlots){
            currentDayEvents.allEvents[eventData.eventStartTime+slot]=false;
            slot++;
        }

    }

    render() {
        var events = this.state.eventsMap[this.state.currentDate.toDateString()];
        if(isEmpty(events)){
            events = {};
        }
        events = {...events};
        return (
            <CalenderPage currentDate={this.state.currentDate.toDateString()}
                          events={events}
                          nextDateClick={this.nextDateClick}
                          previousDateClick={this.previousDateClick}
                          todayClick={this.todayClick}
                          addEvent={this.addEvent}
                          hideAddModal={this.hideAddModal}
                          createEvent={this.createEvent}
                          deleteEvent={this.deleteEvent}
                          show={this.state.show}/>

        );

    }
}


const mapStateToProps = (state) => {

    return {};
}
export default connect(mapStateToProps, null)(CalenderContainer);


