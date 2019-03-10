import React from 'react';
import './table.css';
import CalendarHeader from './CalendarHeader';
import EventSchedulerRoot from './EventScheduler/EventSchedulerRoot';
import CreateEventModal from './CreateEventModal';

class CalenderPage extends React.Component {
  render() {
    const { currentDate,
        nextDateClick,
        previousDateClick,
        todayClick,
        addEvent,
        show,
        createEvent,
        deleteEvent,
        events,hideAddModal} = this.props;

    return (

        <div >
           <CalendarHeader currentDate={currentDate}
                           nextDateClick={nextDateClick}
                           previousDateClick={previousDateClick}
                           todayClick={todayClick}
                           addEvent={addEvent}
                           />

            <EventSchedulerRoot events={events} deleteEvent={deleteEvent}/>
            {show? <CreateEventModal show={show} createEvent={createEvent} hideAddModal={hideAddModal} />:""}

        </div>
    );
  }
}

export default CalenderPage;

