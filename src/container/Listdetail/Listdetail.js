import React from 'react'
import { Grid, Container, Typography, Avatar, Badge, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { Rating } from '@material-ui/lab';
import Reserveform from './Reserveform';
import image1 from './../../assets/images/image1.png'
import noImage from './../../assets/images/banner_img.png'
import list from "../../assets/images/ic_list.png";
// import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import GridList from '../../components/gridList';
export default function Listdetail(props) {
    const { spacesuccess, loader } = props;
    let profile = spacesuccess.propertyDetail && spacesuccess.propertyDetail.property && spacesuccess.propertyDetail.property.users && spacesuccess.propertyDetail.property.users.profilepic
    let firstName = spacesuccess.propertyDetail && spacesuccess.propertyDetail.property && spacesuccess.propertyDetail.property.users && spacesuccess.propertyDetail.property.users.firstName
    let lastName = spacesuccess.propertyDetail && spacesuccess.propertyDetail.property && spacesuccess.propertyDetail.property.users && spacesuccess.propertyDetail.property.users.lastName
    let venuedetail = spacesuccess.propertyDetail && spacesuccess.propertyDetail.property && spacesuccess.propertyDetail.property.venuedetail
    let propertyprice = spacesuccess && spacesuccess.propertyDetail && spacesuccess.propertyDetail.propertyprice
    return (
        <>
            {loader ?
                <div className="listLoader">
                    <CircularProgress />
                </div>
                :
                <div className="main_list_sec d-flex flex-flow-column mb-60">
                    {props && props.mediaImage.length ?
                        <div className="imageHeight">


                            {props.mediaImage.length === 1 ?
                                <Grid className="singleMobilImg" xs={12}>
                                    <img className="singleImage" alt="" src={process.env.REACT_APP_URL_IMAGE + props.mediaImage[0]} />
                                </Grid>
                                :
                                <>
                                </>
                            }

                            {props.mediaImage.length === 2 ?

                                <Grid className=" d-flex flex-flow-row fields_row moboResponsiveImage">
                                    <Grid className="mobileViewImg" md={6}>
                                        <img className="twoImage" alt="" src={process.env.REACT_APP_URL_IMAGE + props.mediaImage[0]} />
                                    </Grid>
                                    <Grid className="mobileViewImg" md={6}>
                                        <img className="twoImage" alt="" src={process.env.REACT_APP_URL_IMAGE + props.mediaImage[1]} />
                                    </Grid>

                                </Grid>
                                :
                                <>
                                </>
                            }
                            {props.mediaImage.length === 3 ?

                                <Grid className=" d-flex flex-flow-row fields_row">
                                    <Grid md={4}>
                                        <img className="threeImage" alt="" src={process.env.REACT_APP_URL_IMAGE + props.mediaImage[0]} width="100%" />
                                    </Grid>
                                    <Grid md={4}>
                                        <img className="threeImage" alt="" src={process.env.REACT_APP_URL_IMAGE + props.mediaImage[1]} width="100%" />
                                    </Grid>
                                    <Grid md={4}>
                                        <img className="singleImage" alt="" src={process.env.REACT_APP_URL_IMAGE + props.mediaImage[2]} width="100%" />
                                    </Grid>
                                </Grid>
                                :
                                <>
                                </>
                            }

                            {props.mediaImage.length === 4 ?

                                <Grid className=" d-flex flex-flow-row fields_row">
                                    <Grid md={6}>
                                        <Grid>
                                            <img className="fourImage" alt="" src={process.env.REACT_APP_URL_IMAGE + props.mediaImage[0]} />

                                            {/* <img src={image2} width="100%" /> */}
                                        </Grid>
                                        <Grid>
                                            <img className="fourImage" alt="" src={process.env.REACT_APP_URL_IMAGE + props.mediaImage[1]} />

                                            {/* <img src={image2} width="100%" /> */}
                                        </Grid>
                                    </Grid>
                                    <Grid md={6}>
                                        <Grid>
                                            <img className="fourImage1" alt="" src={process.env.REACT_APP_URL_IMAGE + props.mediaImage[2]} />

                                            {/* <img src={image2} width="100%" /> */}
                                        </Grid>
                                        <Grid>
                                            <img className="fourImage1" alt="" src={process.env.REACT_APP_URL_IMAGE + props.mediaImage[3]} />

                                            {/* <img src={image2} width="100%" /> */}
                                        </Grid>

                                    </Grid>


                                </Grid>
                                :
                                <>
                                </>
                            }
                            {props.mediaImage.length > 4 ?

                                <Grid className=" d-flex flex-flow-row fields_row">

                                    <Grid className="firstImgFull" md={6}>

                                        <img alt="" src={process.env.REACT_APP_URL_IMAGE + props.mediaImage[0]} width="100%" />


                                    </Grid>

                                    <Grid md={6}>
                                        <Grid className=" d-flex flex-flow-row fields_row">

                                            <Grid md={6}>

                                                <Grid>

                                                    <img alt="" src={process.env.REACT_APP_URL_IMAGE + props.mediaImage[1]} width="100%" />
                                                </Grid>
                                                <Grid>
                                                    <img alt="" src={process.env.REACT_APP_URL_IMAGE + props.mediaImage[2]} width="100%" />
                                                </Grid>
                                            </Grid>
                                            <Grid md={6}>
                                                <Grid>
                                                    <img alt="" src={process.env.REACT_APP_URL_IMAGE + props.mediaImage[3]} width="100%" />
                                                </Grid>
                                                <Grid>
                                                    <img alt="" src={process.env.REACT_APP_URL_IMAGE + props.mediaImage[4]} width="100%" />
                                                </Grid>

                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Grid>
                                :
                                <>
                                </>
                            }
                        </div>
                        :
                        <Grid className="defaultImage fields_row">
                            <Grid className="imageHeight">
                                <img className="singleImage" alt="" src={noImage} />
                            </Grid>
                        </Grid>
                    }
                    <div className="formFixed mt-60">
                        <Container>
                            <Grid className="w-100 m-0 respoSpacing"  container item spacing={6}>
                                <Grid className="pb-0 responsive-w-100" md={6} sm={12} item>
                                    <div className="border-bottom pb-30">
                                        <Grid container alignItems="center" item>

                                            {/* {localStorage.userJWT && localStorage.userId !== spacesuccess && spacesuccess.propertyDetail && spacesuccess.propertyDetail.userId ? */}
                                            <Grid className="" md={12} sm={12} item>
                                                <div className="">
                                                    <div className="f30 f500 mb-10   text-sm-center">{spacesuccess && spacesuccess.propertyDetail && spacesuccess.propertyDetail.name}</div>
                                                    {/* <Typography className="mb-10">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>                                     */}
                                                    <Typography className="location justify-contant-sm-center">
                                                        {/* <img  alt="" src={ic_pin} />  */}
                                                        {venuedetail && ('Floor No.' + venuedetail.floor_suite + ', ' + venuedetail.address + ', ' + venuedetail.city + ', ' + venuedetail.state + ', ' + venuedetail.country + ', ' + venuedetail.zip)}
                                                        {/* 1274588 los angeles CA, USA */}
                                                    </Typography>

                                                </div>
                                            </Grid>


                                            {/* :
                                        <>fdsf

                                        </>} */}
                                            <Grid sm={12} md={6} item>

                                                <Grid className="listdetail_banner_img" container>
                                                    <Grid md={12} item >
                                                        {/* {spacesuccess && spacesuccess.propertyDetail && spacesuccess.propertyDetail.propertymedia.length ?
                                                    <AwesomeSlider>
                                                        {spacesuccess && spacesuccess.propertyDetail && spacesuccess.propertyDetail.propertymedia.map((items, key) => {
                                                            return <div key={key}><img alt="" src={process.env.REACT_APP_URL_IMAGE + items.media} /></div>
                                                        })}
                                                    </AwesomeSlider>
                                                    :
                                                    <>
                                                        <AwesomeSlider>
                                                            <div><img alt="" src={image2} /></div>
                                                        </AwesomeSlider>
                                                    </>
                                                } */}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </div>

                                    <div className="border-bottom pb-30">
                                        <Grid className="pt-30" container alignItems="center" item>
                                            <Grid className="" sm={12} md={12} item>
                                                <div>
                                                    {/*                             
                                            <div className="f20 f500">{spacesuccess && spacesuccess.propertyDetail && spacesuccess.propertyDetail.name}</div> */}
                                                    <div className="f16 f600"> Property Description</div>
                                                </div>
                                                {/* <div className="gray-color pt2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div> */}
                                                <Typography className=" pt1">
                                                    {spacesuccess && spacesuccess.propertyDetail && spacesuccess.propertyDetail.description}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>

                                    {spacesuccess && spacesuccess.propertyDetail && spacesuccess.propertyDetail.listings && spacesuccess.propertyDetail.listings.type === "Monthly" && propertyprice && propertyprice.monthlyPrice !== null ?
                                        <>
                                            <div className="border-bottom pb-30">
                                                <Grid className="pt-30" container alignItems="center" item>
                                                    <Grid className="" sm={12} md={12} item>
                                                        <span className="f16 f600 mb-10 d-flex">Price:</span>
                                                        <Grid md={12} item>
                                                            <div className="f15">{spacesuccess && spacesuccess.propertyDetail && spacesuccess.propertyDetail.propertyprice && ('$ ' + spacesuccess.propertyDetail.propertyprice.monthlyPrice + ' /month')}</div>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </>
                                        : spacesuccess && spacesuccess.propertyDetail && spacesuccess.propertyDetail.listings && spacesuccess.propertyDetail.listings.type === "Hourly" && propertyprice && propertyprice.perHour !== null ?
                                            <>
                                                <div className="border-bottom pb-30">
                                                    <Grid className="pt-30" container alignItems="center" item>
                                                        <Grid className="" sm={12} md={12} item>
                                                            <span className="f16 f600">Price:</span>
                                                            <Grid md={12} item>
                                                                <div className="f15  pt1">{propertyprice && ('$ ' + propertyprice.perHour + ' /hour')}</div>
                                                                <div className="f15 pt1 ">{propertyprice && ('$ ' + propertyprice.perHalfDay + ' /half-day')}</div>
                                                                <div className="f15 pt2">{propertyprice && ('$ ' + propertyprice.perDay + ' /day')}</div>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </>
                                            : spacesuccess && spacesuccess.propertyDetail && spacesuccess.propertyDetail.listings && spacesuccess.propertyDetail.listings.type === "Day Pass" && propertyprice && propertyprice.perDayPass !== null ?
                                                <>
                                                    <div className="border-bottom pb-30">
                                                        <Grid className="pt-30" container alignItems="center" item>
                                                            <Grid className="" sm={12} md={12} item>
                                                                <span className="f16 f600">Price:</span>
                                                                <Grid md={12} item>
                                                                    <div className="f15 pt2 ">{propertyprice && ('$ ' + propertyprice.perDayPass + ' /day')}</div>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                </>
                                    }



                                    {spacesuccess && spacesuccess.propertyDetail && spacesuccess.propertyDetail.propertyAmenities.length ?
                                        <div className="border-bottom pb-30 pt-30">
                                            <>
                                                <Grid spacing={3} className=""  >
                                                    <Grid  >
                                                        <div className="f16 f600">Amenities</div>
                                                        <ul className="user_list m-0 p-0 w-100">
                                                            <Grid className="d-flex flex-flow-row fields_row flex-wrap-wrap responsiv-column">

                                                                {spacesuccess.propertyDetail.propertyAmenities.map((items, key) => {

                                                                    return <Grid md={6} sm={6} xs={6} key={key} item>
                                                                        <li className="pb-0 d-flex align-items-center mr-10"><img alt="" src={list} className="listIcon pr-10" /> <Typography className=""> {items.amenities.name}</Typography></li>
                                                                    </Grid>

                                                                })}

                                                            </Grid>

                                                        </ul>

                                                    </Grid>
                                                </Grid>
                                            </>
                                        </div>

                                        :
                                        <>
                                        </>}
                                    <div className=" pb-30 pt-30">
                                        <Grid item>
                                            <div className="f22 f500 mb-10">Reviews</div>
                                            <div className="d-flex align-items-center">
                                                <div className="d-flex flex-flow-column w-100">
                                                    <div >
                                                        {spacesuccess.propertyDetail && spacesuccess.propertyDetail.spacebooking.length ?
                                                            <>
                                                               
                                                                {spacesuccess.propertyDetail && spacesuccess.propertyDetail.spacebooking.map((item, key) => {
                                                                    return item.rating && item.rating.map((reviews, key) => {
                                                                        return <>{reviews?
                                                                            <Grid className="mb-20 pb-20 singleReview" key={key}>
                                                                                <Grid className="d-flex align-items-center">
                                                                                    <Grid>
                                                                                        {reviews.userreview && reviews.userreview.users && reviews.userreview.users.profilepic ?
                                                                                            <Avatar className="imgRespon mr-10" style={{ border: '1px solid #ccc' }} src={process.env.REACT_APP_URL_IMAGE + reviews.userreview.users.profilepic} />
                                                                                            :
                                                                                            <Avatar className="imgRespon mr-10" style={{ border: '1px solid #ccc' }} src={'assets/images/default-user-image.png'} />
                                                                                        }
                                                                                    </Grid>
                                                                                    <Grid className="d-flex flex-flow-column">
                                                                                        <Grid>{reviews.userreview && reviews.userreview.users && reviews.userreview.users.firstName + " " + reviews.userreview.users.lastName}</Grid>
                                                                                        <Grid><Rating value={reviews.rating} readOnly /></Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid>{reviews.review}</Grid>
                                                                            </Grid>
                                                                            :
                                                                            <>
                                                                                <Typography className=" pt1">No Reviews Yet</Typography>
                                                                            </>
                                                                        }
                                                                        </>
                                                                    })
                                                                })}
                                                            </>
                                                            :
                                                            <>
                                                                <Typography className=" pt1">No Reviews Yet</Typography>
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid className="pb-0" md={6} sm={12} item>
                                    <Grid className="booking_form onScrollFixed mt-20 mb-20" container>
                                        <Reserveform className="" {...props} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                    <Container>
                        {/* <Grid spacing={3} className="w-100 m-0 mt-60 p-35" container >
                    <Grid item md={12} sm={12} xs={12} >
                        <div className="location_map">
                            Map Here...
                                    </div>
                    </Grid>
                </Grid> */}
                        {localStorage.userId !== spacesuccess && spacesuccess.propertyDetail && spacesuccess.propertyDetail.userId ?
                            <Grid spacing={3} className="w-100 m-0 mt-60" container >
                                <Grid container alignItems="center">
                                    <Grid md={12} item className="">
                                        <div className="f22 f500 mb-10">Similar Properties</div>

                                    </Grid>
                                </Grid>

                                <Grid spacing={3} className="mt-10" container >

                                    {spacesuccess.similarproperty.map((items, key) => {
                                        var i = 1;
                                        var media = ''
                                        return <Grid md={3} sm={6} xs={12} item key={key}>
                                            <GridList items={items} {...props}/>
                                        </Grid>
                                    })}



                                </Grid>
                            </Grid>
                            : <>
                            </>}
                    </Container>
                </div>}
        </>
    )
}
