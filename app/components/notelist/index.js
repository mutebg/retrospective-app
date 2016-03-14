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
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Dialog from 'material-ui/lib/dialog';
import Loading from '../loading';
import FlatButton from 'material-ui/lib/flat-button';



class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open_dialog: false,
    };

    this.handleToggleDialog = this.handleToggleDialog.bind(this);
    let url = encodeURIComponent(window.location.href );
    this.QRsrc = `http://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data=${url}&qzone=0&margin=0&size=300x300&ecc=L`;
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

  handleToggleDialog() {
    this.setState({'open_dialog': ! this.state.open_dialog });
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
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="QR Code" onClick={ this.handleToggleDialog }/>
              <MenuItem primaryText="Edit room"/>
              <MenuItem primaryText="Delete room"/>
            </IconMenu>}
          />

        <Loading />

        <div className="container">{ noteList }</div>

        <FloatingActionButton className="fab" onTouchTap={this.handleAddNote}>
          <ContentAdd />
        </FloatingActionButton>

        <Dialog
            title="QR Code"
            actions={<FlatButton
              label="Cancel"
              secondary={true}
              onTouchTap={ this.handleToggleDialog }
            />}
            modal={false}
            open={this.state.open_dialog}
          >
          <img src={this.QRsrc} style={{width:'100%'}}/>
        </Dialog>
      </div>



    );

  }
}

function mapStateToProps(state) {
  return {
    notes: state.notes,
    app: state.app,
  };
}

export default connect(mapStateToProps, { startNoteListening })(NoteList);
