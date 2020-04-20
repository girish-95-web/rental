import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Venuedetail from "./venuedetail";
import { venuesetup, getvenue } from "./../../../services/action/adminVenues";
import { initialState } from "./../../../services/action/homeSpaces";
import { venuesetupValidator } from "../../../components/validator";
import { ToastContainer, toast } from "react-toastify";
var toastId = null;
class Venueadd extends React.Component {
  state = {
    loader: false,
    pageloader: false,
    time: "",
    data: {
      profileName: "",
      address: "",
      floor_suite: "",
      city: "",
      zip: "",
      state: "",
      country: "",
      phoneNo: "",
      twitter: "",
      about: "",
      paymentType: "Check",
      accountno: "",
      paypalEmail: "",
      personalInfo: "",
      detailedInfo: "",
      logo: "",
      hour: [
        {
          day: "Monday",
          fromTime: "09:00:00",
          toTime: "17:00:00"
        },
        {
          day: "Tuesday",
          fromTime: "09:00:00",
          toTime: "17:00:00"
        },
        {
          day: "Wednesday",
          fromTime: "09:00:00",
          toTime: "17:00:00"
        },
        {
          day: "Thursday",
          fromTime: "09:00:00",
          toTime: "17:00:00"
        },
        {
          day: "Friday",
          fromTime: "09:00:00",
          toTime: "17:00:00"
        },
        {
          day: "Saturday",
          fromTime: "09:00:00",
          toTime: "17:00:00"
        },
        {
          day: "Sunday",
          fromTime: "09:00:00",
          toTime: "17:00:00"
        }
      ]
    },
    addressValid:false,
    imagePreviewUrl: "",
    errors: {}
  };
  validateAddress = async (data) => {
    let address = data.address.replace(/ +/g, "+").replace(/\#/g,"");
    let city = data.city.replace(/ +/g, "+").replace(/\#/g,"");
    let state = data.state.replace(/ +/g, "+").replace(/\#/g,"");
    let zip = data.zip;
    let commonAddress = address + "+" + city + "+" + state + "+" + zip;
    let component =
      "locality:" +
      data.city +
      "|postal_code:" +
      data.zip +
      "|administrative_area:" +
      data.state +
      "|country:" + data.country;
    component = component.replace(/ +/g, "");
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${commonAddress}&components=${component}&key=AIzaSyAz5JCX7obIVQA8dVwRyxpbQbCO0OiTI2o`,{
        method: 'GET'
    })
    let json;
    if (response.ok) { 
      json = await response.json();
      return await json;
    } else {
      alert("HTTP-Error: " + response.status);
    }
  };
  onSubmit = async e => {
    e.preventDefault();
    const { data } = this.state;
    const res = await this.validateAddress(data)
    const errors = venuesetupValidator(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0 && res.status === 'OK') {
      if (data.logo) {
        let dataLogo = {
          ...this.state.data,
          hour: JSON.stringify(data.hour)
        };
        this.props.venuesetup(dataLogo);
      } else {
        this.props.venuesetup(data);
      }
      this.setState({
        loader: true,
        addressValid:false
      });
    }else if(res.status !== 'OK'){
      this.setState({
        addressValid:true
      })
    }
  };
  onChange = e => {
    if (e.target.name === "logo") {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        this.setState({
          data: {
            ...this.state.data,
            logo: file
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
  hoursOnChange = (e, id) => {
    const { data } = this.state;
    let dataList = data.hour.map((items, key) => {
      if (key === id) {
        if (e.target.name === "hours") {
          if (e.target.checked) {
            return { ...items, fromTime: "00:00:00", toTime: "23:59:00" };
          } else {
            return { ...items, fromTime: "09:00:00", toTime: "17:00:00" };
          }
        } else if (e.target.name === "closed") {
          if (e.target.checked) {
            return { ...items, fromTime: "00:00:00", toTime: "00:00:00" };
          } else {
            return { ...items, fromTime: "09:00:00", toTime: "17:00:00" };
          }
        } else {
          return { ...items, [e.target.name]: e.target.value };
        }
      }
      if (key !== id) return items;
    });
    this.setState({
      data: {
        ...this.state.data,
        hour: dataList
      }
    });
  };

  componentDidMount() {
    this.props.getvenue();
    this.setState({
      loader: true,
      pageloader: true
    });
  }
  componentWillReceiveProps(props) {
    const { getvenuesucess } = props;
    if (getvenuesucess && getvenuesucess.success) {
      const { venuedetails } = getvenuesucess;
      this.setState({
        loader: false,
        pageloader: false
      });
      if (venuedetails.id) {
        this.setState({
          data: {
            ...this.state.data,
            profileName: venuedetails.profileName,
            address: venuedetails.address,
            floor_suite: venuedetails.floor_suite,
            city: venuedetails.city,
            zip: venuedetails.zip,
            state: venuedetails.state,
            country: venuedetails.country,
            phoneNo: venuedetails.phoneNo,
            twitter: venuedetails.twitter,
            about: venuedetails.about,
            paymentType: "Check",
            accountno: venuedetails.profileName,
            paypalEmail: venuedetails.profileName,
            personalInfo: venuedetails.personalInfo,
            detailedInfo: venuedetails.detailedInfo,
            hour: venuedetails.venueHours
          },
          imagePreviewUrl: process.env.REACT_APP_URL_IMAGE + venuedetails.logo
        });
        if (getvenuesucess.success && !toast.isActive(toastId)) {
          toastId = toast.success(getvenuesucess.message);
        }
        this.props.initialState();
      }
    }
    if (getvenuesucess && getvenuesucess.success === false) {
      this.setState({
        loader: false,
        pageloader: false
      });
      if (getvenuesucess.success && !toast.isActive(toastId)) {
        toastId = toast.error(getvenuesucess.message);
      }
    }
  }
  render() {
    return (
      <>
        <ToastContainer autoClose={8000} />
        <Venuedetail
          {...this.state}
          {...this.props}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          hoursOnChange={this.hoursOnChange}
        />
      </>
    );
  }
}
const mapDispatch = dispatch => {
  return bindActionCreators(
    {
      venuesetup,
      initialState,
      getvenue
    },
    dispatch
  );
};
const mapGetState = state => {
  return {
    venuesetupsuccess: state.adminVenues.venue,
    getvenuesucess: state.adminVenues.venuedetails
  };
};
export default connect(mapGetState, mapDispatch)(Venueadd);
