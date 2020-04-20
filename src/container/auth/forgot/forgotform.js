import { Button, TextField, Grid, CircularProgress } from '@material-ui/core'
import React from 'react'
import {Error} from '../../../components/error'
import Asterisk from '../../../components/asterisk'
export default function Forgotform(props) {
    const { errors, loader } = props
    return (
        <div className="inner-form-page box-shadow">
            <Grid container alignItems="center">
                <Grid md={12}>
                    <h3 class="text-center mb-25">Reset your password </h3>
                </Grid>
            </Grid>
            <form onSubmit={props.onSubmit}>
                <Grid md={12} error={!errors.user}>
                    <label>Email or Phone<Asterisk/></label>
                    <TextField name="user" onChange={props.onChange} />
                    {errors.user && <Error text={errors.user} />}
                </Grid>
                <Error text = {props.forgotfailed}/>
                <Grid className="button_col" md={12} item>
                    <Button variant="contained"
                        className="bg-primary-color  mt-10"
                        type="submit" disabled={loader ? true : false} >  {
                            loader ? <CircularProgress /> : 'Submit'
                        }
                    </Button>
                </Grid>
            </form>

        </div>
    )
}