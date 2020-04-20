import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import image from "../constants/image";
export default function ViewComponentModel(props) {
  const { open, buttonsWant } = props;
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ padding: "10px" }} className="text-center">
          {props.modelComponent}
          {buttonsWant === true ? (
            <>
              <DialogTitle id="alert-dialog-title" className="successMessage">
                {props.message}
              </DialogTitle>
              <DialogActions style={{ justifyContent: "center" }}>
                <Button
                  className="bg-primary-color  mt-10"
                  onClick={props.handleCloseYes}
                  variant="contained"
                  autoFocus
                >
                  {props.btuttonText}
                </Button>
              </DialogActions>
            </>
          ) : (
            ""
          )}
        </div>
      </Dialog>
    </div>
  );
}
