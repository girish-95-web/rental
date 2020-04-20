import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
require("react-big-calendar/lib/css/react-big-calendar.css");
export default function CalendarL(props){
    const{events}=props;
    console.log('getDateCale',events)
    const localizer = momentLocalizer(moment)
    let myEventsList = []
    return <div>
    <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
    />
</div>
}
