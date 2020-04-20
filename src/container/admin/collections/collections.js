import React from 'react';
import CollectionsList from './collectionsList';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addcollection, getcollection } from './../../../services/action/adminCollection'
var toastId = null;
class Collections extends React.Component {
    state = {
        loader:false,
        page:1
    }
    componentDidMount(){
        this.props.getcollection(this.state.page)
        this.setState({
            loader:true
        })
    }
    addtocollection = (id)=>{
        console.log('ggg',id)
        this.props.addcollection(id)
        this.setState({
            loader:true
        })
    }
    onChange = (e, page) => {
        console.log('page',page)
        this.props.getcollection(page)
    }
    componentWillReceiveProps(props){
        const {getcollectionsuccess,addsuccess}=props;
        console.log(getcollectionsuccess, 'ddd')
        if(getcollectionsuccess && getcollectionsuccess.success === true){
            this.setState({
                loader:false
            })
        }
        if(addsuccess && addsuccess.success === true){
            this.setState({
                fav:!this.state.fav,
                loader:false
            })
                    toastId = toast.success(addsuccess.message)
        }
    }
    render(){
        return <>
            <ToastContainer autoClose={8000} />
        <CollectionsList {...this.state} {...this.props} addtocollection={this.addtocollection} onChange={this.onChange}/>
        </>
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        getcollection,
        addcollection
    }, dispatch)
}
const mapGetState = (state) => {
    return {
        getcollectionsuccess:state.adminCollection.collection,
        addsuccess:state.adminCollection.collection
    }
}
export default connect(mapGetState, mapDispatch)(Collections);