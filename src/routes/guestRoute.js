import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const GuestRoute = ({ isLoggedin,pieceOf, component: Component, ...rest }) => {
    return <div>
        <Route {...rest} render={props =>  !isLoggedin ? <><Component {...props} state={pieceOf}/></> : <Redirect to="/" />} />
    </div>
}
const mapStateAuth = (state) => {
    return {
        isLoggedin: state.auth.token
    }
}
export default connect(mapStateAuth)(GuestRoute);