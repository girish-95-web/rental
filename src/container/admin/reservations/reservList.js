import React,{useState} from 'react';
import { Grid, Container, Typography, Button, CircularProgress } from '@material-ui/core';
import moment from 'moment'
import image from '../../../constants/image'
import { Rating, Pagination } from '@material-ui/lab';
export default function ReservList(props) {
    const { getReserveList, value, name, loader } = props
    const [state, setstate] = useState(false)
    return <>
        {loader ?
            <div className="listLoader">
                <CircularProgress />
            </div>
            :
            <Grid spacing={2} sm={12} md={12} lg={12} className="mt-25 w-10 m-0 mb-25" container item>
                {
                    getReserveList && getReserveList.guestlisting && getReserveList.guestlisting.length > 0 ?
                        getReserveList.guestlisting.map((lists, key) => {
                            var i = 1;
                            var media = ''
                            let booking = lists.spacebooking && lists.spacebooking
                            return <Grid className="box-shadow mb-25 p-0 last-child-mb-0" style={{ background: '#ffffff', borderRadius: '20px' }} container item key={key}>
                                <Grid xs={12} sm={4} md={4} lg={4} item>
                                    <div className="grid_image space d-flex position-relative" >
                                        {booking.propertymedia && booking.propertymedia.length ?
                                            booking.propertymedia && (i === 1) && booking.propertymedia.map((item, key) => {
                                                if (item.type === "Image" && item.media !== "null") {
                                                    media = process.env.REACT_APP_URL_IMAGE + booking.propertymedia[key].media
                                                    i = i + 1;
                                                }
                                            })
                                            :
                                            media = ''
                                        }
                                        {<>
                                            <img alt="" src={media !== '' ? media : image.dummyImage} />
                                        </>}
                                        {value===0?
                                        <div className="bookingStatus">
                                            {lists.status === 'Cancelled'?
                                            <Typography style={{backgroundColor:"#f33", color:'white', padding:'0 5px', borderRadius:'5px'}}>{lists.status}</Typography>
                                            :
                                            <Typography style={{backgroundColor:"#17c217", color:'white', padding:'0 5px', borderRadius:'5px'}}>Completed</Typography>
                                        }
                                            
                                        </div>
                                        :
                                        ''
                                        }
                                    </div>
                                </Grid>
                                <Grid xs={12} sm={8} md={8} lg={8} item>
                                    <div className="main_grid_col spaceContent">
                                        <Grid container alignItems="center">
                                            <Grid xs={12} item>
                                                <div className="grid_contant">
                                                    <Grid xs={12} container item>
                                                        <Grid xs={7} item>
                                                            <div className="d-flex justify-contant-space-between ">
                                                                <h4 className="text-ellipsis">{booking.name}</h4>
                                                            </div>

                                                        
                                                            <div className="pt-10">
                                                                <strong>From:</strong> {moment(lists.startdate + 'T' + lists.starttime).format('LLLL')}
                                                            </div>
                                                            <div className="">
                                                                <strong>To:</strong> {moment(lists.enddate + 'T' + lists.endtime).format('LLLL')}
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={5}>
                                                            <h4 className="primary-color text-right">Total Price: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(lists.price)}</h4>
                                                        </Grid>
                                                    </Grid>
                                                    {
                                                        value === 0 ?
                                                            <Grid item md={12} className="pt-20">
                                                                {lists.rating?
                                                                <>
                                                                <strong>Review Given:</strong>
                                                            <Typography>{lists.review && lists.review.length > 100? 
                                                            <>  
                                                                {!state && lists.review.substring(0,100)}
                                                                {state && <div>{lists.review}</div>}
                                                                <button className="buttonLink" onClick={() => setstate(!state)}>{state? 'Show Less' : 'Show More'}</button>
                                                                
                                                                </>
                                                                
                                                                :
                                                                 <>{lists.review}</>}</Typography>
                                                            <Rating value={lists.rating} readOnly/> 
                                                             </>
                                                            :<>
                                                            {lists.status === 'Booked'?<Button onClick={e => props.bookingReview(e, lists.id)} className="outlineBtnCol">Review</Button>
                                                            :''}
                                                            </>
                                                            }
                                                            </Grid>
                                                            : value === 1 ?
                                                                <Grid item md={3} className="pt-20">
                                                                    <Button onClick={e => props.cancelBooking(e, lists.id)} className="outlineBtnCol">Cancel Booking</Button>
                                                                </Grid> : ''
                                                    }
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        }) :
                        name
                }
            </Grid>
        }
        {getReserveList && getReserveList.totalpageno>1?
       <Pagination className="mb-60" count={getReserveList && getReserveList.totalpageno} name="page" onChange={(e,page)=>props.onChange(e,page)} shape={'rounded'} color="primary"/>
            :
            ''
        }
    </>
}