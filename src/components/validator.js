import validator from "validator";

export const loginValidator = (data, type) => {
  const errors = {};
  if (!data.user) errors.user = "Enter email or phone";

  if (!data.password) errors.password = "Password should not be empty";
  return errors;
};
export const forgotValidator = data => {
  const errors = {};
  if (!data.user) errors.user = "Please enter email or phone";
  return errors;
};
export const signupValidator = (data, type) => {
  const errors = {};
  if (type === "email") {
    if (!validator.isEmail(data.user))
      errors.user = "Please enter a valid email";
    if (!data.user) errors.user = "Email should not be empty";
  } else if (type === "phone") {
    if (!data.user) errors.user = "Mobile number should not be empty";
    else if (!validator.matches(data.user, /^[0-9\b]+$/))
      errors.user = "Please enter a valid Mobile number";
    else if (!validator.isLength(data.user, { min: 0, max: 15 }))
      errors.user = "Mobile number should not exceed 15 digits";
  }
  if (
    !validator.matches(
      data.password,
      /(?=^.{5,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    )
  )
    errors.password =
      "Password must be atleast 5 Characters long and must include alphabets,digits and special characters";
  if (!data.password) errors.password = "Password should not be empty";
  if (!data.dob) errors.dob = "Birthdate should not be empty";
  if (!data.firstName || validator.trim(data.firstName) === "")
    errors.firstName = "First name should not be empty";
  else if (!validator.matches(data.firstName, /^[a-zA-Z ]*$/))
    errors.firstName = "First name should contain alphabets only";
  else if (!validator.isLength(data.firstName, { min: 2, max: 30 }))
    errors.firstName =
      "First name should contain minimum 2 and maximum 30 characters";
  if (data.lastName) {
    if (!validator.matches(data.lastName, /^[a-zA-Z ]*$/))
      errors.lastName = "Last name should contain alphabets only";
    if (!validator.isLength(data.lastName, { min: 2, max: 30 }))
      errors.lastName =
        "Last name should contain minimum 2 and maximum 30 characters";
  }
  if (!data.gender) errors.gender = "Please select your gender";
  return errors;
};

export const verifyValidator = data => {
  const errors = {};
  if (!validator.matches(data.otp, /^[0-9\b]+$/))
    errors.otp = "Please enter integers only";
  if (!data.otp) errors.otp = "Please enter otp";
  return errors;
};

export const pwdupdateValidator = data => {
  const errors = {};
  if (!data.otp) errors.otp = "Please enter otp";
  if (!validator.matches(data.otp, /^[0-9\b]+$/))
    errors.otp = "Please enter integers only";
  if (!data.user) errors.user = "Please enter email or phone";
  return errors;
};
export const changepasswordvalidator = data => {
  const errors = {};
  if (!data.oldpassword) errors.oldpassword = "Please enter old password";
  if (!data.newpassword) errors.newpassword = "Please enter new password";
  else if (
    !validator.matches(
      data.newpassword,
      /(?=^.{5,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    )
  )
    errors.newpassword =
      "Password must be atleast 5 Characters long and must include alphabets,digits and special characters";
  if (!data.cPassword) errors.cPassword = "Please confirm your password";
  if (data.cPassword !== data.newpassword)
    errors.cPassword = "Password mismatch";
  return errors;
};
export const newpwdValidator = (data, cpassword) => {
  const errors = {};
  if (!data.password) errors.password = "Please enter password";
  else if (
    !validator.matches(
      data.password,
      /(?=^.{5,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    )
  )
    errors.password =
      "Password must be atleast 5 Characters long and must include alphabets,digits and special characters";

  if (!cpassword) errors.cpassword = "Please confirm your password";
  if (cpassword && cpassword !== data.password) {
    errors.cpassword = "Password mismatch";
  }

  return errors;
};

export const searchValidator = data => {
  const errors = {};
  if (!data.where) errors.where = "Please enter a location";
  return errors;
};
export const addspaceValidator = (data, listingSlug) => {
  const errors = {};
  if (!data.name) errors.name = "Please enter name";
  else if (!validator.isLength(data.name, { min: 0, max: 50 }))
    errors.name = "Space name should not exceed 50 characters";
  if (!data.listingId) errors.listingId = "Please select listing type";
  if (!data.spacingId) errors.spacingId = "Please select space type";
  if (!data.quantity) errors.quantity = "Please enter capacity";
  else if (!validator.matches(data.quantity, /^[0-9\b]+$/))
    errors.quantity = "Please enter a valid capacity";
  else if (!validator.isLength(data.quantity, { min: 0, max: 5 }))
    errors.quantity = "Capacity should not exceed 5 digits";
  if (!data.monthlyPrice && listingSlug === "monthly")
    errors.monthlyPrice = "Please enter price";
  else if (!validator.isLength(data.monthlyPrice, { min: 0, max: 6 }))
    errors.monthlyPrice = "Price should not exceed 6 digits";
  if (!data.perHour && listingSlug === "hourly")
    errors.perHour = "Please enter price";
  else if (!validator.isLength(data.perHour, { min: 0, max: 6 }))
    errors.perHour = "Price should not exceed 6 digits";
  // if (!data.perHalfDay &&listingSlug === "hourly")
  // errors.perHalfDay = "Please enter price"
  // else if (!validator.isLength(data.perHalfDay, { min: 0, max: 6 }))
  //     errors.perHalfDay = "Price should not exceed 6 digits"
  // if (!data.perDay &&listingSlug === "hourly")
  // errors.perDay = "Please enter price"
  // else if (!validator.isLength(data.perDay, { min: 0, max: 6 }))
  // errors.perDay = "Price should not exceed 6 digits"
  if (!data.perDayPass && listingSlug === "day_pass")
    errors.perDayPass = "Please enter price";
  else if (!validator.isLength(data.perDayPass, { min: 0, max: 6 }))
    errors.perDayPass = "Price should not exceed 6 digits";
  return errors;
};
export const userprofileValidator = data => {
  const errors = {};
  if (!data.firstName) errors.firstName = "First name should not be empty";
  else if (!validator.matches(data.firstName, /^[a-zA-Z ]*$/))
    errors.firstName = "First name should contain alphabets only";
  else if (!validator.isLength(data.firstName, { min: 2, max: 30 }))
    errors.firstName =
      "First name should contain minimum 2 and maximum 30 characters";
  if (!data.lastName) errors.lastName = "Please enter last name";
  if (data.lastName) {
    if (!validator.matches(data.lastName, /^[a-zA-Z ]*$/))
      errors.lastName = "Last name should contain alphabets only";
    if (!validator.isLength(data.lastName, { min: 2, max: 30 }))
      errors.lastName =
        "Last name should contain minimum 2 and maximum 30 characters";
  }
  return errors;
};

export const venuesetupValidator = data => {
  const errors = {};
  if (!data.profileName) errors.profileName = "Please enter Profile Name";
  else if (!validator.isLength(data.profileName, { min: 2, max: 30 }))
    errors.profileName =
      "Profile Name should contain minimum 2 and maximum 30 characters";
  if (!data.address) errors.address = "Please enter Address";
  if (!data.floor_suite)
    errors.floor_suite = "Please enter Floor and/or suite number";
  if (!data.city) errors.city = "Please enter City";
  if (!data.zip) errors.zip = "Please enter Zip/Postal code";
  else if (!validator.isLength(data.zip, { min: 5, max: 12 }))
    errors.zip =
      "Zip/Postal code should contain minimum 5 and maximum 12 characters";
  if (!data.state) errors.state = "Please enter State";
  if (!data.country) errors.country = "Please enter Country";
  if (!data.phoneNo) errors.phoneNo = "Please enter Phone Number";
  else if (!validator.matches(data.phoneNo, /^[0-9\b]+$/))
    errors.phoneNo = "Please enter integers only";
  else if (!validator.isLength(data.phoneNo, { min: 8, max: 15 }))
    errors.phoneNo =
      "Phone Number should contain minimum 8 and maximum 15 characters";
  return errors;
};

export const bookingValidator = data => {
  const errors = {};
  if (!data.startdate) errors.startdate = "Please select date";
  if (data.enddate) {
    if (Date.parse(data.enddate) < Date.parse(data.startdate)) {
      errors.enddate = "Ending date should be greater than Starting date";
    }
  }
  if (data.moveindate) {
    if (Date.parse(data.enddate) < Date.parse(data.moveindate)) {
      errors.moveindate = "Move in date should be smaller than end date";
    }
    if (Date.parse(data.moveindate) < Date.parse(data.startdate)) {
      errors.moveindate = "Move in date should be greater than start date";
    }
  }
  if (!data.starttime) errors.starttime = "Please enter starting time";
  if (!data.endtime) errors.endtime = "Please enter starting time";
  if (data.endtime && data.starttime) {
    var a = data.endtime.split(":");
    var b = data.starttime.split(":");
    var c = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
    var d = +b[0] * 60 * 60 + +b[1] * 60 + +b[2];
    if (c - d < 1800) {
      errors.endtime = "There should be a difference of atleast 30 minutes";
    }
  }
  if (!data.quantity) errors.quantity = "Please enter attendees";
  else if (!validator.matches(data.quantity, /^[0-9\b]+$/))
    errors.quantity = "Please enter integers only";
  else if (data.quantity <= 0) errors.quantity = "Please enter a valid value";
  else if (!validator.isLength(data.quantity, { min: 0, max: 5 }))
    errors.quantity = "Capacity should not exceed 5 digits";
  return errors;
};
export const cardPayment = data => {
  const errors = {};
  if (!validator.isLength(data.cardNumber, { min: 16, max: 16 }))
    errors.cardNumber =
      "Card Number should contain maximum 16 characters";
  if (!data.cardNumber) errors.cardNumber = "Please enter card number";
  if (!data.expMonth) errors.expMonth = "Please enter expiry month";
  if (!data.expYear) errors.expYear = "Please enter expiry year";
  if (!data.cvc) errors.cvc = "Please enter cvc number";
  return errors;
};
export const reviewValidator = data => {
  const errors = {};

  return errors;
};
