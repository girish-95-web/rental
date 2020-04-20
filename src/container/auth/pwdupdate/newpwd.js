import React from 'react'
import { newpwdValidator } from '../../../components/validator'
import Newpwdform from './newpwdform'
import { newpwd } from '../../../services/action/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container } from '@material-ui/core';
import ConfirmPopup from '../../../components/confirmationPopup';

class Newpwd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                password: ''
            },
            cpassword:'',
            open:false,
            message:'',
            errors: {},
            loader:false
        }
    }
    onSubmit = (e) => {
        e.preventDefault()
        const errors = newpwdValidator(this.state.data,this.state.cpassword);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props.newpwd(this.state.data);
            this.setState({
                loader:true
            })
        }
    }
    onChange = (e) => {
        if(e.target.name==="cpassword"){
            this.setState({
                ...this.state,
                cpassword:e.target.value
            })
        }else
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        })
    }
    componentWillReceiveProps(props) {
        const { pwdupdate } = props
        if(pwdupdate && pwdupdate.success){
            localStorage.clear()
            this.setState({
                loader:false,
                open:true
            })
            localStorage.clear()
        }
        if(pwdupdate && !pwdupdate.success){
            this.setState({
                loader:false,
                message:pwdupdate.message
            })
        }
    }
    handleCloseYes = () =>{
        this.setState({
            open:false
        })
        this.props.history.push('/auth/login')
    }
    render() {
        const { pwdupdate } = this.props
        const {open} = this.state
        return (
            <div className="login_page mt-60">
                <ConfirmPopup message={pwdupdate&&pwdupdate.message} open={open} handleCloseYes={this.handleCloseYes} btuttonText="Go To Login"/>
                <Container>
                    <Newpwdform {...this.state} onSubmit={this.onSubmit} onChange={this.onChange} />
                </Container>
            </div>
        )
    }
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        newpwd
    }, dispatch)
}

const mapGetState = (state) => {
    return {
        pwdupdate: state.auth.Newpwd
    }
}
export default connect(mapGetState, mapDispatch)(Newpwd);    