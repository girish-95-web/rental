import React from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  Badge,
  CircularProgress
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Rating } from "@material-ui/lab";
import Form from "./from";
import image1 from "./../../assets/images/image1.png";
import { Link } from "react-router-dom";
import GridList from "../../components/gridList";

export default function HomePage(props) {
  const { listingsuccess, loader, isLoggedin, fav, addsuccess, t } = props;
  var home = listingsuccess && listingsuccess.homelisting;
  var favoriteid =
    addsuccess && addsuccess.favourite && addsuccess.favourite.propertyInfoId;
  return (
    <>
      <section id="banner">
        <div className="mb-60">
          <div className="banner_section">
            <Container>
              <Grid container alignItems="center" item>
                <Grid sm={12} md={7} item className="p5">
                  <span className="text-sm-center f30 f500 w-50">
                    {t("home.bannerHeading")}
                  </span>
                  {isLoggedin ? (
                    ""
                  ) : (
                    <Grid container className="banner_bg_content mt4 ">
                      <Grid xs={6} item>
                        <Typography className="border-right-1 pr-5 gray-color">
                          Earn up to{" "}
                          <span className="primary-color">$960/month</span> when
                          you lease one office space
                        </Typography>
                      </Grid>
                      <Grid xs={6} item>
                        <Typography className="text-center">
                          <Link to="/auth/becomeALandlord">
                            Become a landlord
                          </Link>
                          <span className="gray-color pl-10">></span>
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                </Grid>

                <Grid sm={12} md={5} item>
                  <Grid className="booking_form" container>
                    <Grid md={12} item className="pb-10">
                      <span className="text-center mb-25 f25 f500">
                        Book your favorite office space
                      </span>
                    </Grid>
                    <Form {...props} />
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </div>
          {loader ? (
            <div className="listLoader">
              <CircularProgress />
            </div>
          ) : (
            <>
              {home && home.nearby && home.nearby.length ? (
                <div className="how-we-help-section mt-60">
                  <Container>
                    <Grid container alignItems="center">
                      <Grid
                        md={12}
                        sm={12}
                        xs={12}
                        item
                        className="d-flex justify-contant-space-between align-items-center d-sm-flex-column"
                      >
                        <span className="text-center mb-25 f25 f500">
                          How can we help you?
                        </span>
                      </Grid>
                    </Grid>
                    <Grid spacing={3} className="mt-40" container>
                      {listingsuccess &&
                        listingsuccess.homelisting &&
                        listingsuccess.homelisting.nearby.map((items, key) => {
                          return (
                            <Grid item md={3} sm={6} xs={12} key={key}>
                              <GridList items={items} {...props} />
                            </Grid>
                          );
                        })}
                    </Grid>
                  </Container>
                </div>
              ) : (
                <></>
              )}
              {home && home.toprated && home.toprated.length ? (
                <div className="how-we-help-section mt-60">
                  <Container>
                    <Grid container alignItems="center">
                      <Grid md={12} item className="">
                        <span className="mb-10 f22 f500">
                          Top rated experience
                        </span>
                        <Typography>
                          Lorem Ipsum dolor sir amet, consecteture adipiscing
                          elit sed do.
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid spacing={3} className="mt-25" container>
                      {home.toprated.map((items, key) => {
                        var i = 1;
                        var media = "";
                        return (
                          <Grid md={3} sm={6} xs={12} item key={key}>
                            <div className="box-shadow img_box_height.main_grid_col img_box_height_home  main_grid_col">
                              <div className="grid_image">
                                <Link
                                  to={"/listdetail/" + items.spacebooking.id}
                                >
                                  {!items.spacebooking &&
                                  items.spacebooking.propertymedia.length
                                    ? (media = "")
                                    : items.spacebooking &&
                                      items.spacebooking.propertymedia &&
                                      i === 1 &&
                                      items.spacebooking.propertymedia.map(
                                        (item, key) => {
                                          if (
                                            item.type === "Image" &&
                                            item.media !== "null"
                                          ) {
                                            media =
                                              process.env.REACT_APP_URL_IMAGE +
                                              items.spacebooking.propertymedia[
                                                key
                                              ].media;
                                            i = i + 1;
                                          }
                                        }
                                      )}
                                  {
                                    <>
                                      <img
                                        alt=""
                                        src={media !== "" ? media : image1}
                                      />
                                    </>
                                  }
                                </Link>
                                <div className="pepole_rented_btn ic_fev">
                                  {/* {localStorage.userJWT? <Button onClick={e=>props.addtocollection(items.propertyInfoId)} style={fav? {color:"red"} : {color:'black'}}><FavoriteIcon /></Button>: ''} */}
                                  {localStorage.userJWT ? (
                                    <Button
                                      onClick={e =>
                                        props.addtocollection(
                                          items.propertyInfoId
                                        )
                                      }
                                      style={
                                        items.collection ||
                                        parseInt(favoriteid) ===
                                          items.propertyInfoId
                                          ? { color: "red" }
                                          : { color: "black" }
                                      }
                                    >
                                      <FavoriteIcon />
                                    </Button>
                                  ) : (
                                    ""
                                  )}
                                  {console.log(
                                    "items.collection",
                                    items.collection,
                                    favoriteid,
                                    items.propertyInfoId
                                  )}
                                </div>
                                <div className="pepole_rented_btn">
                                  <Badge className="bg-primary-color">
                                    {items.booking === 1
                                      ? items.booking + " Person rented"
                                      : items.booking > 1
                                      ? items.booking + " People rented"
                                      : ""}
                                  </Badge>
                                </div>
                              </div>
                              <div className="grid_contant">
                                <div className="mb-10">
                                  <div className="f15 f500 itemName">
                                    {items.spacebooking &&
                                      items.spacebooking.name}
                                  </div>
                                  <div className="f13 f400 mt-2">
                                    {items.spacebooking &&
                                    items.spacebooking.proprtyPrice &&
                                    items.spacebooking.proprtyPrice
                                      .monthlyPrice !== null &&
                                    items.spacebooking &&
                                    items.spacebooking.proprtyPrice &&
                                    items.spacebooking.proprtyPrice
                                      .monthlyPrice !== ""
                                      ? items.spacebooking &&
                                        items.spacebooking.proprtyPrice &&
                                        new Intl.NumberFormat("en-US", {
                                          style: "currency",
                                          currency: "USD"
                                        }).format(
                                          items.spacebooking.proprtyPrice
                                            .monthlyPrice
                                        ) + "/month"
                                      : items.spacebooking &&
                                        items.spacebooking.proprtyPrice &&
                                        items.spacebooking.proprtyPrice
                                          .perHour !== null &&
                                        items.spacebooking &&
                                        items.spacebooking.proprtyPrice &&
                                        items.spacebooking.proprtyPrice
                                          .perHour !== ""
                                      ? items.spacebooking &&
                                        items.spacebooking.proprtyPrice &&
                                        new Intl.NumberFormat("en-US", {
                                          style: "currency",
                                          currency: "USD"
                                        }).format(
                                          items.spacebooking.proprtyPrice
                                            .perHour
                                        ) + "/hour"
                                      : items.spacebooking &&
                                        items.spacebooking.proprtyPrice &&
                                        items.spacebooking.proprtyPrice
                                          .perDayPass !== null &&
                                        items.spacebooking &&
                                        items.spacebooking.proprtyPrice &&
                                        items.spacebooking.proprtyPrice
                                          .perDayPass !== ""
                                      ? items.spacebooking &&
                                        items.spacebooking.proprtyPrice &&
                                        new Intl.NumberFormat("en-US", {
                                          style: "currency",
                                          currency: "USD"
                                        }).format(
                                          items.spacebooking.proprtyPrice
                                            .perDayPass
                                        ) + "/day"
                                      : ""}
                                  </div>
                                </div>
                                <div className="star_reting">
                                  <Rating
                                    value={items.rating ? items.rating : 0}
                                    precision={0.5}
                                    readOnly
                                  />
                                </div>
                                {items.spacebooking &&
                                items.spacebooking.description ? (
                                  <div className="drid_discription">
                                    <Typography className="">
                                      {items.spacebooking &&
                                        items.spacebooking.description}
                                    </Typography>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Container>
                </div>
              ) : (
                <></>
              )}

              <div className="how-we-help-section mt-60">
                <Container>
                  <Grid container alignItems="center">
                    <Grid md={12} item className="">
                      <span className="mb-10 f22 f500">
                        Rental space places{" "}
                      </span>
                      <Typography>
                        Lorem Ipsum dolor sir amet, consecteture adipiscing elit
                        sed do.
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid spacing={3} className="mt-25" container>
                    <Grid md={12} sm={12} xs={12} item>
                      <div className="main_grid_col rantel_spaceCol">
                        <Button className="cutom_btn box-shadow">
                          Explore place >
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </Container>
              </div>
              {listingsuccess &&
              listingsuccess.homelisting &&
              listingsuccess.homelisting.office.length ? (
                <div className="how-we-help-section mt-60">
                  <Container>
                    <Grid container alignItems="center">
                      <Grid md={12} item className="">
                        <span className="mb-10 f22 f500">
                          Places to have your office
                        </span>
                        <Typography>
                          Lorem Ipsum dolor sir amet, consecteture adipiscing
                          elit sed do.
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid spacing={3} className="mt-25" container>
                      {listingsuccess.homelisting.office.map((items, key) => {
                        return (
                          <Grid lg={3} md={4} sm={6} xs={12} key={key} item>
                            <GridList items={items} {...props} />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Container>
                </div>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
