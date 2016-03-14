import {
  START_LOADING,
  STOP_LOADING,
  DISPLAY_ERROR,
  USER_LOGIN,
  USER_LOGOUT
} from '../constants';
import User from '../utils/user.js';

const initState = {
  loading: false,
  error: '',
  is_login: User.getUserData() ? true : false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true};

    case STOP_LOADING:
      return { ...state, loading: false};

    case DISPLAY_ERROR:
      return { ...state, error: action.payload };

    case USER_LOGOUT:
      return { ...state, is_login: false};

    case USER_LOGIN:
      return { ...state, is_login: true };


    default:
      return state;
  }
};
