import React from 'react';
// import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Grid, Container, Typography, IconButton, CircularProgress } from '@material-ui/core';
// import image_listing from "../../../assets/images/image_listing.png";
import image1 from "../../../assets/images/image1.png";
import DeleteIcon from '@material-ui/icons/Delete';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AlertDialog from '../../../components/deletepopup/deletepopup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getspace, spaceDelete, initialState } from '../../../services/action/adminSpaces';
import { Pagination } from '@material-ui/lab'

class Spaces extends React.Component {
    state = {
        open: false,
        id: '',
        loader: false,
        page: 1
    }
    componentDidMount() {
        this.props.getspace(this.state.page);
        this.setState({
            ...this.state,
            loader: true
        })
    }
    handleClickOpen = (e, id) => {

        this.setState({
            open: true,
            id: id
        })
    }
    handleCloseNo = (e) => {
        this.setState({
            open: false
        })
    }
    handleCloseYes = (e) => {
        this.props.spaceDelete(this.state.id)
        this.setState({
            open: false
        })
    }
    onChangePage = (e, page) => {
        this.props.getspace(page);
    }
    componentWillUnmount() {
        this.props.initialState()
    }
    componentWillReceiveProps(props) {
        const { getSpaceList } = props;
        if (getSpaceList && getSpaceList.success) {
            this.setState({
                ...this.state,
                loader: false
            })
        }
    }
    render() {
        const { getSpaceList, loader } = this.props
        return (
            <>
                {loader ?
                    <div className="listLoader">
                        <CircularProgress />
                    </div>
                    :
                    <Grid className="space_form mb-60">
                        <Grid spacing={3} className="m-0 w-100 mt-25 bg-white" container>
                            <Grid className="d-flex justify-contant-space-between align-items-center border custom_head_padding" md={12} sm={12} xs={12} item>
                                <div className="dropdown_text">
                                </div>
                                <div className="dropdown_text">
                                    {getSpaceList && getSpaceList.isvenueavailable === true ? <Link to='/admin/addspace' className="d-flex bg-primary-color custom_btn" >Add Spaces</Link> : getSpaceList && getSpaceList.isvenueavailable === false ? <Typography style={{ color: 'red' }}>Please enter venue first.</Typography> : ''}
                                </div>
                            </Grid>
                        </Grid>
                        <div className="how-we-help-section ">
                            <Container className="p-0">
                                <Grid spacing={2} sm={12} md={12} lg={12} className="mt-25 w-10 m-0" container item>
                                    {
                                        getSpaceList && getSpaceList.propertyListing && getSpaceList.propertyListing.map((lists, key) => {
                                            var i = 1;
                                            var media = ''
                                            return <Grid className="box-shadow mb-25 p-0 last-child-mb-0" style={{ background: '#ffffff', borderRadius: '20px' }} container item key={key}>
                                                <Grid xs={12} sm={4} md={4} lg={4} item>
                                                    <div className="grid_image space d-flex position-relative" >
                                                        {/* <img alt="" src={image_listing} /> */}
                                                        {!lists.propertymedia.length ?
                                                            media = ''
                                                            : lists.propertymedia && (i === 1) && lists.propertymedia.map((item, key) => {

                                                                if (item.type === "Image" && item.media !== "null") {
                                                                    media = process.env.REACT_APP_URL_IMAGE + lists.propertymedia[key].media
                                                                    i = i + 1;
                                                                }
                                                            })}
                                                        {<>
                                                            <img alt="" src={media !== '' ? media : image1} />
                                                        </>}
                                                        <div className="PublishNotStatus">
                                                            {lists.visibility === "Enable" ?
                                                                <Typography className="f13" style={{ backgroundColor: "green", color: 'white', padding: '0 5px', borderRadius: '5px' }}>Published</Typography>
                                                                :
                                                                <Typography className="f13" style={{ backgroundColor: "red", color: 'white', padding: '0 5px', borderRadius: '5px' }}>Not Published</Typography>
                                                            }
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid xs={12} sm={8} md={8} lg={8} item>
                                                    <div className=" main_grid_col spaceContent">
                                                        <Grid container alignItems="center">
                                                            <Grid xs={10} item>
                                                                <div className="grid_contant">
                                                                    <Grid xs={12} container item>
                                                                        <Grid xs={7} item>
                                                                            <div className="d-flex justify-contant-space-between ">
                                                                                <h4 className="text-ellipsis">{lists.name}</h4>
                                                                            </div>
                                                                        </Grid>

                                                                        {lists.listings && lists.listings.slug === "hourly" ?
                                                                            <Grid item xs={5}>

                                                                                {lists.propertyprice && lists.propertyprice.perHour !== null ?

                                                                                    <h4 className="primary-color text-right">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(lists.propertyprice.perHour) + "/ hour"}</h4>
                                                                                    : lists.propertyprice && lists.propertyprice.perHalfDay !== null ?
                                                                                        <h4 className="primary-color text-right">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(lists.propertyprice.perHalfDay) + "/ half-day"}</h4>
                                                                                        : lists.propertyprice && lists.propertyprice.perDay !== null ?
                                                                                            <h4 className="primary-color text-right">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(lists.propertyprice.perDay) + "/ day"}</h4>
                                                                                            :
                                                                                            <></>
                                                                                }
                                                                            </Grid>

                                                                            : lists.listings && lists.listings.slug === "monthly" ?
                                                                                <Grid item xs={5}>
                                                                                    {lists.propertyprice && lists.propertyprice.monthlyPrice !== null ?

                                                                                        <h4 className="primary-color text-right">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(lists.propertyprice.monthlyPrice) + "/ month"}</h4>


                                                                                        :
                                                                                        <>

                                                                                        </>
                                                                                    }
                                                                                </Grid>
                                                                                : lists.listings && lists.listings.slug === "day_pass" ?
                                                                                    <Grid item xs={5}>
                                                                                        {lists.propertyprice && lists.propertyprice.perDayPass !== null ?

                                                                                            <h4 className="primary-color text-right">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(lists.propertyprice.perDayPass) + "/ day"}</h4>


                                                                                            :
                                                                                            <>

                                                                                            </>
                                                                                        }
                                                                                    </Grid>
                                                                                    :
                                                                                    <>
                                                                                    </>
                                                                        }


                                                                    </Grid>
                                                                    <Typography className="descEli pr-5 dark-color pt-10 pb-10">{lists.description} </Typography>
                                                                    <Typography className="pr-5 gray-color">Quantity: {lists.quantity} </Typography>
                                                                </div>
                                                            </Grid>
                                                            <Grid xs={2} item>
                                                                {/* <Tooltip title="Delete">  */}
                                                                <IconButton title="Delete" onClick={e => this.handleClickOpen(e, lists.id)} type="button" className="trash w-100 text-center" style={{ display: 'block' }}> <DeleteIcon /> </IconButton>
                                                                {/* </Tooltip> */}
                                                                {/* <Tooltip title="Edit">    */}
                                                                <Link className="w-100 text-center ic_edit" title="Edit" style={{ display: 'block' }} to={"/admin/editspace/" + lists.id}><EditTwoToneIcon /></Link>
                                                                {/* </Tooltip> */}
                                                                {/* <Tooltip title="View">   */}
                                                                <Link className="w-100 text-center ic_preview" title="Preview" style={{ display: 'block' }} to={"/listdetail/" + lists.id}><VisibilityIcon /></Link>
                                                                {/* </Tooltip> */}
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        })
                                    }
                                </Grid>
                            </Container>
                        </div>
                    </Grid>}
                {getSpaceList && getSpaceList.totalpageno > 1 ?
                    <Pagination className="mb-60" count={getSpaceList && getSpaceList.totalpageno} onChange={(e, page) => this.onChangePage(e, page)} shape="rounded" color="primary" />
                    :
                    ''}
                <AlertDialog title='Are you sure want to delete?' open={this.state.open} handleCloseNo={this.handleCloseNo} handleCloseYes={this.handleCloseYes} />

            </>
        )
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        getspace,
        initialState,
        spaceDelete
    }, dispatch)
}
const mapGetState = (state) => {
    return {
        getSpaceList: state.adminSpace.space
    }
}
export default connect(mapGetState, mapDispatch)(Spaces);