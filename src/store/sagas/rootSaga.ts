import { all } from 'redux-saga/effects';

const sagas: any[] = [];

function* rootSaga() {
    console.log('root saga');
    yield all(sagas);
}

export default rootSaga;
