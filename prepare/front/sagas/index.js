import {all, fork, put, delay, takeLatest} from 'redux-saga/effects';
import postSaga from './post';
import userSaga from './user';

// rootSaga에 비동기 액션을 하나씩 넣어줌.
export default function* rootSaga() {
  // all은 배열 내부의 함수를 한번에 실행함.
  // fork 함수를 실행한다는 의미.
  // 유사한 메서드로 call도 있음.(fork와의 차이점 있음)
  yield all([fork(postSaga), fork(userSaga)]);
}

//call, fork의 차이
// fork는 비동기 함수 호출
// call은 동기 함수 호출
