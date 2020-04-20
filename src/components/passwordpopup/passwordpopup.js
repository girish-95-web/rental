import React from 'react';
import {Error, Success} from '../error'
import {
    Grid,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
} from '@material-ui/core';
export default function AlertDialogpwd(props) {
    const { openpwd, handleCloseNo, errors } = props;
    return (
       
            <Dialog className="my_profile_popup" open={openpwd} onClose={handleCloseNo} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Change Password"}</DialogTitle>
                <DialogContent>
                    <form onSubmit={props.onSubmit}>
                        <Grid error={errors.oldPassword} item>
                            <label>Old Password</label>
                            <TextField name="oldpassword" type="password" onChange={props.onChangepwd} />
                            {errors && errors.oldpassword && <Error text={errors.oldpassword} />}
                        </Grid>
                        <Grid error={errors.newPassword} item>
                            <label>New Password</label>
                            <TextField name="newpassword" type="password" onChange={props.onChangepwd} />
                            {errors && errors.newpassword && <Error text={errors.newpassword} />}
                        </Grid>
                        <Grid error={errors.cPassword} item>
                            <label>Confirm Password</label>
                            <TextField name="cPassword" type="password" onChange={props.onChangepwd} />
                            {errors && errors.cPassword && <Error text={errors.cPassword} />}
                        </Grid>
                    </form>
                    
                    {props.successmessage&& <Success text={props.successmessage}/> || props.failedmessage&& <Error text={props.failedmessage}/> }
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleCloseNo} className="bg-default-color outlineBtnCol" >
                        Close
                    </Button>
                    <Button type="submit" className="bg-primary-color" onClick={props.handleCloseYespwd} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
    );
}