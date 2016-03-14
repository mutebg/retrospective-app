import { combineReducers } from 'redux';
import notes from './notes';
import rooms from './rooms';
import app from './app';

const root = combineReducers({
  notes,
  rooms,
  app
});

export default root;
