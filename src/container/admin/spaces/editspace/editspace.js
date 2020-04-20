import React from 'react'
// import { addspaceValidator } from './../../../../components/validator'
import { connect } from 'react-redux'
import { CircularProgress } from '@material-ui/core';
import { bindActionCreators } from 'redux'
import Basicinfoform from '../basicinfoform'
import { addspaceValidator } from '../../../../components/validator'
import { getSpaceType, getListingType, editspace, getspacedetails, initialState, getamenities, initialStateSpaceType, deleteSpaceMedia, dashliscence } from '../../../../services/action/adminSpaces'
import { ToastContainer, toast } from 'react-toastify';
// var toastId=null;
class Editspace extends React.Component {

    state = {
        time: '',
        data: {
            name: '',
            listingId: '',
            spacingId: '',
            description: '',
            quantity: '',
            monthlyPrice: '',
            minTermId: '',
            depositId: '',
            setUpFee: 'No',
            discount: 'No',
            amenitiesId: [],
            visibility: '',
            perHour: '',
            perHalfDay: '',
            perDay: '',
            spaceSize: null,
            areaUnitsId: null,
            perDayPass: ''
        },
        areaAvailable: 'false',
        listingSlug: '',
        listingList: '',
        spaceList: '',
        spaceType: [],
        datafile: {
            pdf: '',
            specificArea: [],
            commonArea: [],
            video: '',
        },
        imagesPreviewUrls: [],
        imagesPreviewUrl: [],
        id: this.props.match.params.id,
        errors: {},
        loader: false,
        loaderImages: false,
        dash:'',
    }
    componentDidMount() {
        this.props.getspacedetails(this.state.id)
        this.props.dashliscence()
        this.setState({
            loader: true,
        })
    }
    onClickVisibilityEnable = () => {
        this.setState({
            data: {
                ...this.state.data,
                visibility: 'Disable'
            }
        })
    }
    onClickVisibility = () => {
        this.setState({
            data: {
                ...this.state.data,
                visibility: 'Enable'
            }
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { data, id, datafile,listingSlug } = this.state
        const errors = addspaceValidator(data,listingSlug);
        this.setState({ errors })
        if (Object.keys(errors).length === 0) {
            this.props.editspace(id, data, datafile);
            document.body.classList.add("loaderRemove")
            this.setState({
                loader: true,
                loaderImages: true,
            })
        }
    }
    onChange = (e) => {
        if (e.target.name === "free") {
            if (e.target.checked) {
                this.setState({
                    data: {
                        ...this.state.data,
                        perHour: e.target.value,
                        perHalfDay: e.target.value,
                        perDay: e.target.value,
                        perDayPass: '',
                        monthlyPrice: '',
                        depositId: '',
                        minTermId: '',
                        perOffice: ''
                    }
                })
            } else {
                this.setState({
                    data: {
                        ...this.state.data,
                        perHour: "",
                        perHalfDay: "",
                        perDay: "",
                        perDayPass: "",
                        monthlyPrice: '',
                        depositId: '',
                        minTermId: '',
                        perOffice: ''
                    }
                })
            }
        }
        if (e.target.name === "freeDayPass") {
            if (e.target.checked) {
                this.setState({
                    data: {
                        ...this.state.data,
                        perHour: "",
                        perHalfDay: "",
                        perDay: "",
                        perDayPass: e.target.value,
                        monthlyPrice: '',
                        depositId: '',
                        minTermId: '',
                        perOffice: ''
                    }
                })
            } else {
                this.setState({
                    data: {
                        ...this.state.data,
                        perHour: "",
                        perHalfDay: "",
                        perDay: "",
                        perDayPass: "",
                        monthlyPrice: '',
                        depositId: '',
                        minTermId: '',
                        perOffice: ''
                    }
                })
            }
        }
        if (e.target.name === "listingId") {
            let value = JSON.parse(e.target.value)
            this.props.getSpaceType(value.id)
            this.setState({
                data: {
                    ...this.state.data,
                    listingId: value.id,
                    perHour: "",
                    perHalfDay: "",
                    perDay: ""
                },
                listingList: e.target.value,
                listingSlug: value.slug
            })
        }
        if (e.target.name === "specificArea") {
            let files = Array.from(e.target.files);
            if(files.length<=10)
            {
            files.forEach((file) => {
                let reader = new FileReader();
                reader.onloadend = () => {
                    this.setState({
                        datafile: {
                            ...this.state.datafile,
                            specificArea: [...this.state.datafile.specificArea, file],
                        },
                        imagesPreviewUrls: [...this.state.imagesPreviewUrls, { url: reader.result }]
                    });
                }
                reader.readAsDataURL(file);
            });
        }else{
            this.setState({
                errors:{specificArea:"Only 10 images can be uploaded"}
            })
        }
    }
        if (e.target.name === "commonArea") {
            let files = Array.from(e.target.files);
            if(files.length<=10)
            {
            files.forEach((file) => {
                let reader = new FileReader();
                reader.onloadend = () => {
                    this.setState({
                        datafile: {
                            ...this.state.datafile,
                            commonArea: [...this.state.datafile.commonArea, file],
                        },
                        imagesPreviewUrl: [...this.state.imagesPreviewUrl, { url: reader.result }]
                    });
                }
                reader.readAsDataURL(file);
            });
        }else{
            this.setState({
                errors:{specificArea:"Only 10 images can be uploaded"}
            })
        }
    }
        if (e.target.name === "pdf") {
            this.setState({
                datafile: {
                    ...this.state.datafile,
                    pdf: e.target.files[0]
                }
            })
        }
        if (e.target.name === "video") {
            this.setState({
                datafile: {
                    ...this.state.datafile,
                    video: e.target.value
                }
            })
        }
        if (e.target.name === "spacingId") {
            let value = JSON.parse(e.target.value)
            this.setState({
                data: {
                    ...this.state.data,
                    spacingId: value.spaceId
                },
                spaceList: e.target.value,
                areaAvailable: value.areaAvailable
            })
        }
        if (e.target.name === "amenitiesId") {
            let index
            if (e.target.checked) {
                this.setState({
                    data: { ...this.state.data, amenitiesId: [ ...this.state.data.amenitiesId, {amenitiesId: e.target.value }] }
                })
            } else {
                index = this.state.data.amenitiesId.indexOf({amenitiesId:e.target.value})
                this.state.data.amenitiesId.splice(index, 1)
                this.setState({
                    data: { ...this.state.data, amenitiesId: [...this.state.data.amenitiesId] }
                })
            }
        }
        // if (e.target.name === "month") {
        //     let index
        //     if (e.target.checked) {
        //         this.setState({
        //             data: { ...this.state.data, incentives: [...this.state.data.incentives,{month: e.target.value, cost:'' }] }
        //         })
        //     } else {
        //         index = this.state.data.incentives.indexOf(e.target.value)
        //         this.state.data.incentives.splice(index, 1)
        //         this.setState({
        //             data: { ...this.state.data, incentives: [...this.state.data.incentives] }
        //         })
        //     }
        // }
        if (e.target.name==="monthlyPrice")
        {
            this.setState({
                data:{
                    ...this.state.data,
                    monthlyPrice:e.target.value,
                    perHour:'',
                    perHalfDay:'',
                    perDay:'',
                    perDayPass:''
                }
            })
        }
        if(e.target.name==="perHour"){
            this.setState({
                data:{
                    ...this.state.data,
                    perHour:e.target.value,
                    monthlyPrice:'',
                    minTermId:'',
                    depositId:'',
                    perDayPass:''
                }
            })
        }
        if(e.target.name==="perDayPass"){
            this.setState({
                data:{
                    ...this.state.data,
                    perDaypass:e.target.value,
                    perHour:'',
                    perHalfDay:'',
                    perDay:'',
                    monthlyPrice:'',
                    minTermId:'',
                    depositId:'',
                }
            })
        }
        if (e.target.name !== "free" && e.target.name !== "monthlyPrice" && e.target.name !== "perHour" && e.target.name !== "listingId" && e.target.name !== "specificArea" && e.target.name !== "commonArea" && e.target.name !== "pdf" && e.target.name !== "video" && e.target.name !== "spacingId" && e.target.name !== "amenitiesId" && e.target.name !== "freeDayPass") {
            this.setState({
                data: { ...this.state.data, [e.target.name]: e.target.value }
            })
        }
    }
    componentDidUpdate(props){
        const {getspacesuccess} = props
        if (getspacesuccess && getspacesuccess.success === true) {
        this.props.getListingType()
        this.props.getamenities()
    }
    }
    removeImage1 = (e, id, itemid) => {
        this.setState({
            datafile: {
                ...this.state.datafile,
                specificArea: this.state.datafile.specificArea.filter((s, sidx) => id !== sidx),
            },
            imagesPreviewUrls: this.state.imagesPreviewUrls.filter((s, sidx) => id !== sidx),
            loader: true
        });
        if (itemid) {
            this.props.deleteSpaceMedia(itemid)
        }
        

    }
    removevideo = (e, id) => {
        this.setState({
            datafile: {
                ...this.state.datafile,
                video: ''
            },
        });
        if (id) {
            this.props.deleteSpaceMedia(id)
        }
        

    }
    removeImage2 = (e, id, itemid) => {
        this.setState({
            datafile: {
                ...this.state.datafile,
                commonArea: this.state.datafile.commonArea.filter((s, sidx) => id !== sidx),
            },
            imagesPreviewUrl: this.state.imagesPreviewUrl.filter((s, sidx) => id !== sidx),
            loader: true
        });
        if (itemid) {
            this.props.deleteSpaceMedia(itemid)
        }
    }
    componentWillReceiveProps(props) {
        const { getspacesuccess, deleteMediaList,spacemediasuccess, dashliscencesuccess } = props
        if(dashliscencesuccess && dashliscencesuccess.success === true){
            this.setState({
                ...this.setState,
                dash: dashliscencesuccess
            })
        }
        if (deleteMediaList && deleteMediaList.success) {
            this.setState({
                loader: false
            })
            // if (deleteMediaList.success && !toast.isActive(toastId)) {
            //     toastId = toast.success(deleteMediaList.message);
            //   }
            toast.success(deleteMediaList.message)
            this.props.initialState()
        }
        if (spacemediasuccess && spacemediasuccess.success) {
            this.setState({
                loaderImages: false
            })
            document.body.classList.remove("loaderRemove")
            // if (spacemediasuccess.success && !toast.isActive(toastId)) {
            //     toastId = toast.success(spacemediasuccess.message);
            //   }
            toast.success(spacemediasuccess.message)
            this.props.initialState()
        }
        if (spacemediasuccess && spacemediasuccess.success === false) {
            this.setState({
                loaderImages: false
            })
            this.props.initialState()
            document.body.classList.remove("loaderRemove");
            // if (spacemediasuccess.success && !toast.isActive(toastId)) {
            //     toastId = toast.error(spacemediasuccess.message);
            //   }
            toast.error(spacemediasuccess.message)
        }
        if (deleteMediaList && deleteMediaList.success === false) {
            this.setState({
                loader: false
            })
            this.props.initialState()
            // if (deleteMediaList.success && !toast.isActive(toastId)) {
            //     toastId = toast.success(deleteMediaList.message);
            //   }
            toast.error(deleteMediaList.message)
        }
        if (getspacesuccess && getspacesuccess.success === false) {
            this.setState({
                loader: false
            })
            document.body.classList.remove("loaderRemove");
            // toast.error(getspacesuccess.message)
        }
        if (getspacesuccess && getspacesuccess.success === true) {
            let specificAreaList = []
            let commonAreaList = []
            let amenitiesIDSucc = []
            let videoList = {}
            let editList  = getspacesuccess.propertyDetail
            editList&&editList.propertymedia&&editList.propertymedia.map(items => {
                if (items.purpose === 'specificArea') {
                    specificAreaList.push({ url: process.env.REACT_APP_URL_IMAGE + items.media, id: items.id })
                }
                if (items.purpose === 'commonArea') {
                    commonAreaList.push({ url: process.env.REACT_APP_URL_IMAGE + items.media, id: items.id })
                }
                if (items.type === 'Video'){
                    return (videoList.id=items.id, videoList.url=items.media)
                }
            })
            editList&&editList.propertyAmenities&&editList.propertyAmenities.map(items => {
                amenitiesIDSucc.push({ amenitiesId: items.amenitiesId.toString() })
            })
            let price = editList&&editList.propertyprice
            if (editList&&editList.listingId !== null) {
                this.props.getSpaceType(editList.listingId)
                

            }
            this.setState({
                loader: false,
                data: {
                    ...this.state.data,
                    name: editList&&editList.name,
                    listingId: editList&&editList.listingId,
                    spacingId: editList&&editList.spacingId,
                    description: editList&&editList.description,
                    quantity: editList&&editList.quantity,
                    monthlyPrice: price && price.monthlyPrice,
                    minTermId: price && price.minTermId,
                    depositId: price && price.depositId,
                    setUpFee: price && price.setUpFee,
                    discount: price && price.discount,
                    perOffice: price && price.perOffice,
                    perDayPass: price && price.perDayPass,
                    perHour: price && price.perHour,
                    perHalfDay: price && price.perHalfDay,
                    perDay: price && price.perDay,
                    areaUnitsId:editList&&editList.areaUnitsId,
                    spaceSize:editList&&editList.spaceSize,
                    amenitiesId: amenitiesIDSucc
                },
                datafile: {
                    video: videoList,
                    specificArea: [],
                    commonArea: [],
                    pdf: editList&&editList.pdf
                },
                imagesPreviewUrls: specificAreaList,
                imagesPreviewUrl: commonAreaList,
                listingSlug: editList&&editList.listings && editList&&editList.listings.slug,
                listingList: JSON.stringify({ id: editList&&editList.listingId, slug: editList&&editList.listings && editList&&editList.listings.slug }),
                spaceList: JSON.stringify({ spaceId: editList&&editList.spacingId, areaAvailable: editList&&editList.spacings && editList&&editList.spacings.areaAvailable }),
                areaAvailable:editList&&editList.spacings && editList&&editList.spacings.areaAvailable
            })
            document.body.classList.remove("loaderRemove");
            toast.success(getspacesuccess.message)
            this.props.initialStateSpaceType()
        }
    }
    componentWillUnmount() {
        this.props.initialState()
    }
    render() {
        const { loaderImages, loader } = this.state
        return (
            <>
                {
                    !loaderImages || !loader ?
                        <>
                            <ToastContainer autoClose={8000} />
                            <Basicinfoform removevideo={this.removevideo} {...this.state} onClickVisibilityEnable={this.onClickVisibilityEnable} onClickVisibility={this.onClickVisibility} removeImage1={this.removeImage1} removeImage2={this.removeImage2} {...this.props} onSubmit={this.onSubmit} onChange={this.onChange} />
                        </>
                        :
                        <div className="listLoader">
                            <CircularProgress />
                        </div>
                }
            </>
        )
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        getspacedetails,
        editspace,
        initialState,
        getSpaceType,
        getListingType,
        deleteSpaceMedia,
        getamenities,
        initialStateSpaceType,
        dashliscence
    }, dispatch)
}
const mapGetState = (state) => {
    return {
        editspacesuccess: state.adminSpace.space,
        getspacesuccess: state.adminSpace.space,
        spaceType: state.adminSpace.spaceType,
        spaceListing: state.adminSpace.spaceListing,
        amenitiessuccess: state.adminSpace.amenities,
        deleteMediaList: state.adminSpace.deleteMedia,
        spacemediasuccess: state.adminSpace.spacemedia,
        dashliscencesuccess:state.adminSpace.dashliscence
    }
}
export default connect(mapGetState, mapDispatch)(Editspace);