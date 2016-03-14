import { FIREBASE, DISPLAY_ERROR, USER_LOGIN, USER_LOGOUT } from '../constants';
import Firebase from "firebase";
import User from '../utils/user';

let userRef = new Firebase( FIREBASE );


export const startAuthLIstening = () => {
  return (dispatch) => {
    userRef.onAuth( userData => {
      User.setUserData(userData);
      dispatch({ type: USER_LOGIN });
    });
  }
}


export const login = () => {
  return (dispatch) => {
			userRef.authWithOAuthPopup('google', (error) => {
				if (error) {
					dispatch({
            type: DISPLAY_ERROR,
            payload: 'Login failed! ' + error
          });
					dispatch({
            type: USER_LOGOUT
          });
				}
			});
  }
};


export const logout = () => {
  userRef.unauth();
  return {
    type: USER_LOGOUT
  }
};
