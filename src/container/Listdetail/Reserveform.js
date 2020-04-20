import React from 'react';
import { Grid, TextField, Button, FormControl, Select, MenuItem, CircularProgress } from '@material-ui/core';
import allData from './../../constants/allData'
import {Error} from './../../components/error'
import Asterisk from './../../components/asterisk'
import Picker from '../../components/picker';
import { onKeyPress } from '../../constants/commonFunc'
export default function Reserveform(props) {
    const { errors,data, formloader } = props;

    console.log('userid:',props.ownerid)
    const minDate = new Date(new Date().getTime() + 86400000);
    return (
        <form className="mt-20" onSubmit={props.onSubmit}>
            <Grid item className=" pr-xs-0" md={12}>
                <label>Starting date<Asterisk /></label>
                <Picker value={data.startdate} minDate={minDate} name="startdate" onPickerChange={props.onChange}/>
                {errors && errors.startdate && <Error text={errors.startdate} />}
            </Grid>
            {props.spacesuccess && props.spacesuccess.propertyDetail && props.spacesuccess.propertyDetail.listings && props.spacesuccess.propertyDetail.listings.slug === "monthly" ?
                <Grid item className=" d-flex flex-flow-row fields_row Field-xs-100" md={12}>
                    <Grid item className="pr-10 pr-xs-0 w-sm-50" md={6}>
                        <label>Move in date</label>
                        <Picker value={data.moveindate} minDate={data.startdate? data.startdate : minDate} name="moveindate" onPickerChange={props.onChange}/>
                        {errors && errors.moveindate && <Error text={errors.moveindate} />}
                    </Grid>
                    <Grid item className=" w-sm-50" md={6}>
                        <label>Ending date</label>
                        <Picker value={data.enddate} minDate={data.moveindate? data.moveindate : minDate} name="enddate" onPickerChange={props.onChange}/>
                        {errors && errors.enddate && <Error text={errors.enddate} />}
                    </Grid>
                </Grid>
                : <></>
            }
            <Grid item className=" d-flex flex-flow-row fields_row Field-xs-100" md={12}>
                <Grid item className="pr-10 pr-xs-0 w-sm-50" md={6}>
                    <label>Starting time<Asterisk /></label>
                    <FormControl className="select_box w-100">
                        <Select name="starttime" labelId="demo-simple-select-label" id="demo-simple-select" onChange={props.onChange} value={data.starttime}>
                            {
                                allData.timeJson.map((item, idd) => {
                                    return <MenuItem value={item.value} key={idd} selected>{item.time}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                    {errors && errors.starttime && <Error text={errors.starttime} />}
                </Grid>
                <Grid item className=" w-sm-50" md={6}>
                    <label>Ending time<Asterisk /></label>

                    <FormControl className="select_box w-100">
                        <Select name="endtime" labelId="demo-simple-select-label" id="demo-simple-select" onChange={props.onChange} value={data.endtime}>
                            {
                                allData.timeJson.map((item, idd) => {
                                    return <MenuItem value={item.value} key={idd} selected>{item.time}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                    {errors && errors.endtime && <Error text={errors.endtime} />}
                </Grid>
            </Grid>
            <Grid item className="" md={12}>
                <label>Number of attendees<Asterisk /></label>
                <TextField className="w-100" id="" value={data.quantity} name="quantity" onChange={props.onChange} onKeyPress={e=>onKeyPress(e)} inputProps={{ maxLength: 5 }} />
                {errors && errors.quantity && <Error text={errors.quantity} />}
            </Grid>
            {props.failedmessage && <Error text={props.failedmessage}/>}
            <Grid item className="button_col d-flex flex-direction-reverse mb-0" md={12}>
                <Button variant="contained" className="bg-primary-color  mt-10" type="submit" disabled={formloader? true : false}>{formloader? <CircularProgress/> : 'Reserve'}</Button>
            </Grid>
            {props.ownerid===parseInt(localStorage.userId)?
            ''
            :
            <Grid item className="button_col d-flex flex-direction-reverse mb-0" md={12}>
            <Button variant="contained" className="bg-primary-color  mt-10" onClick={props.chatsupportRoute}>Contact</Button>
        </Grid>
            }
            
            {/* <Grid item className="button_col d-flex flex-direction-reverse mb-0" md={12}>
                <Button variant="contained" className="bg-primary-color  mt-10" onClick={props.chatsupportRoute}>Contact</Button>
            </Grid> */}
        </form>

    )
}