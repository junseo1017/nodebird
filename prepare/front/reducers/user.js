export const initialState = {isLoggingIn: false, isLoggingOut: false, isLoggedIn: false, me: null, signUpData: {}, loginData: {}};

export const loginRequestAction = (data) => {
  return {
    type: 'LOG_IN_REQUEST',
    data,
  };
};

export const logoutRequestAction = () => {
  return {
    type: 'LOG_OUT_REQUEST',
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN_QUEST':
      return {
        ...state,
        isLoggingIn: true,
      };

    case 'LOG_IN_SUCCESS':
      console.log('hi');

      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: {...action.data, nickname: 'jsking'},
      };

    case 'LOG_IN_FAILURE':
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
      };

    case 'LOG_OUT_REQUEST':
      return {
        ...state,
        isLoggingOut: true,
      };

    case 'LOG_OUT_SUCCESS':
      return {
        ...state,
        isLoggedIn: false,
        isLoggingOut: false,
        me: null,
      };

    case 'LOG_OUT_FAILURE':
      return {
        ...state,
        isLoggingOut: false,
      };
    default:
      return state;
  }
};

export default reducer;
