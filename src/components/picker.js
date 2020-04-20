import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
export default function Picker(props){return <div className="position-relative datePicker"><MuiPickersUtilsProvider utils={DateFnsUtils}><KeyboardDatePicker className="w-100" value={new Date(props.value)} format="MM/dd/yyyy" minDate={props.minDate} maxDate={props.maxDate} onChange={e=>props.onPickerChange({"target":{"value":e.toString(),"name":props.name,}})} /></MuiPickersUtilsProvider></div>}