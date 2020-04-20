import React from 'react';
import { Grid } from '@material-ui/core';

export default function chatbox() {
    
    return (
        <div className="space_form mb-60">
            <Grid spacing={3} className="m-0 w-100 mt-25 bg-white" container >
                <Grid className="d-flex justify-contant-space-between align-items-center border custom_head_padding" md={12} sm={12} xs={12} item>
                    Message
                </Grid>
            </Grid>       
        </div >
    )
}
