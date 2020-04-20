import React from 'react'
import { Link } from 'react-router-dom';
import rental_logo from './../../assets/images/rental_logo.png'
function Headerlogo(props) {
    return (
        <div className="logo">
             <Link  to="/">
                <span className="">
                    <img alt="" src={rental_logo} width="70"/>
                    {/* Logo */}
                    </span>
            </Link>
        </div>
    )
}

export default Headerlogo
