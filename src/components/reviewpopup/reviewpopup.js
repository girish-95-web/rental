import React from 'react';
import rating from '../../assets/images/rating.png'
import {Error, Success} from '../error'
import {
    Grid,
    Button,
    TextareaAutosize,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
} from '@material-ui/core';
import {Rating} from '@material-ui/lab'
export default function ReviewPopup(props) {
    const { review, handleCloseNo, errors } = props;
    return (
       
            <Dialog className="my_profile_popup" open={review} onClose={handleCloseNo} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Rate the place"}</DialogTitle>
                <DialogContent>
                <Grid className="d-flex justify-contant-center"><img src={rating} style={{ width: '250px'}} alt="confirm"/></Grid>
                    <form onSubmit={props.onSubmit}>
                    <Grid className="star_reting"item>
                            <label>Rate us</label>
                            <Rating name="rating" onChange={props.onChangeReview} />
                            {errors && errors.rating && <Error text={errors.rating} />}
                        </Grid>
                        <Grid error={errors.review} item>
                            <label>Write a review</label>
                            <TextareaAutosize className="height-50" aria-label="minimum height" name="review" onChange={props.onChangeReview} colsMin={1} rowsMin={6}/>
                            {errors && errors.review && <Error text={errors.review} />}
                        </Grid>
                    </form>
                    {props.message && <Error text={props.message} />}
                </DialogContent>
                <DialogActions className="mb-20">
                    <Button onClick={props.handleCancel} className="outlineBtnCol">
                        Close
                    </Button>
                    <Button type="submit" className="bg-primary-color" onClick={props.handleSave} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
    );
}