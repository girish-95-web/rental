import { VENUE_SETUP, GET_VENUE } from '../../constants/type'
export const venuesetup = (data) => ({
    type: VENUE_SETUP,
    data
})
export const getvenue = (data) => ({
    type: GET_VENUE,
    data
})