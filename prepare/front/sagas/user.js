import {all, takeLatest, delay, put, fork} from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_REQUEST,
} from '../reducers/user';

function logInAPI(data) {
  return axios.post('/api/login', data);
}

function logOutAPI(data) {
  return axios.post('/api/logout', data);
}

function signUpAPI(data) {
  return axios.post('/api/logout', data);
}

// logIn 요청을 할 때 데이터는 request를 보낼 때 LOGIN_REQUEST ACTION 자체가 action 매개변수로 전달됨.
// action.type, action.data 이런식으로 추출 할 수 있음.
// 아래와 같은 경우 logInAPI(action.data)와 같은 의미
// 인수 여러개인 경우 yield call(logInAPI, action.data,a,b,c)이런 형태로 넣을 수 있음.
function* logIn(action) {
  try {
    yield delay(1000); //
    // const result = yield call(logInAPI, action.data); // call 동기 함수 호출
    // put은 dispatch라고 생각하면 됨.
    yield put({type: LOG_IN_SUCCESS, data: action.data});
  } catch (err) {
    // effect 앞에 yield를 매번 붙여주는 이유는 테스트할 때 편하기 때문.
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function* logOut() {
  try {
    yield delay(1000); //
    yield put({type: LOG_OUT_SUCCESS});

    // const result = yield call(logOutAPI);
    // yield put({type: 'LOG_OUT_REQUEST', data: result.data});
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function* signUp() {
  try {
    // const result = yield call(signUpAPI)
    yield delay(1000);
    yield put({type: SIGN_UP_SUCCESS});
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

// saga에서는 asyncronous action creator가 직접 실행되지 않고, eventlistener같은 형태로 됨.
// login액션이 오면 login generator함수를 실행하도록 함.
function* watchLogin() {
  // while (true) {
  //   yield take('LOG_IN_REQUEST', logIn);
  // }
  // take: 'LOGIN'이라는 액션이 실행될 떄까지 기다린다는 의미. 동기적으로 작동
  // take는 1회성이기 때문에 무한반복문으로 적용할 수 있다.
  yield takeLatest(LOG_IN_REQUEST, logIn);
  // takeEvery는 비동기적으로 작동
  // whild take문을 대체할 수 있음.
  // takeLatest 연속해서 실행했을 때 마지막 요청만 실행됨. (앞서 실행한 작업이 완료되지 않았을 경우)
  // 정확한 개념은 프론트에서 연속해서 2번 요청을 보냈을 경우, 백엔드에서 2개의 응답 중 하나의 응답을 취소함. (요청이 아닌 응답을 취소하는 것. 서버에서 데이터가 두 번 저장됨. )
  // takeLeading 연속해서 실행했을 때 첫 번째 요청만 실행
  //
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
  // yield throttle('LOG_OUT_REQUEST', logOut,2000); // 요청이 2초동안 한번만 갈 수 있도록 제어 보통의 경우 takeLatest를 쓰고 백엔드에서 중복 데이터 필터링
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchSignUp)]);
}
