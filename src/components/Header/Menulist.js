import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Avatar } from "@material-ui/core";
import AlertDialog from "./../../components/profilepopup/profilepopup";
import AlertDialogpwd from "./../../components/passwordpopup/passwordpopup";
import image from "../../constants/image";
class Menulist extends Component {
  state = {
    openDropDown: false
  };
  handleEnter = () => {
    this.setState({
      openDropDown: true
    });
  };
  handleLeave = () => {
    this.setState({
      openDropDown: false
    });
  };
  render() {
    const {
      isLoggedin,
      logOutNOw,
      getProfile,
      isAdmin,
      getusersucess,
      t
    } = this.props;
    const { openDropDown } = this.state;
    let userProfileName =
      getusersucess &&
      getusersucess.UserProfile !== null &&
      getusersucess.UserProfile &&
      getusersucess.UserProfile.users;
    return (
      <>
        <section id="menuBar">
          <ul className="inline">
            <li>
              <Link to="/">{t('header.home')}</Link>
            </li>
            {isLoggedin ? (
              <li>
                {isAdmin !== "Host" ? (
                  <Link onClick={this.props.switchRole} to="/admin/dashboard">
                    {t('header.switchHost')}
                  </Link>
                ) : (
                  <Link onClick={this.props.switchRole} to="/guest/dashboard">
                    {t('header.switchGuest')}
                  </Link>
                )}
              </li>
            ) : (
              <li>
                <Link
                  to={{
                    pathname: "/auth/becomeALandlord",
                    state: { role: "Host" }
                  }}
                >
                  {t('header.becomeLandlord')}
                </Link>
              </li>
            )}
            <li>
              <a>{t('header.help')}</a>
            </li>
            {isLoggedin ? (
              <li className="position-relative">
                <Button
                  className="profile_btn_image bg-transparent"
                  onMouseEnter={this.handleEnter}
                  onMouseLeave={this.handleLeave}
                >
                  <Avatar
                    className="imgRespon"
                    style={{ border: "1px solid #ccc" }}
                    src={process.env.REACT_APP_URL_IMAGE + this.props.picture}
                  />
                  <span>
                    {" "}
                    &nbsp;
                    {userProfileName
                      ? (userProfileName && userProfileName.firstName) +
                        " " +
                        (userProfileName && userProfileName.lastName)
                      : ""}
                  </span>
                </Button>
                {openDropDown ? (
                  <div
                    className="user_profile position-absolute"
                    onMouseEnter={this.handleEnter}
                    onMouseLeave={this.handleLeave}
                  >
                    <Button onClick={e => getProfile(e)}>
                      {" "}
                      <span>{t('header.profile')}</span>{" "}
                    </Button>
                    <Button onClick={e => logOutNOw(e)}>
                      {" "}
                      <span>{t('header.logOut')}</span>{" "}
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </li>
            ) : (
              <li className="login_signin">
                <Link to="/auth/login">{t('header.login')}</Link> <span>Or</span>{" "}
                <Link
                  to={{ pathname: "/auth/signup", state: { role: "User" } }}
                >
                  {t('header.signUp')}
                </Link>
              </li>
            )}
            <li>
              {console.log(image.en,"en==")}
              <select className="langSelect" onChange={this.props.handleSetLanguage}>
                  <option>Select Lang</option>
                  <option value="en" className="en">EN</option>
                  <option value="th">FR</option>
              </select>
            </li>
          </ul>
        </section>
        <AlertDialog {...this.props} {...this.state} />
        <AlertDialogpwd {...this.props} {...this.state} />
      </>
    );
  }
}
export default Menulist;
