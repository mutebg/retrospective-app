import { FIREBASE,
  ADD_NOTE, MOVE_NOTE, FETCH_NOTES, RECEIVE_NOTE,
  START_LOADING, STOP_LOADING, DISPLAY_ERROR,
 } from '../constants';
import Firebase from "firebase";

let notesRef = new Firebase( FIREBASE ).child('notes');


export const startNoteListening = (roomID) => {
  notesRef = new Firebase( FIREBASE ).child('notes/' + roomID);

  return (dispatch) => {
    dispatch({type: START_LOADING});
    
		notesRef.on('value', (snapshot) => {
      dispatch({type: STOP_LOADING});
			dispatch({
        type: RECEIVE_NOTE,
        payload: snapshot.val()
      });
		});
	};
};


export const stopNoteListening = () => {
  notesRef.off('value');
  return {
    type: 'NONE'
  }
}


export const addNote = (params = {}) => {
  notesRef = new Firebase( FIREBASE ).child('notes/' + params.roomID);

  return (dispatch) => {
    dispatch({type: START_LOADING});

    let data = {
      create_date: new Date().toString(),
      ...params
    };

    notesRef.push(data, (error) => {
      dispatch({type: STOP_LOADING});

      if ( error ) {
        dispatch({
          type: DISPLAY_ERROR,
          payload: error
        });
      }
    });
	};
};
