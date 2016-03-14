import React from 'react';
import { connect } from 'react-redux';
import { startNoteListening } from '../../actions/notes';
import { hashHistory } from 'react-router';
import _ from 'lodash';
import AppBar from 'material-ui/lib/app-bar';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import NoteListItem from '../NoteListItem';
import Loading from '../loading';


class NoteList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.startNoteListening(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.startNoteListening();
  }

  handleClose = () => {
    hashHistory.push('/rooms/');
  }

  handleAddNote = () => {
    hashHistory.push('/addnote/' + this.props.params.id );
  }

  render() {

    let noteList = null;

    if ( ! this.props.app.loading ) {
      noteList = <div>No notes yet</div>;
    }

    if ( ! _.isEmpty( this.props.notes ) ) {
      noteList = _.map( this.props.notes, (value, key) => <NoteListItem key={key} {...value} />);
    }

    return (
      <div className="page">
        <AppBar title="Room name"
          className="header"
          iconElementLeft={<IconButton onClick={this.handleClose}><NavigationClose /></IconButton>}
          />

        <Loading />

        <div className="container">{ noteList }</div>

        <FloatingActionButton className="fab" onTouchTap={this.handleAddNote}>
          <ContentAdd />
        </FloatingActionButton>
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    notes: state.notes,
    app: state.app,
  };
}

export default connect(mapStateToProps, { startNoteListening })(NoteList);
