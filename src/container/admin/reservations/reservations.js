import React from 'react';
import ReservList from './reservList';
import { ToastContainer, toast } from 'react-toastify';
import { Tabs, Tab, Link } from '@material-ui/core';
import { getReserve, cancelreservation, review, initialState } from '../../../services/action/adminReserve';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AlertDialog from '../../../components/deletepopup/deletepopup';
import ReviewPopup from '../../../components/reviewpopup/reviewpopup';
import { deleteInitial } from '../../../services/action/initialAction';
var toastId = null;
class Reservations extends React.Component {
    state = {
        bookingId: '',
        value: 0,
        cancelModel: false,
        review: false,
        loader:false,
        data: {
            spacebookId: null,
            rating: 0,
            review: ''
        },
        errors: {},
        page:1
    }
    handleChange = (event, newValue) => {
        let type = newValue === 0 ? 'past' : 'future'
        this.setState({
            value: newValue,
            loader:true
        })
        this.props.getReserve(type, 1)
    }
    componentDidMount() {
        const { value } = this.state
        let type = value === 0 ? 'past' : 'future'
        this.props.getReserve(type, this.state.page)
        this.setState({
            loader:true
        })
    }
    componentWillMount() {
        this.props.initialState()
    }
    handleCloseNo = () => {
        this.setState({
            cancelModel: false,
            review: false,
        })
    }
    bookingReview = (e, id) => {
        console.log('event',id)
        this.setState({
            review: true,
            data: {
                ...this.state.data,
                spacebookId: id
            }
        })
    }
    cancelBooking = (e, id) => {
        this.setState({
            bookingId: id,
            cancelModel: true,
        })
    }
    handleCloseYes = () => {
        this.props.cancelreservation(this.state.bookingId)
        this.setState({
            cancelModel: false,
        })
    }
    onChangeReview = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        })
    }
    onChange = (e, page) => {
        console.log('page',page)
        const { value } = this.state
        let type = value === 0 ? 'past' : 'future'
        this.props.getReserve(type, page)
    }
    addReview = () => {
        console.log('data',this.state.data)
        this.props.review(this.state.data)
            const { value } = this.state
        let type = value === 0 ? 'past' : 'future'
            this.props.getReserve(type, this.state.page)
    }
    componentWillReceiveProps(props) {
        console.log('props',props.getReserve)

        const { getReserve, getReserveList, reviewsuccess} = props
        if (getReserveList && getReserveList.success === true) {
            if (getReserve.deletedMessage) {
                if (!toast.isActive(toastId))
                    toastId = toast.success(getReserve.message)
            }
            this.setState({
                loader:false
            })
        }
        if (getReserveList && getReserveList.success === false) {
            if (getReserveList.deletedMessage) {
                if (!toast.isActive(toastId))
                    toastId = toast.error(getReserveList.message)
            }
            this.setState({
                loader:false
            })
        }
        if(reviewsuccess && reviewsuccess.success === true){
            this.setState({
                ...this.state,
                review:false
            })
            if (!toast.isActive(toastId))
            toast.success(reviewsuccess.message)
        }
        if(reviewsuccess && reviewsuccess.success === false){
            this.setState({
                ...this.state
            })
            if (!toast.isActive(toastId))
            toast.error(reviewsuccess.message)
        }
        if(getReserveList && getReserveList.success === true ){
            if (!toast.isActive(toastId))
            toast.success(getReserveList.message)
        // props.deleteInitial();
        }
        if(getReserve && getReserve.success === false){
            if (!toast.isActive(toastId))
            toast.error(getReserve.message)
        // props.deleteInitial();
    }
    
    }
    
    render() {
        const { value, cancelModel, review } = this.state
        return <>
            <ToastContainer autoClose={8000} />
            <div className="space_form">
                <Tabs value={value} onChange={this.handleChange} className="m-0 w-100 mt-25 bg-white border tabs-list">
                    <Tab label="Past" className="" />
                    <Tab label="Upcoming" className="" />
                </Tabs>
                {value === 0 && <ReservList name="No Past Bookings" {...this.props} {...this.state} bookingReview={this.bookingReview} onChange={this.onChange}/>}
                {value === 1 && <ReservList name="No Upcoming Bookings" {...this.props} {...this.state} cancelBooking={this.cancelBooking} onChange={this.onChange}/>}
                <AlertDialog title='Are you sure want to cancel booking?' open={cancelModel} handleCloseNo={this.handleCloseNo} handleCloseYes={this.handleCloseYes} />
                <ReviewPopup review={review} {...this.state} onChangeReview={this.onChangeReview} handleSave={this.addReview} handleCancel={this.handleCloseNo} />
            </div>
        </>
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        getReserve,
        review,
        cancelreservation,
        deleteInitial,
        initialState
    }, dispatch)
}
const mapGetState = (state) => {
    return {
        getReserveList: state.adminReserve.reserve,
        getReserve: state.adminReserve.reservationCancel,
        reviewsuccess:state.adminReserve.review,
    }
}
export default connect(mapGetState, mapDispatch)(Reservations);