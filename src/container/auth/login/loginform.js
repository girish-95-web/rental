import React from 'react';
import {Error} from './../../../components/error';
import { Link } from 'react-router-dom';
import facebook1 from "../../../assets/images/facebook1.png";
import google from "../../../assets/images/google.png";
import { CircularProgress, TextField, Grid, Button } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SocialButton from '../../../components/socialButton'
import Asterisk from '../../../components/asterisk';
export default function Loginform(props) {
    const { errors, loader } = props
    return (
        <div className="inner-form-page box-shadow">
            <Grid container alignItems="center" item>
                <Grid md={12} item>
                    <h3 className="text-center mb-25">Login to continue</h3>
                </Grid>
            </Grid>
            <form onSubmit={props.onSubmit}
                className="fromDesign" >
                <Grid md={12} error={errors.user} item>
                    <label>Email or Phone Number<Asterisk/></label>
                    <TextField id="standard-basic" name="user" onChange={props.onChange} />
                    {errors.user && <Error text={errors.user} />}
                </Grid>
                <Grid md={12} item error={errors.password}>
                    <label>Password<Asterisk/></label>
                    <div style={{position:'relative'}}>
                    <TextField id="standard-password-input"
                        pattern="(?=^.{5,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                        name="password"
                        type={props.input}
                        autoComplete="current-password"
                        onChange={props.onChange} ></TextField>
                        
                        
                            <Button style={{position:'absolute'}} className="show_icon" onClick={props.showHide} >{props.input === 'password' ? <VisibilityIcon/> : <VisibilityOff/>}</Button>
                            </div>
                            {/* <IconButton aria-label="toggle password visibility" edge="end" onClick={props.showHide} >{props.input === 'password' ? 'Show Password' : 'Hide Password'}</IconButton>
                            </TextField> */}
                    {errors.password && <Error text={errors.password} />}
                </Grid>

                {props.loginfailed && <Error text={props.loginfailed}/>}
                {/* <Grid container item>
                    <Grid className="d-flex justify-contant-space-between" md={12} item> */}
                        {/* <div className="show_password">
                            <Button onClick={props.showHide} >{props.input === 'password' ? <VisibilityIcon/> : <VisibilityOff/>}</Button>
                        </div> */}
                    {/* </Grid>
                </Grid> */}
                <Grid className="button_col" md={12} item>
                    <Button variant="contained"
                        className="bg-primary-color  mt-10"
                        type="submit" disabled={loader ? true : false}>{loader ? <CircularProgress /> : 'Login'}
                    </Button>
                </Grid>
                <Grid className="button_col forgot-pass mt-20" md={12} item>
                    <Link to="/auth/forgot">Forgot Password?</Link>
                </Grid>
                <Grid className="button_col continue_with_social mt-20 mb-20" md={12} item>
                    <span>Or continue with</span>
                </Grid>
            </form >

            <Grid className="d-flex justify-contant-space-between mt-40" md={12} item>
                <SocialButton
                    provider='facebook'
                    appId='473822100175201'
                    className="common_btn facebook"
                    variant="contained"
                    onLoginSuccess={props.SocialLogin}
                    onLoginFailure={props.SocialLoginFailure}
                >
                    <img alt="" src={facebook1} /> Facebook
                </SocialButton>
                <SocialButton
                    provider='google'
                    appId='690247654637-1dvpbuudbevdfdrs6s8cisl1m0h9obik.apps.googleusercontent.com'
                    className="common_btn google"
                    variant="contained"
                    onLoginSuccess={props.googleSocialLogin}
                    onLoginFailure={props.googleSocialLoginFailure}
                >
                    <img alt="" src={google} /> Google
                </SocialButton>
            </Grid>
            <Grid className="d-flex justify-contant-center mt-20" md={12} item>
                Don't have an account? <Link className="color-hover" to="/auth/signup">Sign up</Link>
            </Grid>
        </div>
    )
}