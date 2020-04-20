import React, { Fragment, useState } from 'react'
import { Grid, Container, Typography,Slider } from '@material-ui/core';
import FilterForm from './filterForm';


export default function Searchlisting(props) {
    const { spaceListing, spaceType, amenitiessuccess } = props;
    return (
        <div className="main_list_sec d-flex flex-flow-column mb-60  mt-md-60">
            <div className="banner_section searchListingBanner">
                <Container>
                    <Grid container alignItems="center" item>
                        <Grid sm={12} md={12} item className="p5">
                            
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <Container>
                <FilterForm {...props}/>
            </Container>
        </div>
    )
}
