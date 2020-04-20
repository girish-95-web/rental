import React from 'react';
import { Link } from 'react-router-dom';
import image from '../constants/image';
import { Rating } from '@material-ui/lab';
import { Button, Typography, Badge } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
export default function GridList(props) {
    const { items,addsuccess } = props
    var favoriteid=addsuccess&&addsuccess.favourite&&addsuccess.favourite.propertyInfoId
    var removeid =addsuccess&&addsuccess.propertyListing&&addsuccess.propertyListing.map((rmvid,key)=>{return rmvid.propertyInfoId})
    var media = ''
    var i = 1;
    return <div className="box-shadow img_box_height_home main_grid_col">
        <div className="grid_image">
            <Link onClick={e=>props.linkClick(items.id)}>
                {items.propertymedia&&items.propertymedia.length ?
                    items.propertymedia && (i === 1) && items.propertymedia.map((item, key) => {
                        if (item.type === "Image" && item.media !== "null") {
                            media = process.env.REACT_APP_URL_IMAGE + items.propertymedia[key].media
                            i = i + 1;
                        }
                    })
                    :media = '' }
                {<>
                    <img alt="" src={media !== '' ? media : image.dummyImage} />
                </>}
            </Link>
            <div className="pepole_rented_btn ic_fev">
            {localStorage.userJWT? <Button onClick={e=>props.addtocollection(items.id)} style={items.collection? {color:"red"} : parseInt(favoriteid)===items.id?{color:'red'}:!items.collection&&favoriteid===undefined? {color:'black'}:items.id===removeid?{color:'red'}:items.collection&&items.id!==removeid?{color:'black'}:{color:'black'}}><FavoriteIcon/></Button>: ''}
            </div>
            <div className="pepole_rented_btn">
                <Badge className="bg-primary-color">{items.booking === 1 ? items.booking + ' Person rented' : items.booking > 1 ? items.booking + ' People rented' : ''} </Badge>
            </div>
        </div>
        <div className="grid_contant">
            <div className="mb-10">
                <div className="f15 f500 itemName"><Link onClick={e=>props.linkClick(items.id)}>{items.name}</Link></div>
                <span className="f13 f400 mt-2" >
                    {
                        items.proprtyPrice && items.proprtyPrice.monthlyPrice !== null ?
                        items.proprtyPrice && ('$' + items.proprtyPrice.monthlyPrice + '/month')
                        : items.proprtyPrice && items.proprtyPrice.perHour !== null ?
                        items.proprtyPrice && ('$' + items.proprtyPrice.perHour + '/hour')
                        : items.proprtyPrice && items.proprtyPrice.perDayPass !== null ?
                        items.proprtyPrice && ('$' + items.proprtyPrice.perDayPass + '/day')
                        :''
                    }
                </span>
            </div>
            
            <div className="star_reting">
                <Rating value={items.rating} precision={0.5} readOnly/>
                {/* {items.spacebooking && items.spacebooking.map((value, key) => {
                    return <Rating key={key} value={value.ratingCount} readOnly />
                })} */}
            </div>
            {
                items.description?
                <div className="drid_discription"><Typography className="">{items.description}</Typography></div>
                :''
            }
        </div>
    </div>
}