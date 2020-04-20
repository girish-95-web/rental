import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { TextField, FormControlLabel, Checkbox, Slider, Grid, MenuItem, Select } from '@material-ui/core';
import allData from '../constants/allData';
import image from '../constants/image';
import Picker from './picker';
import { onKeyPress } from '../constants/commonFunc'
export default function SearchFilterForm(props) {
    const { openFilter, amenitiessuccess, data } = props;
    return <Dialog
        className="fillterPopUp"
        open={openFilter}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <form className="filterForm  d-flex flex-flow-column" onSubmit={props.onSubmit}>
            <div className="text-center innerFillterField">
                <Grid className="headerPopUp mb-20" item>
                    <h3 className="text-center" style={{ fontWeight: "normal" }}>More filters</h3>
                    <Button className="filterCloseBtn position-absolute" onClick={props.close}><img className="mr-0" alt="" width="25px" src={image.cross} /></Button>
                </Grid>
                <Grid >
                    <Grid style={{ padding: '20px 40px 8px' }} item className="popUpMinHeight">
                        <Grid item className="formFieldSection">
                            <label>Date</label>
                            <Fragment>
                                <Picker name="date" value={data.date ? data.date : ''} onPickerChange={props.onChange} />
                            </Fragment>
                        </Grid>
                        <Grid item className=" d-flex flex-flow-row fields_row formFieldSection">
                            <Grid item className="pr-10 w-sm-50" md={6}>
                                <label>Starting time</label>
                                <Select name="startTime" className="select_box w-100" defaultValue={data.startTime} labelId="demo-simple-select-label" id="demo-simple-select" onChange={props.onChange}>
                                    <MenuItem value="" disabled selected>Select start time</MenuItem>
                                    {
                                        allData.timeJson.map((item, idd) => {
                                            return <MenuItem value={item.value} key={idd}>{item.time}</MenuItem>
                                        })
                                    }
                                </Select>
                            </Grid>
                            <Grid item className="pl-10 w-sm-50" md={6}>
                                <label>Ending time</label>
                                <Select name="endTime" className="select_box w-100" defaultValue={data.endTime} labelId="demo-simple-select-label" id="demo-simple-select" onChange={props.onChange}>
                                    <MenuItem value="" disabled selected>Select start time</MenuItem>
                                    {
                                        allData.timeJson.map((item, idd) => {
                                            return <MenuItem value={item.value} key={idd}>{item.time}</MenuItem>
                                        })
                                    }
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid className="priceRange formFieldSection" item>
                            <label>Price Range</label>
                            <Slider defaultValue={[data.minPrice, data.maxPrice]} aria-labelledby="discrete-slider-always" step={1} valueLabelDisplay="on" onChange={props.priceOnChange} />
                        </Grid>
                        <Grid item className="formFieldSection">
                            <label>Capacity</label>
                            <Grid class="capicityBox">
                            {
                                data.capacity <= 0 ?
                                <Button onClick={props.lessCapacity} disabled>
                                    -
                                </Button> :
                                <Button onClick={props.lessCapacity}>
                                    -
                                </Button>
                            }
                            <TextField type="text" onKeyPress={e=>onKeyPress(e)} value={data.capacity} name="capacity" placeholder="number of people" onChange={props.onChange}/>
                            <Button onClick={props.addCapacity}>
                                +
                            </Button>
                            </Grid>
                        </Grid>
                        <Grid item className=" formFieldSection">
                            <label>Amenities</label>
                            <Grid className="filtterAmenities">
                                {amenitiessuccess && amenitiessuccess.getamenities.map((items, key) => {
                                    return <FormControlLabel name="amenitiesId" key={key} control={<Checkbox name="amenitiesId" value={items.id} checked={data.amenitiesId && data.amenitiesId.includes(items.id)} onChange={props.onChange} color="primary" />} label={items.name} />
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={12} className="d-flex flex-flow-row justify-contant-center fields_row footerPopupBtn">
                    <Grid item md={3}>
                        <Button className="bg-primary-color" type="submit">Apply</Button>
                    </Grid>
                    <Grid item md={3}>
                        <Button onClick={props.close} className="outlineBtnCol ml-10">Cancel</Button>
                    </Grid>
                </Grid>
            </div>
        </form>
    </Dialog>
}