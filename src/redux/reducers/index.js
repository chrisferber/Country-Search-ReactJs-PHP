import { combineReducers } from 'redux';
import currentCountries from './currectCountriesReducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// use combineReducers redux higher order component to make rootReducer, rootReducer will be imported into /src root index.js
const rootReducer = combineReducers({
    currentCountries,
});

export default rootReducer;