import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import closepop from "../../assets/images/closepop.png";
export default function AlertDialog(props) {
    const {open, handleCloseNo} = props;
  return (
    <div >
      <Dialog
      className="closeDeletePopp"
        open={open}
        onClose={handleCloseNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="ic_closeImg">
          <img className="ic_closePop" alt="" width="100px" src={closepop} />
        </div>
        <DialogTitle className="text-center poppTitle" id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogActions className="popUpBtn">
          <Button onClick={props.handleCloseNo} className="outlineBtnCol">
            No
          </Button>
          <Button onClick={props.handleCloseYes} className="bg-primary-color" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}