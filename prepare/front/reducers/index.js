import {HYDRATE} from 'next-redux-wrapper';
import user from './user';
import post from './post';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE: // ssr을 위해 추가함.
        return {...state, ...action.payload};
      default:
        return state;
    }
  },
  user, // user initial state임
  post,
});
export default rootReducer;
