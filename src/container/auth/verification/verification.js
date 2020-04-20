import React from 'react'
import { verifyValidator } from '../../../components/validator'
import Verificationform from './verificationform'
import { verification, reotp, pwdupdate } from '../../../services/action/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ConfirmPopup from '../../../components/confirmationPopup';

class Verification extends React.Component {
    state = {
        user: this.props.location.state.email,
        pathname: this.props.location.state.pathname,
        type: '',
        data: {
            otp: '',
            user: this.props.location.state.email,
            deviceType: 'WEB',
        },
        errors: {},
        open: false,
        timerAgain: false
    }
    onChange = (e) => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        const { data, pathname } = this.state
        const errors = verifyValidator(data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0)
            if (pathname === '/auth/forgot')
                this.props.pwdupdate(data);
            else
                this.props.verification(data);
    }
    resend = (e) => {
        e.preventDefault()
        this.props.reotp(this.state.user)
        this.setState({
            timerAgain: true
        })
    }
    componentWillReceiveProps(props) {
        const { Verify, pwdupdatefailed } = props
        if (Verify.success === false) {
            this.setState({
                verification: props.Verify.message
            })
            
        }
        if (pwdupdatefailed && pwdupdatefailed.success === false) {
            this.setState({
                verification: props.pwdupdatefailed.message
            })
            
        }
        if (pwdupdatefailed && pwdupdatefailed.success) {
            this.setState({
                open: true
            })
            this.props.history.push('/auth/newpwd', { token: pwdupdatefailed.token })
        }
    }
    // handleCloseYes = () => {
    //     const { history, pwdupdatefailed } = this.props
    //     if (pwdupdatefailed && pwdupdatefailed.success) {
    //         history.push('/auth/newpwd', { token: pwdupdatefailed.token })
    //     }
    // }
    render() {
        const { open } = this.state
        const { pwdupdatefailed } = this.props
        return (
            <div className="page_min_height">
                {/* <ConfirmPopup message={pwdupdatefailed && pwdupdatefailed.message} open={open} handleCloseYes={this.handleCloseYes} btuttonText="Done" /> */}
                <div className="login_page forgot_pass mt-60">
                    <Verificationform {...this.state} onSubmit={this.onSubmit} onChange={this.onChange} resend={this.resend} message={pwdupdatefailed && pwdupdatefailed.message}/>
                </div>
            </div>
        )
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        verification,
        reotp,
        pwdupdate
    }, dispatch)
}
const mapGetState = (state) => {
    return {
        Verify: state.auth.Verification,
        pwdupdatefailed: state.auth.Pwdupdate
    }
}
export default connect(mapGetState, mapDispatch)(Verification);