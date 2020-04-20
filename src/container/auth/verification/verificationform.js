import React from 'react'
import { Button, TextField, Grid, Container } from '@material-ui/core'
import {Error} from '../../../components/error';
import Timer from './timer'
export default function Verificationform(props) {
    const { errors } = props
    return (
        <div className="inner-form-page box-shadow">
            <Grid container alignItems="center">
                <Grid md={12} item>
                    <h3 className="text-center mb-25">Account verification </h3>
                </Grid>
            </Grid>
            <Container>
                <form onSubmit={props.onSubmit}>
                    <Grid md={12} error={errors.otp} item>
                        <label>Enter your OTP</label>
                        <TextField name="otp" pattern="/^[0-9\b]+$/" onChange={props.onChange}></TextField>
                        {errors.otp && <Error text={errors.otp} />}
                    </Grid>
                    <div className="d-flex justify-contant-space-between flex-flow-row align-items-center">
                        <div className="d-flex flex-flow-row">Your otp will expire after <div className="d-flex flex-flow-row"><span className="pl-8 mt-0"><Timer {...props}/> </span><span className="pl-8 mt-0">minutes.</span></div></div>
                        <Button className="bg-transparent box-shadow-none btn_link link-default-color" variant="contained" type="submit" onClick={props.resend}>Resend Otp</Button>
                    </div>
                    <Button  className="bg-primary-color  mb-10" variant="contained" type="submit">Verify</Button>
                    {props.verification && <Error text={props.verification}/>}
                </form>
            </Container>
        </div>
    )
}