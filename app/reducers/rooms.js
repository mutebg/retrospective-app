import { RECEIVE_ROOM } from '../constants';

const initState = {};

export default (state = initState, action) => {
  switch (action.type) {
    case RECEIVE_ROOM:
      if ( action.payload ) {
        return { ...action.payload };
      } else {
        return {};
      }

    default:
      return state;
  }
};
