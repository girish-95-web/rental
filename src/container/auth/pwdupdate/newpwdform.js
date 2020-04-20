import React from 'react'
import { Button, TextField, Grid, CircularProgress } from '@material-ui/core'
import {Error} from '../../../components/error'
export default function Newpwdform(props) {
    const { errors, loader, message } = props
    return (
        <div className="inner-form-page box-shadow">
            <form onSubmit={props.onSubmit}>
                <Grid md={12} error={errors.password}>
                    <label>New Password</label>
                    <TextField name="password" type="password" onChange={props.onChange}></TextField>
                    {errors.password && <Error text={errors.password} />}
                </Grid>
                <Grid md={12} error={errors.password}>
                    <label>Confirm Password</label>
                    <TextField name="cpassword" type="password" onChange={props.onChange}></TextField>
                    {errors.cpassword && <Error text={errors.cpassword} />}
                </Grid>
                <Button className="bg-primary-color  mt-10" disabled={loader ? true : false} variant="contained" type="submit">{loader ? <CircularProgress /> : 'Submit'}  </Button>
                <Error text={message} />
            </form>
        </div>
    )
}