import React from 'react';
import {Error, Success} from '../error'
import Asterisk from '../asterisk'
import PenIcon from '@material-ui/icons/Edit'
import {
    Grid,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Avatar
} from '@material-ui/core';

export default function AlertDialog(props) {
    const { open, handleCloseNo, errors, data, handleChangePassword } = props;
    return (
            <Dialog className="my_profile_popup" open={open} onClose={handleCloseNo} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"My Profile"}</DialogTitle>
                <DialogContent>
                    <form onSubmit={props.onSubmit}>
                        <center><div className="grid_image space  text-sm-center" >
                            <Grid className="text-sm-center" item>
                                <Avatar className="imgRespon mb-10" alt={data.firstName} name="picture" src={props.imagePreviewUrl? props.imagePreviewUrl :  process.env.REACT_APP_URL_IMAGE+props.picture} style={{width: '100px',height: '100px'}}/>
                                <label htmlFor="upload-more-images-input" className="edit-icon" style={{display:'block'}} md={2}><PenIcon/></label>
                                <input className="w-100" id="upload-more-images-input" accept="image/*" name="profilepic" type="file" onChange={props.onChange} hidden/>
                            </Grid>
                        </div></center>
                        <Grid item error={errors.firstName}>
                            <label>First name<Asterisk/></label>
                            <TextField name="firstName" defaultValue={data.firstName} onChange={props.onChange} />
                            {errors && errors.firstName && <Error text={errors.firstName} />}
                        </Grid>
                        <Grid error={errors.lastName} item>
                            <label>Last name<Asterisk/></label>
                            <TextField name="lastName" defaultValue={data.lastName} onChange={props.onChange} />
                            {errors && errors.lastName && <Error text={errors.lastName} />}
                        </Grid>
                        <Grid item>
                            <label>Email</label>
                            <TextField name="email" value={props.email} disabled/>
                        </Grid>
                        <Grid item>
                            <label>Phone</label>
                            <TextField name="PhoneNo" defaultValue={data.PhoneNo} disabled onChange={props.onChange}/>
                        </Grid>
                    </form>
                    {props.profilemsgsuccess&&<Success text={props.profilemsgsuccess}/> || props.profilemsgfailed&&<Error text={props.profilemsgfailed}/>}
                  
                </DialogContent>
                <DialogActions>
                    {props.getusersucess&&props.getusersucess.UserProfile&&props.getusersucess.UserProfile.facebookId===null && props.getusersucess&&props.getusersucess.UserProfile&&props.getusersucess.UserProfile.googleId===null?
                        // props.logintype==="Email"||"PNO"?
                <Button onClick={handleChangePassword}  className="primary-color">
                        Change Password
                    </Button>
                    :<>
                    </>
                    }
                    <Button onClick={handleCloseNo}  className="danger-color outlineBtnCol">
                        Close
                    </Button>
                    <Button type="submit" className="bg-primary-color" onClick={props.handleCloseYes} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
    );
}