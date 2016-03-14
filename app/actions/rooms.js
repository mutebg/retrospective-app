import { FIREBASE,
  ADD_ROOM, FETCH_ROOMS, RECEIVE_ROOM,
  START_LOADING, STOP_LOADING, DISPLAY_ERROR,
 } from '../constants';
import Firebase from "firebase";

let roomsRef = new Firebase( FIREBASE ).child('rooms');


export const startRoomListening = () => {
  return (dispatch) => {
    dispatch({type: START_LOADING});

    roomsRef.orderByKey().on('value', (snapshot) => {
      dispatch({type: STOP_LOADING});
			dispatch({
        type: RECEIVE_ROOM,
        payload: snapshot.val() });
		});
	};
};


export const stopRoomListening = () => {
  roomsRef.off('value');
  return {
    type: 'NONE'
  }
};


export const addRoom = (name) => {
  return (dispatch) => {
    dispatch({type: START_LOADING});

    let data = {
      name,
      user: 0,
      create_date: new Date().toString()
    };

    roomsRef.push(data, (error) => {
      dispatch({type: STOP_LOADING});

      if ( error ) {
        dispatch({
          type: DISPLAY_ERROR,
          payload: error
        })
      }
    });

	};
};
