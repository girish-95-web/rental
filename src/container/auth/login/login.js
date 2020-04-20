import React from 'react'
import { loginValidator } from './../../../components/validator'
import Loginform from './loginform'
import { login } from './../../../services/action/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container } from '@material-ui/core';
class Login extends React.Component {
    constructor() {
        super()
        this.showHide = this.showHide.bind(this);
    }
    state = {
        loader: false,
        type: '',
        data: {
            user: '',
            password: '',
            deviceType: 'WEB',
            loginType: 'username',
            profile: '',
            facebookId: '',
            googleId: '',
            firstName: '',
            lastName: '',
            gender: ''
        },
        errors: {},
        input: "password"
    }
    onSubmit = (e) => {
        e.preventDefault()
        const errors = loginValidator(this.state.data, this.state.type);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props.login(this.state.data);
            this.setState({ loader: true })
        }
    }
    showHide = (e) => {
        e.stopPropagation();
        this.setState({
            input: this.state.input === 'password' ? 'input' : 'password'
        })
    }
    onChange = (e) => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        })
    }
    onClickLogin = (e, type) => {
        this.setState({
            type: type,
            open: true
        })
    }
    componentWillReceiveProps(props) {
        const { loginfailed, history } = props
        if (loginfailed) {
            if (loginfailed.success === false) {
                this.setState({
                    loginfailed: loginfailed.message,
                    loader: false
                })
            } else {
                this.setState({ loader: false })
            }
            if (loginfailed.verified === false) {
                this.setState({ loader: false })
                history.push('/auth/verification', { email: loginfailed.value })
            } else {
                this.setState({ loader: false })
            }
        } else {
            this.setState({ loader: false })
        }
    }
    SocialLogin = (user) => {
        this.setState({
            data: {
                ...this.state.data,
                user: user._profile && user._profile.email,
                loginType: user._provider,
                profile: user._profile && user._profile.profilePicURL,
                facebookId: user._profile && user._profile.id,
                firstName: user._profile && user._profile.firstName,
                lastName: user._profile && user._profile.lastName,
            }
        })
        let data = {
            user: user._profile && user._profile.email,
            loginType: user._provider,
            profile: user._profile && user._profile.profilePicURL,
            deviceType: 'WEB',
            facebookId: user._profile && user._profile.id,
            firstName: user._profile && user._profile.firstName,
            lastName: user._profile && user._profile.lastName,
        }
        this.setState({ loader: true })
        this.props.login(data);
    }
    SocialLoginFailure = (err) => {
    }
    googleSocialLogin = (user) => {
        this.setState({
            data: {
                ...this.state.data,
                user: user._profile && user._profile.email,
                loginType: user._provider,
                profile: user._profile && user._profile.profilePicURL,
                googleId: user._profile && user._profile.id,
                firstName: user._profile && user._profile.firstName,
                lastName: user._profile && user._profile.lastName,
            }
        })
        let data = {
            user: user._profile && user._profile.email,
            loginType: user._provider,
            profile: user._profile && user._profile.profilePicURL,
            deviceType: 'WEB',
            googleId: user._profile && user._profile.id,
            firstName: user._profile && user._profile.firstName,
            lastName: user._profile && user._profile.lastName,
        }
        this.setState({ loader: true })
        this.props.login(data);
    }
    googleSocialLoginFailure = (err) => {
        console.log(err, "err====")
    }
    render() {
        return (
            <div className="login_page mt-60">
                <Container>
                    <Loginform {...this.state} onSubmit={this.onSubmit} onChange={this.onChange} onClickLogin={this.onClickLogin} showHide={this.showHide} SocialLoginFailure={this.SocialLoginFailure} SocialLogin={this.SocialLogin} googleSocialLogin={this.googleSocialLogin} googleSocialLoginFailure={this.googleSocialLoginFailure}/>
                </Container>
            </div>
        )
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        login
    }, dispatch)


}
const mapGetState = (state) => {
    return {
        loginfailed: state.auth.Login
    }
}
export default connect(mapGetState, mapDispatch)(Login);