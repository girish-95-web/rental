import React from 'react'
import { addspaceValidator } from '../../../../components/validator'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Basicinfoform from '../basicinfoform'
import { addspace, getSpaceType, getListingType, initialState, getamenities, addspacemedia,initialStateSpaceType, dashliscence } from '../../../../services/action/adminSpaces'
import { ToastContainer, toast } from 'react-toastify';
import { CircularProgress } from '@material-ui/core';

class Addspace extends React.Component {
    constructor() {
        super()
        this.state = {
            loader: false,
            time: '',
            loaderImages: false,
            data: {
                name: '',
                listingId: '',
                spacingId: '',
                description: '',
                quantity: '',
                monthlyPrice: '',
                minTermId:'',
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
                perOffice: '',
                perDayPass: ''
            },
            // incentive_Static: [
            //     { discount: '3', precent: '5%', cost: 0 },
            //     { discount: '6', precent: '10%', cost: 0 },
            //     { discount: '12', precent: '15%', cost: 0 },
            //     { discount: '24', precent: '20%', cost: 0 },
            //     { discount: '36', precent: '25%', cost: 0 },
            // ],
            areaAvailable: 'false',
            listingSlug: '',
            listingList: '',
            spaceList: '',
            datafile: {
                pdf: '',
                video: '',
                specificArea: [],
                commonArea: []
            },
            imagesPreviewUrls: [],
            imagesPreviewUrl: [],
            errors: {},
            pdfname:''
        }
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
    
    componentDidMount() {
        this.props.getamenities()
        this.props.getListingType()
        this.props.dashliscence()
    }
    onSubmit = (e) => {
        e.preventDefault()
        const { data, datafile, listingSlug } = this.state
        const errors = addspaceValidator(data,listingSlug);
        this.setState({ errors })
        if (Object.keys(errors).length === 0) {
            this.props.addspace(data, datafile);
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
                        perDayPass: ""
                    }
                })
            } else {
                this.setState({
                    data: {
                        ...this.state.data,
                        perHour: "",
                        perHalfDay: "",
                        perDay: "",
                        perDayPass: ""
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
                        perDayPass: e.target.value
                    }
                })
            } else {
                this.setState({
                    data: {
                        ...this.state.data,
                        perHour: "",
                        perHalfDay: "",
                        perDay: "",
                        perDayPass: ""
                    }
                })
            }
        }
        if (e.target.name === "listingId") {
            let value = JSON.parse(e.target.value)
            this.setState({
                listingList: e.target.value,
                data: {
                    ...this.state.data,
                    listingId: value.id,
                    perHour: "",
                    perHalfDay: "",
                    perDay: ""
                },
                listingSlug: value.slug
            })
            this.props.getSpaceType(value.id)
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
                        imagesPreviewUrls: [...this.state.imagesPreviewUrls, {url:reader.result}]
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
            if(files.length<=10){
            files.forEach((file) => {
                let reader = new FileReader();
                reader.onloadend = () => {
                    this.setState({
                        datafile: {
                            ...this.state.datafile,
                            commonArea: [...this.state.datafile.commonArea, file],
                        },
                        imagesPreviewUrl: [...this.state.imagesPreviewUrl, {url:reader.result}]
                    });
                }
                reader.readAsDataURL(file);
            });
        }else{
            this.setState({
                errors:{commonArea:"Only 10 images can be uploaded"}
            })
        }
        }
        if (e.target.name === "pdf") {
            this.setState({
                datafile: {
                    ...this.state.datafile,
                    pdf: e.target.files[0]
                },
                pdfname:e.target.files[0].name
            })
        }
        if (e.target.name === "video"){
            this.setState({
                datafile:{
                    ...this.state.datafile,
                    video:e.target.value
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
                    data: { ...this.state.data, amenitiesId: [...this.state.data.amenitiesId,{amenitiesId: e.target.value }] }
                })
            } else {
                index = this.state.data.amenitiesId.indexOf(e.target.value)
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
        if (e.target.name !== "free" && e.target.name !== "listingId" && e.target.name !== "specificArea" && e.target.name !== "commonArea" && e.target.name !== "pdf" && e.target.name !== "video" && e.target.name !== "spacingId" && e.target.name !== "amenitiesId" && e.target.name !== "freeDayPass") {
            this.setState({
                data: { ...this.state.data, [e.target.name]: e.target.value }
            })
        }
    }
    removeImage1 = (e, id) => {
        this.setState({
            datafile: {
                ...this.state.datafile,
                specificArea: this.state.datafile.specificArea.filter((s, sidx) => id !== sidx),
            },
            imagesPreviewUrls: this.state.imagesPreviewUrls.filter((s, sidx) => id !== sidx)
        });
    }
    removeImage2 = (e, id) => {
        this.setState({
            datafile: {
                ...this.state.datafile,
                commonArea: this.state.datafile.commonArea.filter((s, sidx) => id !== sidx),
            },
            imagesPreviewUrl: this.state.imagesPreviewUrl.filter((s, sidx) => id !== sidx)
        });
    }
    componentWillReceiveProps(props) {
        const { addspaceSuccess, spacemediasuccess, dashliscencesuccess } = props
        if(dashliscencesuccess && dashliscencesuccess.success === true){
            this.setState({
                ...this.setState,
                dash: dashliscencesuccess
            })
        }
        if (addspaceSuccess && addspaceSuccess.success === false) {
            this.setState({
                loader: false
            })
            document.body.classList.remove("loaderRemove");
            toast.error(addspaceSuccess.message)
        }
        if (spacemediasuccess && spacemediasuccess.success) {
            this.setState({
                loaderImages: false
            })
            document.body.classList.remove("loaderRemove");
            toast.success(spacemediasuccess.message)
        }
        if (spacemediasuccess && spacemediasuccess.success === false) {
            this.setState({
                loaderImages: false
            })
            document.body.classList.remove("loaderRemove");
            toast.error(spacemediasuccess.message)
        }
        if (addspaceSuccess && addspaceSuccess.success === true) {
            document.body.classList.remove("loaderRemove");
            toast.success(addspaceSuccess.message)
            this.setState({
                loader: false,
                data: {
                    name: '',
                    listingId: '',
                    spacingId: '',
                    description: '',
                    quantity: null,
                    monthlyPrice: null,
                    minTermId: null,
                    depositId: null,
                    setUpFee: 'No',
                    discount: 'No',
                    amenitiesId: [],
                    visibility: '',
                    perHour: null,
                    perHalfDay: null,
                    perDay: null,
                    spaceSize: null,
                    areaUnitsId: null,
                },
                areaAvailable: 'false',
                listingSlug: '',
                listingList: '',
                spaceList: '',
                datafile: {
                    pdf: '',
                    specificArea: [],
                    commonArea: [],
                    video: '',
                },
                imagesPreviewUrls: [],
                imagesPreviewUrl: [],
            })
            this.props.initialStateSpaceType()
        }
    }
    componentWillUnmount() {
        this.props.initialState()
    }
    // onChangeIncentives = (e,id)=>{
    //     const {data} = this.state
    //     let dataList = data.incentives.map((items,key)=>{
    //         if(key===id){
    //             return { ...items, [e.target.name]: e.target.value};
    //         }
    //         if (key !== id) return items;
    //     })
    // }
    render() {
        const { loaderImages, loader } = this.state
        return (
            <>
                {
                    !loaderImages || !loader ?
                    <>
                        <ToastContainer autoClose={8000} />
                        <Basicinfoform {...this.state} {...this.props} onClickVisibilityEnable={this.onClickVisibilityEnable} onClickVisibility={this.onClickVisibility} onSubmit={this.onSubmit} onChange={this.onChange} handleclick={this.handleclick} removeImage1={this.removeImage1} removeImage2={this.removeImage2} onChangeIncentives={this.onChangeIncentives} />
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
        initialState,
        addspace,
        initialStateSpaceType,
        getSpaceType,
        getListingType,
        getamenities,
        addspacemedia,
        dashliscence
    }, dispatch)
}
const mapGetState = (state) => {
    return {
        addspaceSuccess: state.adminSpace.space,
        spaceType: state.adminSpace.spaceType,
        spaceListing: state.adminSpace.spaceListing,
        amenitiessuccess: state.adminSpace.amenities,
        spacemediasuccess: state.adminSpace.spacemedia,
        dashliscencesuccess:state.adminSpace.dashliscence
    }
}
export default connect(mapGetState, mapDispatch)(Addspace);