import React from 'react'
import { Grid, Container, } from '@material-ui/core';
import { Link } from 'react-router-dom';
import linkedin from "../../assets/images/linkedin.png";
import twitter from "../../assets/images/twitter.png";
import instagram from "../../assets/images/instagram.png";
import facebook from "../../assets/images/facebook.png";
import rental_logo from './../../assets/images/rental_logo.png'
import { connect } from 'react-redux';

 function Footer({isLoggedin}) {
    return (
        // <div className="footer_section">
        //     <Container>
        //         <Grid spacing={3} className="mt-25 align-items-center" container >
        //             <Grid className="w-sm-100"  md={3} sm={12} item>
        //                 <div className="logo">
        //                     <a >
        //                         {/* <img className="imgRespon" alt ="" src={logo}></img> */}
        //                         <img alt="" src={rental_logo} width="125" height="100"/>
        //                         {/* <span className="logo">Logo</span> */}
        //                     </a>
        //                 </div>
        //             </Grid>
        //             <Grid className="w-sm-100"  md={5} sm={12} item>
        //                 <ul className="inline inline_list">
        //                     <li><a>Home</a></li>
        //                     <li><a>Become a landlord</a></li>
        //                     {/* <li><a>Chat</a></li> */}
        //                     <li><a>Help</a></li>
        //                 </ul>
        //             </Grid>
        //             <Grid className="w-sm-100"  md={4} sm={12} item>
        //                 <div className="d-flex align-items-center">
        //                     <h5 className="footer_heading">Follow Us</h5>
        //                     <ul className="inline inline_list">
        //                     <li><a><img  alt="" src={linkedin} /></a></li>
        //                     <li><a><img  alt="" src={twitter} /></a></li>
        //                     <li><a><img  alt="" src={instagram} /></a></li>
        //                     <li><a><img  alt="" src={facebook} /></a></li>
        //                 </ul>
        //                 </div>
        //             </Grid>
        //         </Grid>
        //     </Container>    
        //     <Grid spacing={3} className="mt-15 align-items-center w-100 m-0 position-relative" container >
        //         <Grid  xs={12} item className="text-center">
        //             <span className="text-center copyright_text">Copyright@2020</span>
        //         </Grid>
        //     </Grid>        
        // </div>


        <div className="footer_section">
            <Container>
                <Grid spacing={3} className="mt-25  footerblock" container >
                    <Grid className="w-sm-100 col" md={3} sm={6} item>
                        <h5>Rental</h5>
                        <ul className="inline inline_list">
                            <li><Link to='/'>Home</Link></li>
                            {
                                isLoggedin ?
                                    ''
                                    :
                                    <li><Link to='/auth/signup'>Become a landlord</Link></li>
                            }
                            {/* <li><a>Chat</a></li> */}
                            <li><a>Help</a></li>
                        </ul>
                    </Grid>
                    <Grid className="w-sm-100 col" md={3} sm={6} item>
                        <h5>Discover</h5>
                        <ul className="inline inline_list">
                            <li><a>Trust & Safely</a></li>
                            <li><a>Travel Credit</a></li>
                            <li><a>Rental Citizen</a></li>
                            <li><a>Business Travel</a></li>
                            <li><a>Thing To Do</a></li>
                        </ul>
                    </Grid>
                    <Grid className="w-sm-100 col" md={3} sm={6} item>
                        <h5>Hosting</h5>
                        <ul className="inline inline_list">
                            <li><a>Why Host</a></li>
                            <li><a>Hospitality</a></li>
                            <li><a>Responsible Hosting</a></li>
                            <li><a>Community Center</a></li>
                            <li><a>Host an Experience</a></li>
                            <li><a>Open Homes</a></li>
                        </ul>
                    </Grid>
                    <Grid className="w-sm-100 col" md={3} sm={6} item>
                        <h5>Support</h5>
                        <ul className="inline inline_list">
                            <li><a>Help</a></li>
                            <li><a>Neighbourhood Support</a></li>
                        </ul>
                    </Grid>
                </Grid>

                <Grid spacing={3} className="mt-25 align-items-center w-100 m-0 border-top pt-20 d-flex justify-content-space-between" container >
                    <Grid sm={6} xs={12} item className=" p-0 ">
                        <span className="copyRight">Copyright@2020</span>
                    </Grid>
                    <Grid sm={6} xs={12} item className="p-0 justify-contant-sm-center d-sm-flex">
                        <span className="">
                            <ul className="inline inline_list m-0 text-right">
                                <li><a><img alt="" src={linkedin} /></a></li>
                                <li><a><img alt="" src={twitter} /></a></li>
                                <li><a><img alt="" src={instagram} /></a></li>
                                <li><a><img alt="" src={facebook} /></a></li>
                            </ul></span>
                    </Grid>
                </Grid>
            </Container>
        </div>

    )
}
const mapStateAuth = (state) => {
    return {
      isLoggedin: state.auth.token,
    }
  }
export default connect(mapStateAuth)(Footer)
