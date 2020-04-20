import React from 'react';
import { Grid, TextField, Button, CircularProgress, Select, MenuItem } from '@material-ui/core';
import {Error} from '../../components/error'
import AutoCompleteSearch from '../../constants/autoCompleteSearch';
import Asterisk from './../../components/asterisk'
// import allData from '../../constants/allData';

export default function Form(props) {
    const { errors, formloader, data, spaceListing, spaceType } = props;
    return (
        <form onSubmit={props.onSubmit} className="fornInput">
            <Grid item md={12} error={errors.where}>
                <label>Where<Asterisk/></label>
                <AutoCompleteSearch {...props} />
                {errors && errors.where && <Error text={errors.where} />}
            </Grid>
            <Grid item md={12} error={errors.listingId}>
                <label>Listing Type</label>
                <Select className="select_box w-100 "
                    // value={listingList}
                    name="listingId" onChange={props.onChange}>
                    {
                        spaceListing && spaceListing.list && spaceListing.list.listing && spaceListing.list.listing.map((data, key) => {
                            return <MenuItem value={data.id} key={key} >{data.type}</MenuItem>
                        })
                    }
                </Select>
                {errors && errors.listingId && <Error text={errors.listingId} />}
            </Grid>
            <Grid item md={12} error={errors.spacetype}>
                <label>Space Type</label>
                <Select className="select_box w-100" name="spacingId"
                    value={data.spacingId} onChange={props.onChange}>
                    {
                        spaceType && spaceType.data && spaceType.data.map((data, key) => {
                            return <MenuItem value={data.spaceId} key={key}>{data.listing_space && data.listing_space.type}</MenuItem>
                        })
                    }
                </Select>
                {errors && errors.spacingId && <Error text={errors.spacingId} />}
            </Grid>
            {/* 
            <Grid item md={12} error={errors.date}>
                <label>Date</label>
                <TextField type="date" id="" name="date" onChange={props.onChange} />
                {errors && errors.date && <Error text={errors.date} />}
            </Grid>
            <Grid item className=" d-flex flex-flow-row fields_row" md={12}>
                <Grid item className="pr-10 w-sm-50" md={6} error={errors.startingtime}>
                    <label>Starting time</label>
                    <Select name="startingtime" className="select_box w-100" value={data.startingtime} labelId="demo-simple-select-label" id="demo-simple-select" onChange={props.onChange}>
                        <MenuItem value="" disabled selected>Select start time</MenuItem>
                        {
                            allData.timeJson.map((item, idd) => {
                                return <MenuItem value={item.value} key={idd}>{item.time}</MenuItem>
                            })
                        }
                    </Select>
                    {errors && errors.startingtime && <Error text={errors.startingtime} />}
                </Grid>
                <Grid item className="pl-10 w-sm-50" md={6} error={errors.endingtime}>
                    <label>Ending time</label>
                    <Select name="endingtime" className="select_box w-100" value={data.endingtime} labelId="demo-simple-select-label" id="demo-simple-select" onChange={props.onChange}>
                        <MenuItem value="" disabled selected>Select start time</MenuItem>
                        {
                            allData.timeJson.map((item, idd) => {
                                return <MenuItem value={item.value} key={idd}>{item.time}</MenuItem>
                            })
                        }
                    </Select>
                    {errors && errors.endingtime && <Error text={errors.endingtime} />}
                </Grid>
            </Grid>

            <Grid item md={12} error={errors.attendees}>
                <label>Number of attendees</label>
                <TextField id="" name="attendees" onChange={props.onChange} />
                {errors && errors.attendees && <Error text={errors.attendees} />}
            </Grid>
             */}
            <Grid item className="button_col" md={12}>
                <Button variant="contained" className="bg-primary-color  mt-10" type="submit" disabled={formloader ? true : false}>{formloader ? <CircularProgress /> : "Search"}</Button>
            </Grid>
        </form>

    )
}