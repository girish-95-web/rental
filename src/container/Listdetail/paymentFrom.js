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
import { Error } from "../../components/error";
import { onKeyPress } from "../../constants/commonFunc";

export default function PaymentForm(props) {
  const { errorsPayment,paymentResp, dataPayment, paymentLoader } = props;
  return (
    <>
      <h4 className="font-weight-normal">Add card Detail</h4>
      <form onSubmit={props.onSubmitPayment}>
        <Grid container className="text-left">
          <Grid xs={12} sm={12} item error={errorsPayment.cardNumber}>
            <label>Card Number</label>
            <TextField
              name="cardNumber"
              onKeyPress={e => onKeyPress(e)}
              value={dataPayment.cardNumber}
              onChange={props.paymentChange}
              inputProps={{ maxLength: 16 }}
            />
            {errorsPayment.cardNumber && (
              <Error text={errorsPayment.cardNumber} />
            )}
          </Grid>
          <Grid item className="d-flex">
            <Grid
              xs={12}
              sm={6}
              className="pr-10 pr-xs-0"
              item
              error={errorsPayment.expMonth}
            >
              <label>Expiry Month</label>
              <TextField
                name="expMonth"
                onKeyPress={e => onKeyPress(e)}
                value={dataPayment.expMonth}
                onChange={props.paymentChange}
                inputProps={{ maxLength: 2 }}
              />
              {errorsPayment.expMonth && (
                <Error text={errorsPayment.expMonth} />
              )}
            </Grid>
            <Grid xs={12} sm={6} item error={errorsPayment.expYear}>
              <label>Expiry Year</label>
              <TextField
                name="expYear"
                onKeyPress={e => onKeyPress(e)}
                value={dataPayment.expYear}
                onChange={props.paymentChange}
                inputProps={{ maxLength: 4 }}
              />
              {errorsPayment.expYear && <Error text={errorsPayment.expYear} />}
            </Grid>
          </Grid>
          <Grid xs={12} sm={12} item error={errorsPayment.cvc}>
            <label>CVC Number</label>
            <TextField
              name="cvc"
              onKeyPress={e => onKeyPress(e)}
              value={dataPayment.cvc}
              onChange={props.paymentChange}
              inputProps={{ maxLength: 3 }}
            />
            {errorsPayment.cvc && <Error text={errorsPayment.cvc} />}
          </Grid>
        </Grid>
        <Grid md={12} item className="m-0 text-right">
          <Error text={paymentResp.message} />
        </Grid>
        <Grid
          item
          className="button_col d-flex flex-direction-reverse mb-0"
          md={12}
        >
          <Button
            variant="contained"
            className="bg-primary-color  mt-10"
            type="submit"
            disabled={paymentLoader ? true : false}
          >
            {paymentLoader ? <CircularProgress /> : "Submit"}
          </Button>
        </Grid>
      </form>
    </>
  );
}
