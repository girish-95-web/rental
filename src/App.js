import React from "react";
import {
  Switch
  // Route
} from "react-router-dom";
import { Route } from "react-router-dom";
// auth
import Login from "./container/auth/login/login";
import Forgot from "./container/auth/forgot/forgot";
import Signup from "./container/auth/signup/signup";
import Verification from "./container/auth/verification/verification";
import Newpwd from "./container/auth/pwdupdate/newpwd";

import Home from "./container/home/home";
import List from "./container/Listdetail/list";
import Search from "./container/Searchlisting/search";
// ADMIN
import Dashboard from "./container/admin/dashboard/dashboard";
import Addspace from "./container/admin/spaces/addspace/addspace";
import Spaces from "./container/admin/spaces";
import AdminRoute from "./routes/adimnRoute";
import GuestRoute from "./routes/guestRoute";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar";
import Editspace from "./container/admin/spaces/editspace/editspace";
import Venueadd from "./container/admin/venue/venueadd";
import chatbox from "./container/admin/message/chatbox";
import Reservations from "./container/admin/reservations/reservations";
import Calender from "./container/admin/calendar/calander";
import Collections from "./container/admin/collections/collections";
// import Userdetails from './container/admin/user/userdetails';
// CHAT
import Chat from "./components/chat/Chat";
import Chatadmin from "./components/chat/Chatadmin";
import Newchat from "./components/chat/Newchat";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { unAuthorizedinitial } from "./services/action/homeSpaces";
import { bindActionCreators } from "redux";

const App = (props, { location }) => {
  if (props.unauthorized.unauthorized === true) {
    props.history.push("/auth/login");
    props.unAuthorizedinitial();
  }
  return (
    <>
      <Header />
      <Switch>
        <Route location={location} exact path="/" component={Home} />
        <Route
          location={location}
          exact
          path="/Listdetail/:id"
          component={List}
        />
        <Route
          location={location}
          exact
          path="/searchlisting"
          component={Search}
        />
        <GuestRoute
          location={location}
          exact
          path="/auth/login"
          component={Login}
        />
        <GuestRoute
          location={location}
          exact
          path="/auth/forgot"
          component={Forgot}
        />
        <GuestRoute
          location={location}
          exact
          path="/auth/signup"
          component={Signup}
          pieceOf={{ role: "User" }}
        />
        <GuestRoute
          location={location}
          exact
          path="/auth/becomeALandlord"
          component={Signup}
          pieceOf={{ role: "Host" }}
        />
        <GuestRoute
          location={location}
          exact
          path="/auth/verification"
          component={Verification}
        />
        <GuestRoute
          location={location}
          exact
          path="/auth/newpwd"
          component={Newpwd}
        />
        <Grid
          container
          item
          style={{ minHeight: "100vh", backgroundColor: "#f4f4f4" }}
        >
          <Grid lg={2} md={3} sm={3} xs={12} item>
            <Sidebar />
          </Grid>
          <Grid lg={10} md={9} sm={9} xs={12} item className="pr-30 pl-30">
            <AdminRoute
              location={location}
              exact
              path="/admin/dashboard"
              component={Dashboard}
            />
            <AdminRoute
              location={location}
              exact
              path="/admin/chat"
              component={Chatadmin}
            />
            <AdminRoute
              location={location}
              exact
              path="/admin/calendar"
              component={Calender}
            />
            <AdminRoute
              location={location}
              exact
              path="/admin/space"
              component={Spaces}
            />
            <AdminRoute
              location={location}
              exact
              path="/admin/addspace"
              component={Addspace}
            />
            <AdminRoute
              location={location}
              exact
              path="/admin/addvenue"
              component={Venueadd}
            />
            <AdminRoute
              location={location}
              exact
              path="/admin/user"
              component={Header}
            />
            <AdminRoute
              location={location}
              exact
              path="/admin/editspace/:id"
              component={Editspace}
            />
            <AdminRoute
              location={location}
              exact
              path="/guest/dashboard"
              component={Dashboard}
            />
            <AdminRoute
              location={location}
              exact
              path="/guest/chat"
              component={Chat}
            />
            <AdminRoute
              location={location}
              exact
              path="/guest/reservations"
              component={Reservations}
            />
            <AdminRoute
              location={location}
              exact
              path="/guest/collections"
              component={Collections}
            />
            <AdminRoute
              location={location}
              exact
              path="/guest/intitatechat"
              component={Newchat}
            />
          </Grid>
        </Grid>
      </Switch>
      <Footer />
    </>
  );
};
const mapDispatch = dispatch => {
  return bindActionCreators(
    {
      unAuthorizedinitial
    },
    dispatch
  );
};
const mapGetState = state => {
  return {
    unauthorized: state.homeSpaces
  };
};
export default connect(mapGetState, mapDispatch)(App);
