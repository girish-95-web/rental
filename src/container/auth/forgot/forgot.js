import React from 'react'
import { forgotValidator } from '../../../components/validator'
import Forgotform from './forgotform'
import { forgot } from '../../../services/action/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
class Forgot extends React.Component {
    constructor() {
        super()
        this.state = {
            loader: false,
            data: {
                user: ''
            },
            errors: {},
        }
    }
    onChange = (e) => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        const errors = forgotValidator(this.state.data)
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props.forgot(this.state.data);
            this.setState({ loader: true })
        }
    }
    componentWillReceiveProps(props) {
        const { forgotfailed, history } = props
        if (forgotfailed && forgotfailed.success === false) {
            this.setState({
                loader: false,
                forgotfailed: forgotfailed&&forgotfailed.message
            })
        }
        if (forgotfailed && forgotfailed.success === true) {
            this.setState({ loader: false })
            history.push('/auth/verification',{email:this.state.data.user,pathname:history.location.pathname})
        }
    }
    render() {
        return (
            <div className="page_min_height">
                <div className="login_page forgot_pass mt-60">
                    <Forgotform {...this.state} onSubmit={this.onSubmit} onChange={this.onChange} />
                </div>
            </div>
        )
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        forgot
    }, dispatch)
}
const mapGetState = (state) => {
    return {
        forgotfailed: state.auth.Forgot
    }
}
export default connect(mapGetState, mapDispatch)(Forgot);