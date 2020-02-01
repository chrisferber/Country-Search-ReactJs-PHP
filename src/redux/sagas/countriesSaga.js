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
        let countries = searchResults.data;

        countries = countries.substring(1);
        countries = countries.substring(0, countries.length - 1);

        console.log('here is variable countries: ', countries);

        let countriesSearch = JSON.parse(countries);

        console.log('here is countriesSearch: ', countriesSearch);

        yield put({ type: 'SET_COUNTRIES', payload: countriesSearch });
    } catch (error) {
        console.log('error in countriesSaga.js, fetchCountries request failed with error,', error);
    }
}

function* countriesSaga() {
    yield takeLatest('SEARCH_COUNTRIES', fetchCountries);
}

export default countriesSaga;