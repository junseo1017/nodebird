import {all, takeLatest, delay, put, fork} from 'redux-saga/effects';
import axios from 'axios';
import {ADD_POST_REQUEST, ADD_POST_FAILURE, ADD_POST_SUCCESS, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE} from '../reducers/post';

function addPostAPI(data) {
  return axios.post('/api/post', data);
}

function addCommnetAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addPost(action) {
  try {
    yield delay(1000); //
    yield put({type: ADD_POST_SUCCESS});
    // const result = yield call(addPostAPI, action.data);
    // yield put({type: 'ADD_POST_REQUEST', data: result.data});
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* addComment(action) {
  try {
    yield delay(1000);
    yield put({type: ADD_COMMENT_SUCCESS});
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
