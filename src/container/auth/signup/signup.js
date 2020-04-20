import React from 'react'
import moment from 'moment'
import { signupValidator } from './../../../components/validator'
import Signupform from './signupform'
import { signup, login } from '../../../services/action/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import facebook1 from "../../../assets/images/facebook1.png";
import google from "../../../assets/images/google.png";
import email from "../../../assets/images/email.png";
import phone from "../../../assets/images/phone.png";
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core'
import SocialButton from '../../../components/socialButton'


class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: '',
            loader: false,
            data: {
                user: '',
                firstName: '',
                lastName: '',
                gender: '',
                password: '',
                dob: '',
                role:props.state.role
            },
            errors: {},
        }
    }
    onChange = (e) => {
        if (e.target.name==="dob"){
            let value = moment(e.target.value).format('YYYY/MM/DD')
            this.setState({
                data:{
                    ...this.state.data,
                    [e.target.name]:value
                }
            })
        }
       else{ this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        })
    }
    }
    onSubmit = (e) => {
        e.preventDefault()
        const errors = signupValidator(this.state.data, this.state.type);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props.signup(this.state.data);
            this.setState({ loader: true })
        }
    }
    onClickSignup = (e, type) => {
        this.setState({
            type: type,
            open: true
        })
    }
    SocialLogin = (user) => {
        let data = {
            user: user._profile && user._profile.email,
            loginType: user._provider,
            profile: user._profile && user._profile.profilePicURL,
            deviceType: 'WEB',
            facebookId: user._profile && user._profile.id,
            firstName: user._profile && user._profile.firstName,
            lastName: user._profile && user._profile.lastName,
            role:this.state.data.role
        }
        this.setState({ loader: true })
        this.props.login(data);
    }
    SocialLoginFailure = (err) => {
        console.log(err, "err====")
    }
    googleSocialLogin = (user) => {
        let data = {
            user: user._profile && user._profile.email,
            loginType: user._provider,
            profile: user._profile && user._profile.profilePicURL,
            deviceType: 'WEB',
            googleId: user._profile && user._profile.id,
            firstName: user._profile && user._profile.firstName,
            lastName: user._profile && user._profile.lastName,
            role:this.state.data.role
        }
        this.setState({ loader: true })
        this.props.login(data);
    }
    googleSocialLoginFailure = (err) => {
        console.log(err, "err====")
    }
    componentWillReceiveProps(props) {
        const { signupResult } = props
        if (signupResult.success === true) {
            this.setState({ loader: false })
            this.props.history.push("/auth/verification", { email: signupResult.data.email });
        }
        if (signupResult.success === false)
            this.setState({
                signupfailed: props.signupResult.message,
                loader: false
        })
        if(props.state){
            this.setState({
                data:{
                    ...this.state.data,
                    role:props.state.role
                },
            })
        }
    }
    render() {
        return (
            <div className="page_min_height">
                <Container>
                    <div className="login_page forgot_pass mt-60">
                        <div className="inner-form-page box-shadow">
                            <Grid container alignItems="center" item>
                                <Grid md={12} item>
                                    <h3 className="text-center mb-25">Sign up with</h3>
                                </Grid>
                            </Grid>
                            {this.state.type !== '' ?
                                <Signupform {...this.state} onSubmit={this.onSubmit} onChange={this.onChange} onClickSignup={this.onClickSignup} />
                                :
                                <Grid container>
                                    <Grid className="d-flex flex-flow-column" md={12} sm={12} xs={12} item>
                                        <SocialButton
                                            provider='facebook'
                                            appId='473822100175201'
                                            className="common_btn facebook w-100 mb-20"
                                            variant="contained"
                                            onLoginSuccess={this.SocialLogin}
                                            onLoginFailure={this.SocialLoginFailure}
                                        >
                                            <img alt="" src={facebook1} /> Facebook
                                        </SocialButton>
                                        <SocialButton
                                            provider='google'
                                            appId='690247654637-1dvpbuudbevdfdrs6s8cisl1m0h9obik.apps.googleusercontent.com'
                                            className="common_btn google w-100 mb-20"
                                            variant="contained"
                                            onLoginSuccess={this.googleSocialLogin}
                                            onLoginFailure={this.googleSocialLoginFailure}
                                        >
                                            <img alt="" src={google} /> Google
                                        </SocialButton>
                                        <Grid className="button_col continue_with_social mb-30" md={12} item>
                                            <span>Or</span>
                                        </Grid>
                                        <Button className="common_btn email w-100 mb-20" variant="contained" onClick={e => this.onClickSignup(e, 'email')}> <img alt="" src={email} /> Email</Button>
                                        <Button className="common_btn phone w-100 mb-30" variant="contained" onClick={e => this.onClickSignup(e, 'phone')}> <img alt="" src={phone} /> Phone</Button>

                                    </Grid>
                                    <Grid className="d-flex border-top pt-20 mt-10" md={12} sm={12} xs={12} item>
                                        Already have an account? <Link className="color-hover" to="/auth/login"> Login</Link>
                                    </Grid>
                                </Grid>

                            }
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        signup,
        login
    }, dispatch)
}
const mapGetState = (state) => {
    return {
        signupResult: state.auth.Signup
    }
}
export default connect(mapGetState, mapDispatch)(Signup);