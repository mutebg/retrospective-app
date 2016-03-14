import { RECEIVE_NOTE } from '../constants';

const initState = [];

export default (state = initState, action) => {
  switch (action.type) {
    case RECEIVE_NOTE:
      if ( action.payload ) {
        return { ...action.payload };
      } else {
        return {};
      }

    default:
      return state;
  }
};
