import React, {Component} from 'react';
import {isEmpty} from "../../../utils/common";

class EventSchedulerRoot extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            start: 9,
        }
    }

    getPmEventTime = () => {
        var pmEventTime = [];
        var start = 1;
        while (start <= 9) {
            pmEventTime.push(<EventTime time={start} meridian={" pm"} key={start + "pm"}/>);
            start++;
        }
        return pmEventTime;
    }
    getEventCalendar = () => {
        const {events,deleteEvent} = this.props;

        var eventCalendarArry = [];


        var start =1;
        var event ="exampleString";
        while (start <= 25) {
            var event = events[start];
            if(!isEmpty(event)){
                var slots = 1;
                while(slots<=parseInt(event.numberOfSlots)){

                    eventCalendarArry.push(<EventCalendar key={start} event={event} deleteEvent={deleteEvent} slot={slots == '1'}/>);
                    start++;
                    slots++;

                }

            }else{
                eventCalendarArry.push(<EventCalendar key={start}  deleteEvent={deleteEvent} />);
                start++;

            }
        }
        return eventCalendarArry;
    }

    render() {
        const {events} = this.props;
        const {currentDate,nextDateClick,previousDateClick,todayClick,addEvent} = this.props;
        return (
            <div style={{"position": "relative", "zoom": "1", "padding": "0px 28px"}}>
                <div style={{"zoom": "1", "position": "relative"}}>
                    <table className="tableSpacing" style={{" width": "100%", "position": "absolute"}}>
                        <tbody>
                        <tr>
                            <td style={{"padding": "0px", "border": "0px none"}}>
                                <table className="tableSpacing" style={{"width": "45px"}}>
                                    <tbody>
                                    <tr>
                                        <td style={{"padding": "0px", "border": "0px none"}}>
                                            <table className="tableSpacing" style={{"width": "45px"}}>
                                                <tbody>
                                                {[9, 10, 11].map(time => {
                                                    return <EventTime time={time} meridian={" am"} key={time + "am"}/>
                                                })}
                                                {[12].map(time => {
                                                    return <EventTime time={time} meridian={" n"} key={time + "noon"}/>
                                                })}
                                                {this.getPmEventTime()}
                                                </tbody>
                                            </table>
                                        </td>

                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="100%" style={{"padding": "0px", "border": "1px solid black"}}>
                                <div style={{"position": "relative"}}>
                                    <table cellPadding="0" cellSpacing="0"  style={{"width": "100%" , "border": "0px none" ,
                                        "tableLayout": "fixed"}}>
                                        <tbody>
                                            {this.getEventCalendar()}
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

class EventTime extends React.Component {


    render() {
        const {time, meridian} = this.props;
        return (


            <tr style={{"height": "40px"}}>
                <td className="tdStyle">
                    <div className="calendar_default_rowheader"
                    >
                        <div className="calendar_default_rowheader_inner">
                            <div>{time}<span
                                className="calendar_default_rowheader_minutes">{meridian}</span></div>
                        </div>
                    </div>
                </td>
            </tr>


        );
    }

}


class EventCalendar extends React.Component {
    deleteEvent = () => {
        this.props.deleteEvent(this.props.event.eventStartTime);
    }
    render() {
        const {event,slot,deleteEvent} = this.props;
        var className="",eventName="",eventStartTime="",noOfSlots="" , text="";
        if(!isEmpty(event)){
            className="scheduledEvent";
            eventName=event.eventName;
            noOfSlots=event.numberOfSlots +' slots';
            text=event.eventName+"for "+(event.numberOfSlots/2.0)+" hrs";
        }


        return (

            <tr>
                <td className="rightPanelTd">
                    <div className="calendar_default_cell calendarCell ">
                        <div className={"calendar_default_cell_inner "+className} >{slot?text:""}
                            <div className="tdBtn">
                            {slot &&
                            <a className="deleteBtn" onClick={this.deleteEvent}  >
                                Delete
                            </a>
                            }</div>
                        </div>
                    </div>
                </td>
            </tr>


        );
    }

}

export default EventSchedulerRoot;
