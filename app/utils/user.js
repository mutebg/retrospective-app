import Firebase from 'firebase';
import { FIREBASE } from '../constants';

class User {
  constructor() {
    this.fb = new Firebase( FIREBASE );
    this.user = this.fb.getAuth();
  }

  getUserData() {
    return this.user;
  }

  setUserData(user) {
    this.user = user;
  }
}

export default new User();
