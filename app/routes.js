import React from 'react';
import { Route, IndexRoute } from 'react-router';

// components
import Base from './components/base';
import Rooms from './components/rooms';
import AddNote from './components/addnote';
import NoteList from './components/notelist';

export default (
  <Route path="/" component={Base}>
    <Route path="/rooms" component={Rooms} />
    <Route path="/addnote/:id" component={AddNote} />
    <Route path="/room/:id" component={NoteList} />
    <IndexRoute component={Rooms} />
  </Route>
);
