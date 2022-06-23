//
import {all, call, fork, put, take, delay, debounce, throttle, takeLatest, takeMaybe} from 'redux-saga/effects';
import axios from 'axios';
function logInAPI() {
  return axios.post('/api/login', data);
}

function logOutAPI(data) {
  return axios.post('/api/logout', data);
}

// logIn 요청을 할 때 데이터는 request를 보낼 때 LOGIN_REQUEST ACTION 자체가 action 매개변수로 전달됨.
// action.type, action.data 이런식으로 추출 할 수 있음.
// 아래와 같은 경우 logInAPI(action.data)와 같은 의미
// 인수 여러개인 경우 yield call(logInAPI, action.data,a,b,c)이런 형태로 넣을 수 있음.
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data); // call 동기 함수 호출
    // put은 dispatch라고 생각하면 됨.
    yield put({type: 'LOG_IN_REQUEST', data: result.data});
  } catch (err) {
    // effect 앞에 yield를 매번 붙여주는 이유는 테스트할 때 편하기 때문.
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('/api/logout');
}

function* logOut(action) {
  try {
    const result = yield call(logOutAPI);
    yield put({type: 'LOG_OUT_REQUEST', data: result.data});
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/api/post', data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({type: 'ADD_POST_REQUEST', data: result.data});
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data,
    });
  }
}

// saga에서는 asyncronous action creator가 직접 실행되지 않고, eventlistener같은 형태로 됨.
// login액션이 오면 login generator함수를 실행하도록 함.
function* watchLogin() {
  yield take('LOG_IN_REQUEST', logIn); // take: 'LOG_IN'이라는 액션이 실행될 떄까지 기다린다는 의미.
}

function* watchLogout() {
  yield take('LOG_OUT_REQUEST', logOut);
}

function* watchAddPost() {
  yield take('ADD_POST_REQUEST', addPost);
}
// rootSaga에 비동기 액션을 하나씩 넣어줌.
export default function* rootSaga() {
  // all은 배열 내부의 함수를 한번에 실행함.
  // fork 함수를 실행한다는 의미.
  // 유사한 메서드로 call도 있음.(fork와의 차이점 있음)
  yield all([fork(watchLogin), fork(watchLogout), fork(watchAddPost)]);
}

//call, fork의 차이
// fork는 비동기 함수 호출
// call은 동기 함수 호출
