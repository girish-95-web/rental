import React from "react";
import HomePage from "./homePage";
import { searchValidator } from "../../components/validator";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { homelisting, initialState } from "../../services/action/homeSpaces";
import { search } from "./../../services/action/homeSpaces";
import {
  getLocationFieldsLatLng,
  getCurrentLocation
} from "../../constants/commonFunc";
import {
  getSpaceType,
  getListingType
} from "../../services/action/adminSpaces";
import { addcollection } from "../../services/action/adminCollection";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { translate } from "react-switch-lang";
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        spacingId: "",
        listingId: ""
      },
      address: {
        where: "",
        latitude: "",
        longitude: "",
        error: false,
        errorMessage: ""
      },
      currentLocation: {
        latitude: "",
        longitude: ""
      },
      scroll: false,
      loader: false,
      formloader: false,
      fav: false,
      errors: {}
    };
  }
  onChange = e => {
    if (e.target.name === "listingId") {
      this.setState({
        data: {
          ...this.state.data,
          listingId: e.target.value
        }
      });
      this.props.getSpaceType(e.target.value);
    } else {
      this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value }
      });
    }
  };
  onChangeSetAddress = address => {
    this.setState({
      address: {
        ...this.state.address,
        where: address.trimLeft()
      }
    });
    this.getLocationFields(address);
  };
  getLocation = async () => {
    var currentLocation = {};
    var address = {};
    let self = this;
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(success);
      this.setState({
        address: address
      });
    }
    async function success(position) {
      currentLocation = await getCurrentLocation(self, position);
      self.setState({
        currentLocation: {
          latitude: currentLocation.latitude.toString(),
          longitude: currentLocation.longitude.toString()
        }
      });
      self.props.homelisting(self.state.currentLocation);
    }
  };
  getLocationFields = async addressParam => {
    var currentLocation = {};
    await geocodeByAddress(addressParam)
      .then(async address_components => {
        var latLng = await getLatLng(address_components[0]);
        currentLocation = getLocationFieldsLatLng(latLng, address_components);
        await this.setState({
          currentLocation: currentLocation
        });
      })
      .catch(error => console.error("Error............", error));
  };
  componentWillMount() {
    this.props.getListingType();
    this.props.homelisting(this.state.currentLocation);
    this.setState({
      ...this.state,
      loader: true
    });
    this.getLocation();
    document.body.classList.add("loaderOverflow");
  }
  componentWillReceiveProps(props) {
    const { listingsuccess, addsuccess } = props;
    if (addsuccess && addsuccess.success === true) {
      this.setState({
        fav: !this.state.fav
      });
    }
    if (listingsuccess && listingsuccess.success === true) {
      this.setState({
        loader: false,
        listingsuccess: listingsuccess && listingsuccess.homelisting
      });
      document.body.classList.remove("loaderOverflow");
    }
  }
  onSubmit = e => {
    const { data, currentLocation, address } = this.state;
    e.preventDefault();
    const errors = searchValidator(address);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.history.push(
        `/searchlisting?&where=${address.where}&latitude=${
          currentLocation.latitude
        }&longitude=${currentLocation.longitude}&${
          data.listingId ? "listingId=" + data.listingId : ""
        }&${data.spacingId ? "spacingId=" + data.spacingId : ""}`
      );
      this.setState({ formloader: true });
    }
  };
  linkClick = id => {
    this.props.history.push("/listdetail/" + id);
  };
  addtocollection = id => {
    this.props.addcollection(id);
    this.props.homelisting(this.state.currentLocation);
  };
  render() {
    return (
      <>
        <HomePage
          {...this.state}
          {...this.props}
          onChangeSetAddress={this.onChangeSetAddress}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          linkClick={this.linkClick}
          addtocollection={this.addtocollection}
        />
      </>
    );
  }
}
const mapDispatch = dispatch => {
  return bindActionCreators(
    {
      search,
      initialState,
      homelisting,
      getSpaceType,
      getListingType,
      addcollection
    },
    dispatch
  );
};
const mapGetState = state => {
  return {
    searchsuccess: state.homeSpaces.Search,
    listingsuccess: state.homeSpaces.homeListing,
    spaceType: state.adminSpace.spaceType,
    isLoggedin: state.auth.token,
    spaceListing: state.adminSpace.spaceListing,
    addsuccess: state.adminCollection.collection
  };
};
const translateHome = translate(Home);
export default connect(mapGetState, mapDispatch)(translateHome);
