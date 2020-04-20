import React, { useState } from 'react';
import { Grid, Container, Typography, Button, CircularProgress } from '@material-ui/core';
import {Link} from 'react-router-dom'
import VisibilityIcon from '@material-ui/icons/Visibility';
import image from '../../../constants/image'
import { Rating, Pagination } from '@material-ui/lab';
export default function CollectionsList(props) {
    const { getcollectionsuccess, loader } = props
    const [state, setstate] = useState(false)
    return <>
        {loader ?
            <div className="listLoader">
                <CircularProgress />
            </div>
            :

            <Grid spacing={2} sm={12} md={12} lg={12} className="mt-25 w-10 m-0 mb-25" container item>
                {
                    getcollectionsuccess && getcollectionsuccess.propertyListing && getcollectionsuccess.propertyListing.length > 0 ?
                        getcollectionsuccess.propertyListing.map((lists, key) => {
                            var i = 1;
                            var media = ''
                            let collection = lists.fvrtProperty && lists.fvrtProperty
                            return <Grid className="box-shadow mb-25 p-0 last-child-mb-0" style={{ background: '#ffffff', borderRadius: '20px' }} container item key={key}>
                                <Grid xs={12} sm={4} md={4} lg={4} item>
                                    <div className="grid_image space d-flex position-relative" >
                                        {collection.propertymedia && collection.propertymedia.length ?
                                            collection.propertymedia && (i === 1) && collection.propertymedia.map((item, key) => {
                                                if (item.type === "Image" && item.media !== "null") {
                                                    media = process.env.REACT_APP_URL_IMAGE + collection.propertymedia[key].media
                                                    i = i + 1;
                                                }
                                            })
                                            :
                                            media = ''
                                        }
                                        {<>
                                            <img alt="" src={media !== '' ? media : image.dummyImage} />
                                        </>}

                                    </div>
                                </Grid>
                                <Grid xs={12} sm={8} md={8} lg={8} item>
                                    <div className="main_grid_col spaceContent">
                                        <Grid container alignItems="center">
                                            <Grid xs={12} item className="position-relative">
                                                <div className="grid_contant">
                                                    <Grid xs={12} container item>
                                                        <Grid xs={7} item>
                                                            <div className="d-flex justify-contant-space-between ">
                                                                <h4 className="text-ellipsis">{collection.name}</h4>
                                                            </div>
                                                            <div>
                                                                {console.log('collection',collection)}
                                                                <Typography>{collection.description && collection.description.length > 100 ?
                                                                    <>
                                                                        {!state && collection.description.substring(0, 100)}
                                                                        {state && <div>{collection.description}</div>}
                                                                        <button className="buttonLink" onClick={() => setstate(!state)}>{state ? 'Show Less' : 'Show More'}</button>

                                                                    </>

                                                                    :
                                                                    <>{collection.description}</>}</Typography>
                                                                {/* <Typography>{collection.description}</Typography> */}
                                                            </div>
                                                            <Typography className="pr-5 gray-color"><strong>Quantity:</strong> {collection.quantity} </Typography>


                                                        </Grid>
                                                        <Grid item xs={5}>
                                                            <h4 className="primary-color text-right">
                                                        {collection.propertyprice && collection.propertyprice.monthlyPrice !== null && collection.propertyprice && collection.propertyprice.monthlyPrice !== "" ?
                                                                    collection.propertyprice && ('Price:'+new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(collection.propertyprice.monthlyPrice))
                                                                    : collection.propertyprice && collection.propertyprice.perHour !== null && collection.propertyprice && collection.propertyprice.perHour !== "" ?
                                                                        collection.propertyprice && ('Price:'+new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(collection.propertyprice.perHour))
                                                                        : collection.propertyprice && collection.propertyprice.perDayPass !== null && collection.propertyprice && collection.propertyprice.perDayPass !== "" ?
                                                                            collection.propertyprice && ('Price:'+new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(collection.propertyprice.perDayPass))
                                                                            :
                                                                            ''
                                                                }
                                                            </h4>
                                                        </Grid>
                                                        <Grid className="previewIconEyee" xs={12} item>
                                                                <Link to={"/listdetail/" + collection.id} className="w-100 text-center ic_preview text-right" title="Preview" style={{ display: 'block' }}><VisibilityIcon/></Link>
                                                            </Grid>
                                                    </Grid>

                                                    {/* <Grid item md={12} className="pt-20">
                                                        <Rating value={lists.rating} readOnly />
                                                    </Grid> */}
                                                    <Grid item md={3} className="pt-20">
                                                        <Button onClick={e => props.addtocollection(lists.propertyInfoId)} className="outlineBtnCol">Remove</Button>
                                                    </Grid>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        }) :
                        'Collection is empty'
                }

            </Grid>

        }
        {getcollectionsuccess.totalpageno > 1 ?
            <Pagination className="mb-60" count={getcollectionsuccess && getcollectionsuccess.totalpageno} name="page" onChange={(e, page) => props.onChange(e, page)} shape={'rounded'} color="primary" />
            : ''
        }
    </>
}