import React from 'react'
import { Button, Select, MenuItem, Grid, CircularProgress, Chip } from '@material-ui/core';
import SearchFilterForm from '../../components/searchFilterPopup';
import {Error} from '../../components/error'
import AutoCompleteSearch from '../../constants/autoCompleteSearch';
import filter from "../../assets/images/filter.png";
import GridList from '../../components/gridList'
export default function FilterForm(props) {
    const { spaceListing, spaceType, data, errors, searchsuccess, listLoader } = props;
    return <><form className="filterForm mb-50 d-flex flex-flow-column">
        <Grid item className="d-flex flex-flow-row fields_row m-0 searcForm justify-contant-space-between" spacing={3} container>
            <Grid md={3} item className="searchField " error={errors.where}>
                <label>Where</label>
                <AutoCompleteSearch {...props} />
                {errors && errors.where && <Error text={errors.where} />}
            </Grid>
            <Grid md={3} item className="searchField ">
                <label>Listing Type</label>
                <Select className="select_box w-100"
                    defaultValue={data.listingId} name="listingId" onChange={props.onChange}>
                    {
                        spaceListing && spaceListing.list && spaceListing.list.listing && spaceListing.list.listing.map((data, key) => {
                            return <MenuItem value={data.id} key={key} >{data.type}</MenuItem>
                        })
                    }
                </Select>
            </Grid>
            <Grid md={3} item className="searchField seachTypeBox">
                <label>Space  Type</label>
                <Select className="select_box w-100" name="spacingId" multiple defaultValue={data.spacingId} renderValue={selected => (
                    <div>
                        {selected.map(value => (
                            spaceType && spaceType.data && spaceType.data.map((data, key) => {
                                if (value == data.spaceId)
                                    return <Chip key={value} label={data.listing_space && data.listing_space.type} />
                            })
                        ))}
                    </div>
                )}
                    onChange={props.onChange}>
                    {
                        spaceType && spaceType.data && spaceType.data.map((data, key) => {
                            return <MenuItem value={data.spaceId} key={key}>{data.listing_space && data.listing_space.type}</MenuItem>
                        })
                    }
                </Select>
            </Grid>
            <Grid className="d-flex justify-content-flex-end fillterBtnIc" md={2} item>
                <Button className="filter" onClick={props.filterOpen}><img className="mr-5" alt="" width="22px" src={filter} />Filter</Button>
            </Grid>
        </Grid>
        <SearchFilterForm {...props} />
    </form>
        {
            listLoader ?
                <div className="listLoader">
                    <CircularProgress />
                </div>
                :
                <Grid spacing={3} className="mt-25" container>
                    {searchsuccess && searchsuccess.getspace && searchsuccess.getspace.map((items, key) => {
                        return <Grid md={3} sm={6} xs={12} item key={key}>
                            <GridList items={items} {...props}/>
                        </Grid>
                    })}
                </Grid>
        }

    </>
}