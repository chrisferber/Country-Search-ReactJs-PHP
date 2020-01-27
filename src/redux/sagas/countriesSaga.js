import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on 'FETCH_USER_EVENTS' actions
function* fetchCountries() {
    try {
        yield console.log('fetchCountries function has been hit in countriesSaga.js');
    } catch (error) {
        console.log('error in countriesSaga.js, fetchCountries request failed with error,', error);
    }
}



function* countriesSaga() {
    yield takeLatest('SEARCH_COUNTRIES', fetchCountries);
}

export default countriesSaga;