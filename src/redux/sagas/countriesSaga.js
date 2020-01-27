import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on 'FETCH_USER_EVENTS' actions
function* fetchCountries(action) {
    try {
        const searchResults = yield axios.post(`http://localhost:5000/server/countries.php`, action.payload.searchInput);
        yield console.log('searchResults for GET route in fetchCountries is', searchResults);
    } catch (error) {
        console.log('error in countriesSaga.js, fetchCountries request failed with error,', error);
    }
}



function* countriesSaga() {
    yield takeLatest('SEARCH_COUNTRIES', fetchCountries);
}

export default countriesSaga;