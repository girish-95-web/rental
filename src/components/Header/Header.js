import React from "react";
import { Grid } from "@material-ui/core";
import Headerlogo from "./Headerlogo";
import Menulist from "./Menulist";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import { Container } from "@material-ui/core";
import { connect } from "react-redux";
import { logout } from "../../services/action/auth";
import { bindActionCreators } from "redux";
import { getuser, switchrole } from "./../../services/action/auth";
import {
  userprofileValidator,
  changepasswordvalidator
} from "./../../components/validator";
import { updateuser } from "./../../services/action/auth";
import { updatepassword } from "./../../services/action/auth";
import {
  setTranslations,
  setDefaultLanguage,
  setLanguageCookie,
  setLanguage,
  translate
} from "react-switch-lang";
import en from "../../constants/en.json";
import th from "../../constants/th.json";
setTranslations({ en, th });
setDefaultLanguage("en");
class Header extends React.Component {
  state = {
    open: false,
    openpwd: false,
    left: false,
    data: {
      profilepic: "",
      firstName: "",
      lastName: ""
    },
    pwddata: {
      oldpassword: "",
      newpassword: "",
      cPassword: ""
    },
    logintype: "",
    profilemsgsuccess: "",
    profilemsgfailed: "",
    failedmessage: "",
    successmessage: "",
    picture: "",
    imagePreviewUrl: "",
    email: "",
    PhoneNo: "",
    role: "",
    errors: {},
    loader: false,
    isAdmin: "false"
  };
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };
  componentWillReceiveProps(props) {
    const { getusersucess, getpwdsuccess } = props;

    if (getusersucess && getusersucess.success === true) {
      let UserProfile =
        getusersucess.UserProfile !== null && getusersucess.UserProfile;
      this.setState({
        loader: false,
        data: {
          ...this.state.data,
          firstName: UserProfile.users && UserProfile.users.firstName,
          lastName: UserProfile.users && UserProfile.users.lastName
        },
        picture: UserProfile.users && UserProfile.users.profilepic,
        email: UserProfile.email,
        PhoneNo: UserProfile.PhoneNo,
        logintype:
          UserProfile && UserProfile.login && UserProfile.login.loginType
      });
    }

    if (getusersucess && getusersucess.success === true) {
      this.setState({
        profilemsgsuccess: getusersucess && getusersucess.message
      });
    } else if (getusersucess && getusersucess.success === false) {
      this.setState({
        profilemsgfailed: getusersucess && getusersucess.message
      });
    }
    if (getpwdsuccess && getpwdsuccess.success === true) {
      this.setState({
        openpwd: true,
        successmessage: getpwdsuccess && getpwdsuccess.message
      });
    }
    if (getpwdsuccess && getpwdsuccess.success === false) {
      this.setState({
        openpwd: true,
        failedmessage: getpwdsuccess && getpwdsuccess.message
      });
    }
  }
  onChange = e => {
    if (e.target.name === "profilepic") {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        this.setState({
          data: {
            ...this.state.data,
            profilepic: file
          },
          imagePreviewUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value }
      });
    }
  };
  onChangepwd = e => {
    this.setState({
      pwddata: {
        ...this.state.pwddata,
        [e.target.name]: e.target.value
      }
    });
  };

  componentDidMount() {
    this.props.getuser();
  }
  handleClose = event => {
    if (this.anchorEl) {
      if (this.anchorEl.contains(event.target)) {
        return;
      }
    }
    this.setState({ open: false });
  };
  logOutNOw = e => {
    this.props.logout();
    this.setState({
      loader: true
    });
  };
  getProfile = () => {
    this.setState({
      open: true
    });
  };
  handleCloseNo = () => {
    this.setState({
      // data:{
      //   ...this.state.data,
      //   firstName:this.props.getusersucess.UserProfile.users.firstName,
      //   lastName:this.props.getusersucess.UserProfile.users.lastName,
      //   profilepic:this.props.getusersucess.UserProfile.users.profilepic
      // },
      // loginType:this.props.getusersucess.UserProfile.login.loginType,
      // email:this.props.getusersucess.UserProfile.email,
      // PhoneNo:this.props.getusersucess.UserProfile.PhoneNo,
      data: {
        ...this.state,
        profilepic:
          this.props &&
          this.props.getusersucess &&
          this.props.getusersucess.UserProfile &&
          this.props.getusersucess.UserProfile.users &&
          this.props.getusersucess.UserProfile.users.profilepic,
        firstName:
          this.props &&
          this.props.getusersucess &&
          this.props.getusersucess.UserProfile &&
          this.props.getusersucess.UserProfile.users &&
          this.props.getusersucess.UserProfile.users.firstName,
        lastName:
          this.props &&
          this.props.getusersucess &&
          this.props.getusersucess.UserProfile &&
          this.props.getusersucess.UserProfile.users &&
          this.props.getusersucess.UserProfile.users.lastName
      },
      loginType:
        this.props.getusersucess &&
        this.props.getusersucess.UserProfile &&
        this.props.getusersucess.UserProfile.login &&
        this.props.getusersucess.UserProfile.login.loginType,
      email:
        this.props &&
        this.props.getusersucess &&
        this.props.getusersucess.UserProfile &&
        this.props.getusersucess.UserProfile.email,
      PhoneNo:
        this.props &&
        this.props.getusersucess &&
        this.props.getusersucess.UserProfile &&
        this.props.getusersucess.UserProfile.PhoneNo,
      open: false,
      openpwd: false,
      profilemsgsuccess: "",
      profilemsgfailed: "",
      failedmessage: "",
      errors: {}
    });
  };
  handleChangePassword = () => {
    this.setState({
      open: false,
      openpwd: true
    });
  };
  handleCloseYes = () => {
    const { data } = this.state;
    const errors = userprofileValidator(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.updateuser(data);
    }
  };
  handleCloseYespwd = () => {
    const { pwddata } = this.state;
    const errors = changepasswordvalidator(pwddata);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.updatepassword(pwddata);
    }
  };
  switchRole = () => {
    localStorage.setItem(
      "isAdmin",
      localStorage.isAdmin === "Host" ? "User" : "Host"
    );
    this.props.switchrole();
    this.setState({ isAdmin: localStorage.isAdmin });
  };
  handleSetLanguage = (e) => {
    setLanguage(e.target.value);
  };
  render() {
    const { isLoggedin } = this.props;
    return (
      <div className="top-header top-dashBoardheader dashBoard-Container fixed">
        <Container>
          <div className="header">
            <Hidden xsDown>
              <div className="dashBoardHeader">
                <Grid container alignItems="center">
                  <Grid xs={12} sm={3} md={4} item>
                    <Headerlogo isLoggedin={isLoggedin} />
                  </Grid>
                  <Grid className="menuList" xs={12} sm={9} md={8} item>
                    <Menulist
                      switchRole={this.switchRole}
                      {...this.state}
                      {...this.props}
                      handleSetLanguage={this.handleSetLanguage}
                      handleCloseNo={this.handleCloseNo}
                      handleCloseYes={this.handleCloseYes}
                      open={this.state.open}
                      logOutNOw={this.logOutNOw}
                      getProfile={this.getProfile}
                      onChange={this.onChange}
                      handleChangePassword={this.handleChangePassword}
                      openpwd={this.state.openpwd}
                      handleCloseYespwd={this.handleCloseYespwd}
                      onChangepwd={this.onChangepwd}
                    />
                  </Grid>
                </Grid>
              </div>
            </Hidden>
            <Hidden smUp>
              <Grid xs={6} sm={6} item>
                <Headerlogo />
              </Grid>
              <div className="dashBoardHeader">
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.toggleDrawer("left", true)}
                  style={{ color: "#f3f3f3" }}
                >
                  <MenuIcon isLoggedin={isLoggedin} />
                </IconButton>
              </div>
              <Drawer open={this.state.left}>
                <div className="mobile-Drawer dashBoardHeader">
                  <Button
                    onClick={this.toggleDrawer("left", false)}
                    tabIndex={0}
                    onKeyDown={this.toggleDrawer("left", false)}
                    style={{
                      color: "#fff",
                      justifyContent: "flex-end",
                      width: "100%"
                    }}
                  >
                    <CloseIcon />
                  </Button>

                  <List>
                    <Grid container alignItems="center">
                      <Grid xs={12} sm={6} item>
                        <Menulist
                          {...this.state}
                          {...this.props}
                          switchRole={this.switchRole}
                          handleCloseNo={this.handleCloseNo}
                          handleCloseYes={this.handleCloseYes}
                          open={this.state.open}
                          logOutNOw={this.logOutNOw}
                          openpwd={this.state.openpwd}
                          getProfile={this.getProfile}
                          onChange={this.onChange}
                          handleChangePassword={this.handleChangePassword}
                          handleCloseYespwd={this.handleCloseYespwd}
                          onChangepwd={this.onChangepwd}
                        />
                      </Grid>
                    </Grid>
                  </List>
                </div>
              </Drawer>
            </Hidden>
          </div>
        </Container>
      </div>
    );
  }
}
const mapDispatchAuth = dispatch => {
  return bindActionCreators(
    {
      logout,
      getuser,
      updateuser,
      updatepassword,
      switchrole
    },
    dispatch
  );
};
const mapStateAuth = state => {
  return {
    isLoggedin: state.auth.token,
    isAdmin: state.auth.isAdmin,
    getusersucess: state.auth.userdetails,
    getpwdsuccess: state.auth.userpassword,
    usersuccess: state.auth.userupdate
  };
};
const translateHome = translate(Header);
export default connect(mapStateAuth, mapDispatchAuth)(translateHome);
