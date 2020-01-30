import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
// import qs from "qs";


function* fetchCountries(action) {
    try {
        console.log('action.payload.searchInput=', action.payload.searchInput);
        const searchResults = yield axios.post ('http://localhost:5000/server/countries.php', action.payload.searchInput, {
            'Content-type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
        });
        yield console.log('searchResults for GET route in fetchCountries is', searchResults);
    } catch (error) {
        console.log('error in countriesSaga.js, fetchCountries request failed with error,', error);
    }
}

function* countriesSaga() {
    yield takeLatest('SEARCH_COUNTRIES', fetchCountries);
}

export default countriesSaga;