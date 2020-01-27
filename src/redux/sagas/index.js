import { all } from 'redux-saga/effects';
import countriesSaga from './countriesSaga';

// combines all sagas into a single rootSaga, rootSaga imports into /src root index.js
export default function* rootSaga() {
  yield all([
    countriesSaga(),
  ]);
}