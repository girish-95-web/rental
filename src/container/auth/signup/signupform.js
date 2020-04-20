import React from 'react'
import { TextField, Grid, Button, FormControl, Select, MenuItem, CircularProgress } from '@material-ui/core'
import Picker from '../../../components/picker';
import { Error } from './../../../components/error'
import Asterisk from './../../../components/asterisk'
export default function Signupform(props) {
    const { errors, loader, data } = props;
    var maxBirthdayDate = new Date();
    maxBirthdayDate.setFullYear(maxBirthdayDate.getFullYear() - 18);
    return (
        <div className="container">
            <div className="card">
                <form onSubmit={props.onSubmit}>
                    <Grid md={12} error={errors.email} item>
                        {props.type === "email" ? <label>Email<Asterisk /></label> : <label>Mobile No.<Asterisk /></label>}
                        <TextField name="user" onChange={props.onChange} />
                        {errors && errors.user && <Error text={errors.user} />}
                    </Grid>
                    <Grid md={12} error={errors.firstName} item>
                        <label>First Name<Asterisk /></label>
                        <TextField name="firstName" onChange={props.onChange} />{errors.firstName && <Error text={errors.firstName} inputProps={{ maxLength: 30 }} />}
                    </Grid>
                    <Grid md={12} error={errors.lastName} item>
                        <label>Last Name</label>
                        <TextField name="lastName" onChange={props.onChange} />{errors.lastName && <Error text={errors.lastName} inputProps={{ maxLength: 30 }} />}
                    </Grid>
                    <Grid md={12} error={errors.gender} item>
                        <label>Gender<Asterisk /></label>
                        <FormControl className="select_box">
                            <Select name="gender" labelId="demo-simple-select-label" id="demo-simple-select" value={props.data.gender} onChange={props.onChange}>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Others">Others</MenuItem>
                            </Select>
                        </FormControl>
                        {errors.gender && <Error text={errors.gender} />}
                    </Grid>
                    <Grid md={12} error={errors.password} item>
                        <label>Password<Asterisk /></label>
                        <TextField name="password" type="password" pattern="(?=^.{5,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" onChange={props.onChange} />{errors.password && <Error text={errors.password} />}
                    </Grid>

                    <Grid md={12} error={errors.dob} item>
                        <label>Birthday<Asterisk /></label>
                        <Picker name="dob" value={data.dob} maxDate={maxBirthdayDate} onPickerChange={props.onChange} />
                        {errors.dob && <Error text={errors.dob} />}
                        {/* <TextField name="dob" type="date" onChange={props.onChange} />} */}
                    </Grid>
                    {props.signupfailed && <Error text={props.signupfailed} />}
                    <Grid className="button_col" md={12} item>
                        <Button className="bg-primary-color  mt-10" variant="contained" type="submit" disabled={loader ? true : false}>{loader ? <CircularProgress /> : 'Submit'}</Button>
                    </Grid>
                </form>
            </div>
        </div>

    )
}