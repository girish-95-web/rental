import React from 'react'
 import CalendarL from './calendar'
 import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {calender} from './../../../services/action/adminCalender'
class Calender extends React.Component{
    state={
        events:[]
    }
    componentDidMount(){
        this.props.calender()
    }
    componentWillReceiveProps(props){
        const {getcalender}=props;
        var disptime=[]
        var getDateCale=[]
        
        if(getcalender && getcalender.success === true)
        {
            getcalender && getcalender.hostlisting && getcalender.hostlisting  && getcalender.hostlisting.map((items,key)=>{
                if(items && items.spacebooking.length > 0){
                    items.spacebooking.map((item, index) => {
                        if(item &&item.startdate){
                            return getDateCale.push({
                                title: items.name,
                                start: new Date(item.startdate + " " + item.starttime),
                                end: new Date(item.enddate + " " + item.endtime)
                            })
                        }
                    })
                }
                    return getDateCale
            })
        }
            this.setState({
            ...this.state,
            events:getDateCale
        })
        
    }

    render(){
        return <>
            <CalendarL {...this.state} {...this.props}/>
        </>
    }
}
const mapDispatch = (dispatch)=>{
    return bindActionCreators({
        calender
    },dispatch)
}
const mapGetState = (state)=>{
    return {
        getcalender:state.adminCalender.calender
    }
}
export default connect(mapGetState,mapDispatch)(Calender)