import React from "react";
import {
  Grid,
  Button,
  Typography,
  TextField,
  MenuItem,
  Select,
  TextareaAutosize,
  Checkbox,
  FormControl,
  FormControlLabel,
  Avatar,
  CircularProgress
} from "@material-ui/core";
import { Error } from "../../../components/error";
import Asterisk from "../../../components/asterisk";
import PenIcon from "@material-ui/icons/Edit";
import allData from "../../../constants/allData";
import { onKeyPress } from "../../../constants/commonFunc";
export default function Venuedetail(props) {
  const { data, errors, loader, pageloader, addressValid } = props;
  return (
    <>
      {pageloader ? (
        <div className="listLoader">
          <CircularProgress />
        </div>
      ) : (
        <div className="space_form mb-60">
          <form onSubmit={props.onSubmit}>
            <Grid spacing={3} className="m-0 w-100 mt-25 bg-white" container>
              <Grid
                className="d-flex justify-contant-space-between align-items-center border custom_head_padding"
                md={12}
                sm={12}
                xs={12}
                item
              >
                <div className="dropdown_text"></div>
                <div className="dropdown_text text-right">
                  <Button
                    className=" bg-primary-color custom_btn"
                    type="submit"
                    disabled={loader ? true : false}
                  >
                    {loader ? <CircularProgress /> : "Save"}
                  </Button>
                  {
                    addressValid ?
                    <Error text="Invalid address, zip or country." />
                    :
                    ''
                  }
                </div>
              </Grid>
            </Grid>
            <Grid className="m-0 w-100 mt-25  border bg-white" container>
              <Grid
                className="d-flex justify-contant-space-between align-items-center border-bottom custom_head_padding"
                md={12}
                sm={12}
                xs={12}
                item
              >
                <h4 className="font-weight-normal">
                  Venue Details<span className="danger-color">*</span>
                </h4>
              </Grid>
              <div className="space_rental_form mt-40 mb-20 pl-30">
                <Grid item className="mb-0">
                  <Avatar
                    className="avatar-logo-venue"
                    alt={data.firstName}
                    name="picture"
                    src={props.imagePreviewUrl}
                  />
                  <label htmlFor="upload-logo" className="venue-logo">
                    <PenIcon />
                  </label>
                  <input
                    className="w-100"
                    id="upload-logo"
                    accept="image/*"
                    name="logo"
                    type="file"
                    onChange={props.onChange}
                    hidden
                  />
                  {/* <label htmlFor="upload-more-images-input" style={{marginLeft:'6px'}} className="primary-color cursor-pointer text-center">Change Logo</label> */}
                  {/* <input className="w-100" id="upload-more-images-input" accept="image/*" name="logo" type="file" onChange={props.onChange} hidden/> */}
                </Grid>
                <Grid item error={errors.profileName}>
                  <label>
                    Profile name <Asterisk />
                  </label>
                  <TextField
                    name="profileName"
                    value={data.profileName}
                    onChange={props.onChange}
                  />
                  {errors.profileName && <Error text={errors.profileName} />}
                </Grid>
                <Grid item error={errors.address}>
                  <label>
                    Address
                    <Asterisk />
                  </label>
                  <TextField
                    name="address"
                    value={data.address}
                    onChange={props.onChange}
                  />
                  {errors.address && <Error text={errors.address} />}
                </Grid>
                <Grid item error={errors.floor_suite}>
                  <label>
                    Floor and/or suite number
                    <Asterisk />
                  </label>
                  <TextField
                    name="floor_suite"
                    value={data.floor_suite}
                    onChange={props.onChange}
                  />
                  {errors.floor_suite && <Error text={errors.floor_suite} />}
                </Grid>
                <Grid item error={errors.city}>
                  <label>
                    City
                    <Asterisk />
                  </label>
                  <TextField
                    name="city"
                    value={data.city}
                    onChange={props.onChange}
                  />
                  {errors.city && <Error text={errors.city} />}
                </Grid>
                <Grid item error={errors.zip}>
                  <label>
                    Zip
                    <Asterisk />
                  </label>
                  <TextField
                    name="zip"
                    value={data.zip}
                    onChange={props.onChange}
                    onKeyPress={e => onKeyPress(e)}
                    inputProps={{ minLength: 5, maxLength: 12 }}
                  />
                  {errors.zip && <Error text={errors.zip} />}
                </Grid>
                <Grid item error={errors.state}>
                  <label>
                    State
                    <Asterisk />
                  </label>
                  <TextField
                    name="state"
                    value={data.state}
                    onChange={props.onChange}
                  />
                  {errors.state && <Error text={errors.state} />}
                </Grid>
                <Grid item error={errors.country}>
                  <label>
                    Country
                    <Asterisk />
                  </label>
                  <TextField
                    name="country"
                    value={data.country}
                    onChange={props.onChange}
                  />
                  {errors.country && <Error text={errors.country} />}
                </Grid>
                <Grid item error={errors.phoneNo}>
                  <label>
                    Phone Number
                    <Asterisk />
                  </label>
                  <TextField
                    name="phoneNo"
                    value={data.phoneNo}
                    onChange={props.onChange}
                    onKeyPress={e => onKeyPress(e)}
                    inputProps={{ minLength: 8, maxLength: 15 }}
                  />
                  {errors.phoneNo && <Error text={errors.phoneNo} />}
                </Grid>
                {/* <Grid item>
                            <label>Twitter handle (ex.:@yourcomapny)</label>
                            <TextField name="twitter" value={data.twitter} onChange={props.onChange} />
                        </Grid> */}
                <Grid item>
                  <label>About your company</label>
                  <TextareaAutosize
                    className="height-50"
                    aria-label="minimum height"
                    value={data.about}
                    name="about"
                    onChange={props.onChange}
                    colsMin={1}
                    rowsMin={6}
                  />
                </Grid>
              </div>
            </Grid>
            <Grid className="m-0 w-100 mt-25  border bg-white" container>
              <Grid
                className="d-flex justify-contant-space-between align-items-center border-bottom custom_head_padding"
                md={12}
                sm={12}
                xs={12}
                item
              >
                <h4 className="font-weight-normal">
                  Payment Info<span className="danger-color">*</span>
                </h4>
              </Grid>
              <div className="space_rental_form mt-40 mb-20 pl-30">
                <Grid className="m-0 w-100 bg-white" container>
                  <div className="space_rental_form">
                    <Grid item>
                      <label>Account Number</label>
                      <TextField name="payeeName" onChange={props.onChange} />
                    </Grid>
                    <Grid item>
                      <label>Account Holder Name</label>
                      <TextField name="taxId" onChange={props.onChange} />
                    </Grid>
                    <Grid item>
                      <label>Account Type</label>
                      <TextField name="phone" onChange={props.onChange} />
                    </Grid>
                    <Grid item>
                      <label>Bank Name</label>
                      <TextField name="email" onChange={props.onChange} />
                    </Grid>
                  </div>
                </Grid>
              </div>
            </Grid>
            {/* <Grid className="m-0 w-100 mt-25  border bg-white" container >
                    <Grid className="d-flex justify-contant-space-between align-items-center border-bottom custom_head_padding" md={12} sm={12} xs={12} item>
                        <h4 className="font-weight-normal">Welcome Info<span className="danger-color">*</span></h4>
                    </Grid>
                    <div className="space_rental_form mt-40 mb-20 pl-30">
                        <Grid className="m-0 w-100 bg-white" container >
                            <div className="space_rental_form">
                                <Grid item>
                                    <label>Custom Greeting</label>
                                    <TextareaAutosize className="height-50" aria-label="minimum height" name="personalInfo" value={data.personalInfo} onChange={props.onChange} colsMin={1} rowsMin={6}/>
                                </Grid>
                                <Grid item>
                                    <label>Entry Instructions</label>
                                    <TextareaAutosize className="height-50" aria-label="minimum height" name="detailedInfo" value={data.detailedInfo} onChange={props.onChange} colsMin={1} rowsMin={6}/>
                                </Grid>
                            </div>
                        </Grid>
                    </div>
                </Grid> */}
            <Grid className="m-0 w-100 mt-25  border bg-white" container>
              <Grid
                className="d-flex justify-contant-space-between align-items-center border-bottom custom_head_padding"
                md={12}
                sm={12}
                xs={12}
                item
              >
                <h4 className="font-weight-normal">
                  Hours<span className="danger-color">*</span>
                </h4>
              </Grid>
              <div className="venue-hours-div mt-40 mb-20 pl-30 pr-30">
                <Grid className="m-0 w-100 bg-white" container>
                  <div className="venue-hours">
                    <Grid item>
                      <label>Guest hours</label>
                      {/* <TableContainer component={Paper}>
                                        <Table className="guest-hours" aria-label="spanning table">
            <TableHead>*/}
                      {/* <Grid className="d-flex flex-flow-row fields_row">
                                                    <Grid md={6}>
                                                        <b>Days</b>
                                                    </Grid>
                                                    <Grid md={6}><b>Hours</b></Grid>
                                                </Grid>  */}
                      {data.hour.length
                        ? data.hour.map((value, key) => {
                            return (
                              <Grid
                                key={key}
                                className="d-flex flex-flow-row fields_row tableGuesHourCol"
                              >
                                <Grid xs={3} className="venue-days">
                                  <b>{value.day}</b>
                                </Grid>
                                <Grid xs={3} className="venue-time">
                                  <Grid
                                    item
                                    className="d-flex flex-flow-row fields_row"
                                    md={12}
                                  >
                                    {value.fromTime === "00:00:00" &&
                                    value.toTime === "23:59:00" ? (
                                      "Open 24 hours"
                                    ) : value.fromTime === "00:00:00" &&
                                      value.toTime === "00:00:00" ? (
                                      "Closed"
                                    ) : (
                                      <>
                                        <Grid className="w-sm-50" md={5} item>
                                          <FormControl>
                                            <Select
                                              className="venue-days"
                                              name="fromTime"
                                              value={value.fromTime}
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              onChange={e =>
                                                props.hoursOnChange(e, key)
                                              }
                                            >
                                              {allData.timeJson.map(
                                                (item, idd) => {
                                                  return (
                                                    <MenuItem
                                                      value={item.value}
                                                      key={idd}
                                                    >
                                                      {item.time}
                                                    </MenuItem>
                                                  );
                                                }
                                              )}
                                            </Select>
                                          </FormControl>
                                        </Grid>
                                        <Grid className="w-sm-50" md={2} item>
                                          <Typography className="text-center">
                                            -
                                          </Typography>
                                        </Grid>
                                        <Grid className="w-sm-50" md={5} item>
                                          <FormControl>
                                            <Select
                                              className="venue-days"
                                              name="toTime"
                                              value={value.toTime}
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              onChange={e =>
                                                props.hoursOnChange(e, key)
                                              }
                                            >
                                              {allData.timeJson.map(
                                                (item, idd) => {
                                                  return (
                                                    <MenuItem
                                                      value={item.value}
                                                      key={idd}
                                                      selected
                                                    >
                                                      {item.time}
                                                    </MenuItem>
                                                  );
                                                }
                                              )}
                                            </Select>
                                          </FormControl>
                                        </Grid>
                                      </>
                                    )}
                                  </Grid>
                                </Grid>
                                <Grid xs={3}>
                                  <FormControl component="fieldset">
                                    <FormControlLabel
                                      value="Open 24 hours"
                                      name="hours"
                                      checked={
                                        value.fromTime === "00:00:00" &&
                                        value.toTime === "23:59:00"
                                          ? true
                                          : false
                                      }
                                      control={<Checkbox />}
                                      label="Open 24 hours"
                                      onChange={e =>
                                        props.hoursOnChange(e, key)
                                      }
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid xs={3}>
                                  <FormControl component="fieldset">
                                    <FormControlLabel
                                      value="Closed"
                                      name="closed"
                                      checked={
                                        value.fromTime === "00:00:00" &&
                                        value.toTime === "00:00:00"
                                          ? true
                                          : false
                                      }
                                      control={<Checkbox />}
                                      label="Closed"
                                      onChange={e =>
                                        props.hoursOnChange(e, key)
                                      }
                                    />
                                  </FormControl>
                                </Grid>
                              </Grid>
                            );
                          })
                        : ""}

                      {/* </TableHead>
                                        </Table>
                                    </TableContainer> */}
                    </Grid>
                  </div>
                </Grid>
              </div>
            </Grid>
          </form>
        </div>
      )}
    </>
  );
}
