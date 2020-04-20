import React from 'react'
import {Error,Success} from '../../../components/error'
import Asterisk from '../../../components/asterisk'
import { Grid, Button, Typography, TextField, MenuItem, Select, TextareaAutosize, Checkbox, Radio, RadioGroup, FormControl, FormControlLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { PictureAsPdf, Close } from '@material-ui/icons';
import { onKeyPress } from '../../../constants/commonFunc'
export default function Basicinfoform(props) {
    const { data, spaceType, spaceListing, errors, loader, imagesPreviewUrls, imagesPreviewUrl, areaAvailable, listingSlug, listingList, spaceList, dash } = props;
    return (        
        <div className="space_form mb-60">
            <form onSubmit={props.onSubmit} className="formSubmit">
                <Grid spacing={3} className="m-0 w-100 mt-25 bg-white" container >
                    <Grid className="d-flex justify-contant-space-between align-items-center border custom_head_padding" md={12} sm={12} xs={12} item>
                        <div className="dropdown_text">
                            {/* Rental */}
                        </div>
                        <div className="d-flex">
                            <div className="dropdown_text pr-10">
                                <Button variant="contained" className="bg-primary-color" onClick={props.onClickVisibilityEnable} type="submit" disabled={loader ? true : false}>Save</Button>
                            </div>
                            <div className="dropdown_text">
                                {props.addspacefailed}
                                <Button variant="contained" onClick={props.onClickVisibility} className="bg-primary-color" type="submit" disabled={loader ? true : false}>Publish</Button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Grid spacing={3} className="m-0 w-100 mt-25  border bg-white " container >
                    <Grid className="d-flex justify-contant-space-between align-items-center border-bottom custom_head_padding" md={12} sm={12} xs={12} item>
                        <h4 className="font-weight-normal">Basic Info<span className="danger-color">*</span></h4>
                    </Grid>
                    <Grid className="custom_head_padding" md={12} sm={12} xs={12} item>
                        <Typography>Tell people about the space that's available for rent.</Typography>
                        <div className="space_rental_form mt-40 mb-20">
                            <Grid item md={12} error={errors.name}>
                                <label>Space Name<Asterisk/></label>
                                <TextField value={data.name} type="text" name="name" onChange={props.onChange} inputProps={{maxLength: 255}}/>
                                {errors && errors.name && <Error text={errors.name} />}
                            </Grid>
                            <Grid item className="d-flex flex-flow-row fields_row" md={12}>
                                <Grid item className="w-sm-50 mb-0" md={4} error={errors.listingId}>
                                    <label>Listing Type<Asterisk/></label>
                                    <Select className="select_box w-100 "
                                        value={listingList}
                                        name="listingId" onChange={props.onChange}>
                                        {
                                            spaceListing && spaceListing.list && spaceListing.list.listing && spaceListing.list.listing.map((data, key) => {
                                                return <MenuItem value={JSON.stringify({id:data.id,slug:data.slug})} key={key} >{data.type}</MenuItem>
                                            })
                                        }
                                    </Select>
                                    {errors && errors.listingId && <Error text={errors.listingId} />}
                                </Grid>
                                <Grid item className="pl-10 w-sm-50 mb-0" md={4} error={errors.spacingId}>
                                    <label>Space Type<Asterisk/></label>
                                    {/* {console.log('spaces',props.spaceListing.list)} */}
                                    <Select className="select_box w-100" name="spacingId"
                                        value={spaceList} onChange={props.onChange}>
                                        {
                                            spaceType && spaceType.data && spaceType.data.map((data, key) => {
                                                return <MenuItem value={JSON.stringify({ spaceId: data.spaceId, areaAvailable: data.listing_space && data.listing_space.areaAvailable })} key={key}>{data.listing_space && data.listing_space.type}</MenuItem>
                                            })
                                        }
                                    </Select>
                                    {errors && errors.spacingId && <Error text={errors.spacingId} />}
                                </Grid>
                                <Grid item className="pl-10 w-sm-50 mb-0" md={4} error={errors.quantity}>
                                    <label>Capacity<Asterisk/></label>
                                    <TextField value={data.quantity} onKeyPress={e=>onKeyPress(e)} type="text" id="" name="quantity" onChange={props.onChange} inputProps={{maxLength: 5}}/>
                                    {errors && errors.quantity && <Error text={errors.quantity} />}
                                </Grid>

                            </Grid>
                            {
                                areaAvailable === 'true' ?
                                    <Grid container>
                                        <Grid item className="pl-10 w-sm-50" md={8}>
                                            <label>Size of space</label>
                                            <TextField value={data.spaceSize} onKeyPress={e=>onKeyPress(e)} type="text" id="" name="spaceSize" onChange={props.onChange} inputProps={{maxLength: 5}}/>
                                        </Grid>
                                        <Grid item className="pl-10 w-sm-50" md={4}>
                                            <label>Area units</label>
                                            <Select className="select_box w-100 "
                                        value={data.areaUnitsId}
                                        name="areaUnitsId" onChange={props.onChange}>
                                        {
                                            spaceListing && spaceListing.list && spaceListing.list.areaunit && spaceListing.list.areaunit.map((data, key) => {
                                                return <MenuItem value={data.id}
                                                //  value={JSON.stringify({id:data.id,slug:data.slug})} 
                                                 key={key} >{data.type}</MenuItem>
                                            })
                                        }
                                    </Select>
                                            {/* <Select className="select_box w-100" name="areaUnitsId"
                                                value={data.areaUnitsId} onChange={props.onChange}>
                                                <MenuItem value="Square Feet">Square Feet</MenuItem>
                                                <MenuItem value="Square Meters">Square Meters</MenuItem>
                                            </Select> */}
                                        </Grid>
                                    </Grid>
                                    :
                                    ''
                            }
                            <Grid item md={12} >
                                <label>Describe the space</label>
                                <TextareaAutosize className="height-50" aria-label="minimum height" name="description" onChange={props.onChange} value={data.description} colsMin={1} rowsMin={6} />
                            </Grid>

                        </div>
                    </Grid>
                </Grid>
                <Grid spacing={3} className="m-0 w-100 mt-25 bg-white  border " container >
                    <Grid className="d-flex justify-contant-space-between align-items-center border-bottom custom_head_padding" md={12} sm={12} xs={12} item>
                        <h4 className="font-weight-normal">Photos</h4>
                    </Grid>
                    <Grid className="custom_head_padding border-bottom" md={12} sm={12} xs={12} item>
                        <Typography>Everyone loves photos. Show off your space with great photos and videos. Listings with photos are ten times more likely to get booked, favorited, or shared.</Typography>
                    </Grid>
                    {/* <Grid className="custom_head_padding border-bottom d-flex justify-contant-space-between align-items-center " md={12} sm={12} xs={12} item>
                        <Typography>My Photos</Typography>

                    </Grid> */}
                    <Grid className="custom_head_padding border-bottom d-flex justify-contant-space-between align-items-center " md={12} sm={12} xs={12} item>
                        <Grid item className="d-flex flex-flow-row fields_row" xs={12} md={6} style={{ justifyContent: 'space-between' }}>
                            <Typography className="w-sm-50" md={3}>Specific Area Pics</Typography>
                            
                            <Grid className="multi_image_upload" >
                                <label className="danger-color w-sm-50" htmlFor="upload-more-images-input1" md={3}>+ Upload More Photos</label>
                                <input
                                    accept="image/*"
                                    className="box-shadow-none"
                                    id="upload-more-images-input1"
                                    multiple
                                    type="file"
                                    name="specificArea"
                                    onChange={e => props.onChange(e)}
                                    hidden
                                />
                            </Grid>
                        </Grid>
                        <Grid item className="d-flex flex-flow-row fields_row" xs={12} md={6} style={{ justifyContent: 'space-between', marginLeft: '40px' }}>
                            <Typography>Common Area</Typography>
                            <Grid className="multi_image_upload" >
                                <label className="danger-color w-sm-50" htmlFor="upload-more-images-input2">+ Upload More Photos</label>
                                <input
                                    accept="image/*"
                                    className="box-shadow-none"
                                    id="upload-more-images-input2"
                                    multiple
                                    type="file"
                                    name="commonArea"
                                    onChange={e => props.onChange(e)}
                                    hidden
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className="custom_head_padding border-bottom" md={12} sm={12} xs={12} item>
                        <div className="d-flex flex-flow-row fields_row w-sm-100" md={12}>
                            <Grid item className="w-sm-50" md={6}>
                                {
                                    imagesPreviewUrls.length > 0 ?
                                        <Grid item container>
                                            {imagesPreviewUrls.map((items, key) => {
                                                return <Grid item xs={12} sm={6} md={6} lg={3} className="position-relative" style={{ padding: '0px 15px' }}><img src={items.url} key={key} className="imgThumbnail" style={{ width: "100%" }} alt="img" /><Button className="position-absolute" style={{ fontSize: "14px", top: '-20px', right: '-25px', }} onClick={e => props.removeImage1(e, key,items.id)}><Close className="closeBtn" /></Button></Grid>
                                            })}
                                        </Grid>
                                        :
                                        <div className="upload_photo_section">
                                            <Typography>Upload photos<br></br> here</Typography>
                                        </div>
                                }
                                         {errors && errors.specificArea && <Error text={errors.specificArea} />}

                            </Grid>
                            <hr style={{ marginTop: '0', marginBottom: '0' }} />
                            <Grid item className="w-sm-50" md={6}>
                                {
                                    imagesPreviewUrl.length > 0 ?
                                        <Grid item container>
                                            {imagesPreviewUrl.map((item, key) => {
                                                return <Grid item xs={12} sm={6} md={6} lg={3} className="position-relative" style={{ padding: '0px 15px' }}><img src={item.url} key={key} className="imgThumbnail" style={{ width: "100%" }} alt="img" /><Button className="position-absolute" style={{ fontSize: "14px", top: '-20px', right: '-25px', }} onClick={e => props.removeImage2(e, key,item.id)}><Close className="closeBtn" /></Button></Grid>
                                            })}
                                        </Grid>
                                        :
                                        <div className="upload_photo_section">
                                            <Typography>Upload photos<br></br> here</Typography>
                                        </div>
                                }
                                {errors && errors.commonArea && <Error text={errors.commonArea} />}
                            </Grid>

                        </div>



                    </Grid>
                    {/* <Grid className="custom_head_padding d-flex vedio_share_link border-bottom" md={12} sm={12} xs={12} item>
                        <div className="video_col">
                        </div>
                        <div className="video_detail">
                            {console.log('fff',props.datafile.video)}
                            <h5>Video Tour</h5>
                            <TextField className="input_link input-box-shadow-none" 
                            onChange={props.onChange} 
                            id="" name="video" placeholder="Paste your video URL here" 
                            disabled={props.datafile&&props.datafile.video !== "null"? true : false}
                            /> */}
                            {/* {props.datafile.video === ""?
                            <>
                            </>
                            :
                            <CardMedia className="position-relative"><iframe src={props.datafile.video.url}></iframe><Button className="position-absolute" style={{ fontSize: "14px", top: '-20px', right: '-25px', }} onClick={e => props.removevideo(e, props.datafile.video.id)}><Close className="closeBtn" /></Button></CardMedia>
                            
                        } */}
                                {/* {props.datafile&&props.datafile.video&&props.datafile.video.map((items, key)=>{
                                    return <>{ items.url !== "null"? <CardMedia className="position-relative"><iframe key={key} src={items.url}></iframe><Button className="position-absolute" style={{ fontSize: "14px", top: '-20px', right: '-25px', }} onClick={e => props.removevideo(e, key,items.id)}><Close className="closeBtn" /></Button></CardMedia>
                                    :<></>
                                }</>
                                    
                                })} */}

                        {/* </div>
                    </Grid> */}
                    {/* <Grid className="custom_head_padding d-flex vedio_share_link border-bottom" md={12} sm={12} xs={12} item>
                        <div className="video_col">
                        </div>
                        <div className="video_detail">
                            <h5>PDF Flyer</h5>
                            <div className="pdfflyer label">
                                <label className="" htmlFor="upload_pdf">Choose PDF Flyer</label>
                                <Grid className="multi_image_upload" >
                                    <input
                                        accept="application/pdf"
                                        className="bg-primary-color box-shadow-none"
                                        id="upload_pdf"
                                        type="file"
                                        name="pdf"
                                        onChange={props.onChange}
                                    />
                                    {props.pdfname}
                                </Grid>
                            </div>
                        </div>
                    </Grid> */}

                </Grid>
                <Grid spacing={3} className="m-0 w-100 mt-25  border bg-white" container >
                    <Grid className="d-flex justify-contant-space-between align-items-center border-bottom custom_head_padding" md={12} sm={12} xs={12} item>
                        <h4 className="font-weight-normal d-flex">Price and Terms<Asterisk/></h4>
                        
                    </Grid>
                    {listingSlug === 'monthly' ?
                        <>
                            <Grid className="custom_head_padding " md={12} sm={12} xs={12} item>
                                <Typography>Set the monthly price and minimum term for this space. You may also add incentive pricing below to encourage longer-term bookings.</Typography>
                            </Grid>

                            <Grid item className="fields_row mb-0 custom_head_padding" md={12}>
                                <Grid className="space_rental_form">
                                    <Grid item md={12} sm={12} error={errors.monthlyPrice}>
                                        <label>Monthly price (USD)<Asterisk/></label>
                                        <TextField value={data.monthlyPrice} onKeyPress={e=>onKeyPress(e)} type="text" id="" name="monthlyPrice" onChange={props.onChange} inputProps={{maxLength: 6}}/>
                                        {errors && errors.monthlyPrice && <Error text={errors.monthlyPrice} />}
                                    </Grid>
                                    <Grid item md={12} sm={12} error={errors.minTerm}>
                                        <label>Minimum term</label>
                                        <Select className="select_box w-100 "
                                        value={data.minTermId}
                                        name="minTermId" onChange={props.onChange}>
                                        {
                                            spaceListing && spaceListing.list && spaceListing.list.minterm && spaceListing.list.minterm.map((data, key) => {
                                                return <MenuItem 
                                                // value={data.id}
                                                 value={JSON.stringify(data.id)} 
                                                 key={key} >{data.type}</MenuItem>
                                            })
                                        }
                                    </Select>
                                        {/* <Select className="select_box w-100"
                                            name="minTerm"
                                            value={data.minTerm} onChange={props.onChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="1">1 month</MenuItem>
                                            <MenuItem value="2">2 months</MenuItem>
                                            <MenuItem value="3">3 months</MenuItem>
                                            <MenuItem value="4">4 months</MenuItem>
                                            <MenuItem value="5">5 months</MenuItem>
                                            <MenuItem value="6">6 months</MenuItem>
                                            <MenuItem value="7">7 months</MenuItem>
                                            <MenuItem value="8">8 months</MenuItem>
                                            <MenuItem value="9">9 months</MenuItem>
                                            <MenuItem value="10">10 months</MenuItem>
                                            <MenuItem value="11">11 months</MenuItem>
                                            <MenuItem value="12">12 months</MenuItem>
                                        </Select> */}
                                        {errors && errors.minTerm && <Error text={errors.minTerm} />}
                                    </Grid>
                                    <Grid item md={12} sm={12} error={errors.deposit}>
                                        <label>Deposit</label>
                                        <Select className="select_box w-100 "
                                        value={data.depositId}
                                        name="depositId" onChange={props.onChange}>
                                        {
                                            spaceListing && spaceListing.list && spaceListing.list.deposit && spaceListing.list.deposit.map((data, key) => {
                                                return <MenuItem 
                                                // value={data.id}
                                                 value={JSON.stringify(data.id)} 
                                                 key={key} >{data.type}</MenuItem>
                                            })
                                        }
                                    </Select>
                                        {/* <Select className="select_box w-100 mb-0"
                                            value={data.deposit} name="deposit" onChange={props.onChange}>
                                            <MenuItem value="">
                                                <em>No Deposit</em>
                                            </MenuItem>
                                            <MenuItem value="1">1 month</MenuItem>
                                            <MenuItem value="2">2 months</MenuItem>
                                        </Select> */}
                                        {errors && errors.deposit && <Error text={errors.deposit} />}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item className="fields_row mt-10 custom_head_padding mt-0" md={12}>
                                <label>Do you collect a setup fee?</label>
                                <FormControl component="fieldset">
                                    <RadioGroup className="radio_button flex-direction-row" defaultValue={data.setUpFee} name="setUpFee" onChange={props.onChange}>
                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid className="space_rental_form custom_head_padding custom_field_section per_office_sec">
                                {data.setUpFee === "Yes" ?
                                    <>
                                        <Grid>
                                            <TextField name="perOffice" value={data.perOffice} onKeyPress={e=>onKeyPress(e)} type="text" onChange={props.onChange} inputProps={{maxLength: 6}}/><label>Per Office</label>
                                        </Grid>
                                    </> :
                                    <></>
                                }
                            </Grid>
                            {/* <Grid item className="fields_row mt-10 custom_head_padding" md={12}>
                                <label>Do you want to offer discounts for extended terms?</label>
                                <FormControl component="fieldset">
                                    <RadioGroup className="radio_button flex-direction-row" defaultValue={data.discount} name="discount" onChange={props.onChange}>
                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            {data.discount === "Yes" ?
                                <Grid className="space_rental_form custom_head_padding">
                                    <Grid className="bg-gray">
                                        {
                                            incentive_Static.map((items,key)=>{
                                                let discount = items.discount/12
                                                let value = items.discount > 9 ? discount === 1 ? discount + ' year': discount + ' years'  :items.discount + ' months' 
                                                return <><Grid className="d-flex align-items-center add_incentive_field" key={key}>
                                                <Grid>
                                                    <Checkbox onChange={props.onChange} name="month" value={items.discount} color="primary"/>
                                                </Grid>
                                                <Grid>
                                                    <Typography>{value}</Typography>
                                                </Grid>
                                            </Grid>
                                            {
                                                data.incentives.map((incentives,id)=>{
                                                    if(incentives.month === items.discount){
                                                        return <Grid className="d-flex align-items-center add_incentive_field" key={id}>
                                                    <Grid>
                                                        <TextField className="pl-10" onChange={e=>props.onChangeIncentives(e,id)} name="cost" type="text" defaultValue={items.cost}/>
                                                    </Grid>
                                                </Grid>
                                                    }
                                                })
                                            }
                                            </>
                                            })
                                        }
                                    </Grid>
                                </Grid>
                                :
                                <>
                                </>
                            } */}
                            <Grid item className="fields_row mt-10 custom_head_padding" md={12}>
                                <Typography>Other things you should know:</Typography>
                                <ul className="thing-shouldknow">
                                    <li>If collecting a deposit, Rental Space will collect and hold the deposit upon booking this space </li>
                                    <li>Cancellation Policy: Guest (30 Days), Host (60 Days)</li>
                                    <li>Fees - Rental Space will collect monthly payments and send directly to you. We charge a flat 10% fee on monthly bookings and setup fee.</li>
                                </ul>
                            </Grid>
                        </>
                        : listingSlug === 'hourly' ?
                            <>
                                <Grid className="custom_head_padding " md={12} sm={12} xs={12} item>
                                    <Typography>How much would you like to charge for the use of this space?</Typography>
                                </Grid>
                                <Grid item className="fields_row mb-0 custom_head_padding" md={12}>
                                    <Grid className="space_rental_form custom_head_padding custom_field_section per_office_sec">
                                        <Grid>
                                            <label>$</label><TextField disabled={data.perHour === '0' || data.perHour === 0 ? true:false} value={data.perHour} onKeyPress={e=>onKeyPress(e)} type="text" id="" placeholder="Ex.:25" name="perHour" onChange={props.onChange} inputProps={{maxLength: 6}}/><label>Per Hour<Asterisk/></label>
                                            {errors && errors.perHour && <Error text={errors.perHour} />}
                                        </Grid>
                                    </Grid>
                                    <Grid className="space_rental_form custom_head_padding custom_field_section per_office_sec">
                                        <Grid>
                                            <label>$</label><TextField disabled={data.perHalfDay === '0' || data.perHalfDay === 0 ? true:false} value={data.perHalfDay} onKeyPress={e=>onKeyPress(e)} type="text" id="" placeholder="Ex.:100" name="perHalfDay" onChange={props.onChange} inputProps={{maxLength: 6}}/><label>Per Half-Day</label>
                                            {errors && errors.perHalfDay && <Error text={errors.perHalfDay} />}
                                        </Grid>
                                    </Grid>
                                    <Grid className="space_rental_form custom_head_padding custom_field_section per_office_sec">
                                        <Grid>
                                            <label>$</label><TextField disabled={data.perDay === '0' ||data.perDay === 0 ? true:false} value={data.perDay} name="perDay" type="text" id="" onKeyPress={e=>onKeyPress(e)} type="text" placeholder="Ex.:200" onChange={props.onChange} inputProps={{maxLength: 6}}/><label>Per Day-Pass</label>
                                            {errors && errors.perDay && <Error text={errors.perDay} />}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item className="fields_row mt-10 custom_head_padding" md={12}>
                                    <Typography>Optional:</Typography>
                                    <Grid className="d-flex align-items-center makefree_checkbox">
                                        <Checkbox onChange={props.onChange} value="0" name="free" color="primary" checked={data.perHour&&data.perHalfDay&&data.perDay==="0"? true : false}/><label>I don't want to charge for this space. Make it FREE.</label>
                                    </Grid>
                                </Grid>
                                <Grid item className="fields_row mt-10 custom_head_padding" md={12}>
                                    <Typography>Other things you should know:</Typography>
                                    <ul className="thing-shouldknow">
                                        <li>Cancellation - Guests may cancel reservations with at least 24 hours notice before the start of their reservation.</li>
                                        <li>Payment - Rental Space collects payment from guests upon booking, we will send you payment each month by check or ACH.</li>
                                        <li>Fees - Rental Space collects a fee of 50% for a guest's 1st booking, 25% for the 2nd, and 10% for the 3rd and all future bookings.</li>
                                    </ul>
                                </Grid>
                            </>
                            :
                            <>
                                <Grid className="custom_head_padding " md={12} sm={12} xs={12} item>
                                    <Typography>How much would you like to charge for the use of this space?</Typography>
                                </Grid>
                                <Grid className="space_rental_form custom_head_padding custom_field_section per_office_sec">
                                    <Grid>
                                        <label>$</label><TextField value={data.perDayPass} onKeyPress={e=>onKeyPress(e)} type="text"  name="perDayPass" placeholder="Ex.:200" onChange={props.onChange} disabled={data.perDayPass === '0' || data.perDayPass === 0 ? true:false} inputProps={{maxLength: 6}}/><label>Per Day-Pass<Asterisk/></label>
                                        {errors && errors.perDayPass && <Error text={errors.perDayPass} />}
                                    </Grid>
                                </Grid>
                                <Grid item className="fields_row mt-10 custom_head_padding" md={12}>
                                    <Typography>Optional:</Typography>
                                    <Grid className="d-flex align-items-center makefree_checkbox">
                                        <Checkbox onChange={props.onChange} value="0" name="freeDayPass" color="primary" /><label>I don't want to charge for this space. Make it FREE.</label>
                                    </Grid>
                                </Grid>
                                <Grid item className="fields_row mt-10 custom_head_padding" md={12}>
                                    <Typography>Other things you should know:</Typography>
                                    <ul className="thing-shouldknow">
                                        <li>Cancellation - Guests may cancel reservations with at least 24 hours notice before the start of their reservation.</li>
                                        <li>Payment - Rental Space collects payment from guests upon booking, we will send you payment each month by check or ACH.</li>
                                        <li>Fees - Rental Space collects a fee of 50% for a guest's 1st booking, 25% for the 2nd, and 10% for the 3rd and all future bookings.</li>
                                    </ul>
                                </Grid>
                            </>
                    }
                </Grid>
                <Grid spacing={3} className="m-0 w-100 mt-25  border bg-white " container >
                    <Grid className="d-flex justify-contant-space-between align-items-center border-bottom custom_head_padding" md={12} sm={12} xs={12} item>
                        <h4 className="font-weight-normal">Amenities & Services</h4>
                    </Grid>
                    <Grid className="d-flex justify-contant-space-between align-items-center custom_head_padding makefree_checkbox" md={12} sm={12} xs={12} item>
                        <Typography style={{display:'flex',flexWrap:'wrap'}}>{props.amenitiessuccess && props.amenitiessuccess.getamenities && props.amenitiessuccess.getamenities.map((dataList, key) => {
                            let a = []
                            data.amenitiesId.map(id=>{ 
                                return a.push(parseFloat(id.amenitiesId))})
                            return <FormControlLabel style={{width:'33.33%'}}  key={key} control={<Checkbox name="amenitiesId" value={dataList.id} checked={a.includes(dataList.id)} onChange={props.onChange} color="primary" />} label={dataList.name} />
                        })}</Typography>

                    </Grid>
                </Grid>
                <Grid spacing={3} className="m-0 w-100 mt-25  border bg-white" container >
                    <Grid className="d-flex justify-contant-space-between align-items-center border-bottom custom_head_padding" md={12} sm={12} xs={12} item>
                        <h4 className="font-weight-normal">DASH License®</h4>
                    </Grid>
                    <Grid className="d-flex justify-contant-space-between align-items-center custom_head_padding" md={12} sm={12} xs={12} item>
                        <Typography className="font-weight-normal">Here's your DASH License® based on the details you provided.</Typography>
                    </Grid>
                    <Grid className="d-flex justify-contant-space-between align-items-center custom_head_padding" md={12} sm={12} xs={12} item>
                        
                        <Typography className="font-weight-normal ">
                        {dash && dash.dashLicense && dash.dashLicense.map((item)=>{ 
                           return <a className="d-flex align-items-center active-color" href={process.env.REACT_APP_URL_IMAGE + item.link } target="_blank"><PictureAsPdf className="pr-10" /> View Dash License</a>
                           })
                        }
                            </Typography>

                    </Grid>
                    <Grid className="d-flex justify-contant-space-between align-items-center custom_head_padding" md={12} sm={12} xs={12} item>

                    </Grid>
                </Grid>
            </form>
        </div>
    )
}