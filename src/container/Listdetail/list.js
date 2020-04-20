import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { bindActionCreators } from "redux";
import Listdetail from "./Listdetail";
import {
  spacedetails,
  reservation,
  cardPaymentForm,
  initialState
} from "./../../services/action/homeSpaces";
import { bookingValidator, cardPayment } from "./../../components/validator";
import ConfirmPopup from "../../components/confirmationPopup";
import { addcollection } from "../../services/action/adminCollection";
import PaymentForm from "./paymentFrom";
import ViewComponentModel from "../../components/viewComponentModel";
class List extends React.Component {
  
    state = {
      open: false,
      openConfirm:false,
      paymentLoader: false,
      message: "",
      failedmessage: "",
      name: "",
      description: "",
      address: "",
      price: "",
      amenities: "",
      data: {
        propertyInfoId: this.props.match.params.id,
        startdate: "",
        enddate: "",
        moveindate: "",
        starttime: "",
        endtime: "",
        quantity: ""
      },
      ownerid: "",
      id: this.props.match.params.id,
      loader: false,
      formloader: false,
      mediaImage: [],
      errors: {},
      dataPayment: {
        cardNumber: "",
        spacebookId: "",
        expMonth: "",
        expYear: "",
        cvc: ""
      },
      errorsPayment: {},
      fav: false
    };
  chatsupportRoute = () => {
    this.props.history.push({
      pathname: "/guest/intitatechat",
      state: {
        propertyInfoId: this.state.data.propertyInfoId,
        otheruserid: this.state.ownerid,
        isguest: true
      }
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { data } = this.state;
    const errors = bookingValidator(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.reservation(this.state.data);
      this.setState({
        formloader: true
      });
    }
  };
  componentWillUnmount() {
    this.props.initialState();
  }
  onChange = e => {
    if (
      e.target.name === "startdate" ||
      e.target.name === "enddate" ||
      e.target.name === "moveindate"
    ) {
      let value = moment(e.target.value).format("YYYY-MM-DD");
      this.setState({
        data: {
          ...this.state.data,
          [e.target.name]: value
        }
      });
    } else {
      this.setState({
        data: {
          ...this.state.data,
          [e.target.name]: e.target.value
        }
      });
    }
  };
  componentDidMount() {
    //console.log('checking the props-->',this.props.location.state)
    this.props.spacedetails(this.state.id);
    this.setState({
      ...this.state,
      loader: true
    });
  }
  onSubmitPayment = e => {
    e.preventDefault();
    const errorsPayment = cardPayment(this.state.dataPayment);
    this.setState({ errorsPayment });
    if (Object.keys(errorsPayment).length === 0) {
        this.props.cardPaymentForm(this.state.dataPayment)
      this.setState({
        paymentLoader: true
      });
    }
  };
  handleCloseYes = () => {
    this.setState({
      open: false,
      openConfirm:false
    });
  };
  linkClick = id => {
    this.props.history.push("/listdetail/" + id);
    this.props.spacedetails(id);
    this.setState({
      loader: true
    });
  };
  addtocollection = id => {
    this.props.addcollection(id);
    this.props.spacedetails(this.state.id);
  };
  paymentChange = e => {
    this.setState({
      dataPayment: {
        ...this.state.dataPayment,
        [e.target.name]: e.target.value.trim()
      }
    });
  };
  componentWillReceiveProps(props) {
    let images = [];
    const {
      spacesuccess,
      reservationsuccess,
      unauthorized,
      addsuccess,
      paymentResp
    } = props;
    if (addsuccess && addsuccess.success === true) {
      this.setState({
        fav: !this.state.fav
      });
    }
    if (unauthorized.unauthorized === true) {
      props.history.push("/auth/login");
    }
    if (spacesuccess && spacesuccess.success === true) {
      spacesuccess &&
        spacesuccess.propertyDetail &&
        spacesuccess.propertyDetail.propertymedia.map(items => {
          if (items.type === "Image") {
            images.push(items.media);
          }
        });
      this.setState({
        mediaImage: images,
        loader: false,
        ownerid:
          spacesuccess.propertyDetail &&
          spacesuccess.propertyDetail.property &&
          spacesuccess.propertyDetail.property.id
      });
    }
    if (reservationsuccess && reservationsuccess.success === true) {
      this.setState({
        formloader: false,
        open: true,
        message: reservationsuccess.message,
        data: {
          ...this.state.data,
          startdate: "",
          enddate: "",
          moveindate: "",
          starttime: "",
          endtime: "",
          quantity: ""
        },
        dataPayment:{
          ...this.state.dataPayment,
          spacebookId:reservationsuccess.data.id
        },
        failedmessage: ""
      });
      this.props.initialState();
    } 
    if (reservationsuccess && reservationsuccess.success === false) {
      this.setState({
        formloader: false,
        failedmessage: reservationsuccess.message
      });
      this.props.initialState();
    }
    if(paymentResp){
      if(paymentResp.success === true){
          this.setState({
            paymentLoader:false,
            openConfirm:true,
            open:false
          })
          this.props.initialState()
        }
        if(paymentResp.success === false){
          this.setState({
            paymentLoader:false
          })
        }
    }
  }
  render() {
    const {paymentResp} = this.props
    return (
      <div style={{ minHeight: "100vh" }}>
        <Listdetail
          chatsupportRoute={this.chatsupportRoute}
          {...this.state}
          {...this.props}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          linkClick={this.linkClick}
          onChangePicker={this.onChangePicker}
          addtocollection={this.addtocollection}
        />
        <ViewComponentModel
          modelComponent={
            <PaymentForm
              {...this.state}
              paymentResp={paymentResp}
              onSubmitPayment={this.onSubmitPayment}
              paymentChange={this.paymentChange}
            />
          }
          {...this.state}
          handleCloseYes={this.handleCloseYes}
          buttonsWant={false}
        />
        <ConfirmPopup {...this.state} open={this.state.openConfirm} handleCloseYes={this.handleCloseYes} btuttonText="Ok" message="You paid successfully."/>
      </div>
    );
  }
}
const mapDispatch = dispatch => {
  return bindActionCreators(
    {
      initialState,
      spacedetails,
      reservation,
      addcollection,
      cardPaymentForm
    },
    dispatch
  );
};
const mapGetState = state => {
  return {
    spacesuccess: state.homeSpaces.spaceDetails,
    unauthorized: state.homeSpaces,
    reservationsuccess: state.homeSpaces.reservation,
    paymentResp: state.homeSpaces.cardPayment,
    addsuccess: state.adminCollection.collection
  };
};
export default connect(mapGetState, mapDispatch)(List);
