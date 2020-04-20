import Geocode from "react-geocode";
export const getCurrentLocation = async (self, position) => {
    var currentLocation = {};
    currentLocation.latitude = position.coords.latitude;
    currentLocation.longitude = position.coords.longitude;
    Geocode.setApiKey("AIzaSyAz5JCX7obIVQA8dVwRyxpbQbCO0OiTI2o");
    Geocode.enableDebug();
    let address = await Geocode.fromLatLng(
      currentLocation.latitude,
      currentLocation.longitude
    );
    if (address.status === "OK") {
      address.results[0].address_components.map(address_component => {
        switch (address_component.types[0]) {
          case "locality":
            currentLocation.locality = address_component.long_name;
            currentLocation.error = false;
            currentLocation.errorMessage = "";
            return;
        }
      });
      return currentLocation;
    }
};
export const getLocationFieldsLatLng = (latLng, address_components) => {
  var currentLocation = {};
  currentLocation.latitude = latLng.lat;
  currentLocation.longitude = latLng.lng;
  currentLocation.error = false;
  currentLocation.errorMessage = "";
  currentLocation.address = address_components[0].formatted_address;
  address_components[0].address_components.map(address_component => {
    switch (address_component.types[0]) {
      case "route":
        currentLocation.route = address_component.long_name;
        break;
      case "locality":
        currentLocation.locality = address_component.long_name;
        currentLocation.city = address_component.long_name;
        break;
      case "country":
        currentLocation.country = address_component.long_name;
        break;
      case "postal_code":
        currentLocation.postal_code = address_component.long_name;
        currentLocation.zip = address_component.long_name;
        break;
      case "street_number":
        currentLocation.street_number = address_component.long_name;
        break;
      default:
        break;
    }
  });
  return currentLocation;
};
export const onKeyPress = evt => {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  var regex = /^[0-9\b]+$/;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
};
