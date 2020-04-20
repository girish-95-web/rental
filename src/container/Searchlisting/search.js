import React from 'react'
import { connect } from 'react-redux'
import { search } from './../../services/action/homeSpaces'
import { getSpaceType, getListingType, getamenities } from '../../services/action/adminSpaces'
import { searchValidator } from '../../components/validator'
import { bindActionCreators } from 'redux'
import Searchlisting from './Searchlisting'
import { getLocationFieldsLatLng } from '../../constants/commonFunc'
import { Grid } from '@material-ui/core'
import {addcollection} from '../../services/action/adminCollection'
import moment from 'moment';
import {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
class Search extends React.Component {
    constructor(props) {
        super(props)
        this.urlParams = new URLSearchParams(props.location.search)
        this.state = {
            data: {
                latitude: this.urlParams.get('latitude'),
                longitude: this.urlParams.get('longitude'),
                amenitiesId: this.urlParams.get('amenitiesId') === null ? [] : [...this.urlParams.get('amenitiesId').split(',').map(item => parseInt(item))],
                spacingId: this.urlParams.get('spacingId') === null ? [] : [...this.urlParams.get('spacingId').split(',').map(item => parseInt(item))],
                minPrice: this.urlParams.get('minPrice') ? parseInt(this.urlParams.get('minPrice')) : 0,
                maxPrice: this.urlParams.get('maxPrice') ? parseInt(this.urlParams.get('maxPrice')) : 40,
                capacity: this.urlParams.get('capacity') ? parseInt(this.urlParams.get('capacity')) : 0,
                listingId: this.urlParams.get('listingId'),
                date: this.urlParams.get('date'),
                startTime: this.urlParams.get('startTime'),
                endTime: this.urlParams.get('endTime')
            },
            address: {
                where: this.urlParams.get('where'),
                latitude: '',
                longitude: '',
                error: false,
                errorMessage: ''
            },
            errors: {},
            filter: false,
            listLoader: false,
            openFilter: false
        }
    }
    onChange = (e) => {
        const { data, address } = this.state
        if (e.target.name === "listingId" || e.target.name === "spacingId") {
            let data = {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
            this.setState({
                data: {
                    ...data
                },
                listLoader: true
            })
            if (e.target.name === "listingId")
                this.props.getSpaceType(e.target.value)
            this.props.history.push(`/searchlisting?` + this.searchString(data, address))
        } if (e.target.name === "date") {
            let value = moment(e.target.value).format('MM/DD/YYYY')
            this.setState({
                data: {
                    ...this.state.data,
                    date: value
                },
            })
        }
        if (e.target.name === "amenitiesId") {
            let index
            if (e.target.checked) {
                this.setState({
                    data: { ...this.state.data, amenitiesId: [...this.state.data.amenitiesId, parseInt(e.target.value)] }
                })
            } else {
                index = this.state.data.amenitiesId.indexOf(parseInt(e.target.value))
                this.state.data.amenitiesId.splice(index, 1)
                this.setState({
                    data: { ...this.state.data, amenitiesId: [...this.state.data.amenitiesId] }
                })
            }
        }
        if (e.target.name !== "date" && e.target.name !== "listingId" && e.target.name !== "spacingId" && e.target.name !== "amenitiesId") {
            this.setState({
                data: { ...this.state.data, [e.target.name]: e.target.value }
            })
        }
    }
    priceOnChange = (e, newValue) => {
        this.setState({
            data: { ...this.state.data, minPrice: newValue[0], maxPrice: newValue[1] }
        })
    }
    onChangeSetAddress = (address) => {
        const {data} = this.state
        let addressList = {
            ...this.state.address,
            where: address.trimLeft()
        }
        this.setState({
            address: {
                ...this.state.address,
                where: address.trimLeft()
            },
        })
        this.getLocationFields(address);
    }
    getLocationFields = async (addressParam) => {
        var currentLocation = {}
        await geocodeByAddress(addressParam).then(async (address_components) => {
            var latLng = await getLatLng(address_components[0]);
            currentLocation = getLocationFieldsLatLng(latLng, address_components)
            await this.setState({
                currentLocation: currentLocation,
            })
        })
        .catch(error => console.error('Error............', error));
    }
    searchString = (data) => {
        const { address } = this.state
        this.props.search(data)
        let searchString
        searchString = `&where=${address.where}&latitude=${data.latitude}&longitude=${data.longitude}${data.listingId ? '&listingId=' + data.listingId : ''}${data.amenitiesId.length ? '&amenitiesId=' + data.amenitiesId : ''}${data.spacingId.length ? '&spacingId=' + data.spacingId : ''}${data.minPrice ? '&minPrice=' + data.minPrice : ''}${data.maxPrice ? '&maxPrice=' + data.maxPrice : ''}${data.capacity ? '&capacity=' + data.capacity : ''}${data.date ? '&date=' + data.date : ''}${data.startTime ? '&startTime=' + data.startTime : ''}${data.endTime ? '&endTime=' + data.endTime : ''}`
        this.setState({ ...this.state, listLoader: true })
        return searchString;
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { data, address } = this.state
        const errors = searchValidator(address);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props.history.push(`/searchlisting?` + this.searchString(data, address))
            this.setState({ ...this.state, listLoader: true })
        }
    }
    componentDidMount() {
        this.props.search(this.state.data)
        this.props.getListingType()
        this.props.getamenities()
        this.props.getSpaceType(this.state.data.listingId)
        this.setState({
            listLoader: true
        })
    }
    filterOpen = () => {
        this.setState({
            openFilter: true
        })
    }
    close = () => {
        this.setState({
            openFilter: false
        })
    }
    componentWillReceiveProps(props) {
        const { spaceListing, searchsuccess, addsuccess } = props;
        if(addsuccess && addsuccess.success === true){
            this.setState({
                fav:!this.state.fav
            })
        }
        
        if (spaceListing && spaceListing.success === true) {
            this.setState({
                spaceListing: spaceListing && spaceListing.list
            })
        }
        if (searchsuccess) {
            if (searchsuccess.success === true || searchsuccess.success === false) {
                this.setState({
                    listLoader: false,
                    openFilter: false
                })
            }
        }
    }
    lessCapacity=()=>{
        this.setState({
            data:{
                ...this.state.data,
                capacity:parseInt(this.state.data.capacity) - 1
            }
        })
    }
    addCapacity=()=>{
        this.setState({
            data:{
                ...this.state.data,
                capacity:parseInt(this.state.data.capacity) + 1
            }
        })
    }
    linkClick = (id) => {
        this.props.history.push("/listdetail/" + id)
    }
    addtocollection = (id)=>{
        console.log('ggg',id)
        this.props.addcollection(id)
    }
    render() {
        return (
            <Grid className="pageMinHeight">
                <Searchlisting {...this.state} {...this.props} onChange={this.onChange} onSubmit={this.onSubmit} filterOpen={this.filterOpen} close={this.close} onChangeSetAddress={this.onChangeSetAddress} priceOnChange={this.priceOnChange} addCapacity={this.addCapacity} lessCapacity={this.lessCapacity} linkClick={this.linkClick} addtocollection={this.addtocollection}/>
            </Grid>
        )
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        search,
        // initialState,
        getSpaceType,
        getListingType,
        getamenities,
        addcollection
    }, dispatch)
}
const mapGetState = (state) => {
    return {
        searchsuccess: state.homeSpaces.Search,
        spaceType: state.adminSpace.spaceType,
        spaceListing: state.adminSpace.spaceListing,
        amenitiessuccess: state.adminSpace.amenities,
        addsuccess:state.adminCollection.collection
    }
}
export default connect(mapGetState, mapDispatch)(Search)