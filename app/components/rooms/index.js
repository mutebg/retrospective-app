import './index.scss';
import React from 'react';
import { connect } from 'react-redux';
import { startRoomListening, stopRoomListening, addRoom } from '../../actions/rooms';
import { logout } from '../../actions/user';
import _ from 'lodash';
import {hashHistory} from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import FileFolder from 'material-ui/lib/svg-icons/file/folder';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import Loading from '../loading';



class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open_dialog: false,
    };
  }

  componentWillMount() {
    this.props.startRoomListening();
  }

  componentWillUnmount() {
    this.props.stopRoomListening();
  }

  handleOpen = () => {
    this.setState({open_dialog: true});
  }

  handleClose = () => {
    this.setState({open_dialog: false});
  }

  handleSave = () => {
    let name = this.refs.name.getValue();
    if ( name && name.length > 1 ) {
      this.props.addRoom(name);
      this.handleClose();
    }
  }

  handleClickItem = (key) => {
    hashHistory.push('/room/' + key );
  }

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        onTouchTap={this.handleSave}
      />,
    ];

    let listItems = null;

    if ( ! this.props.app.loading ) {
      let listItems = <div>No rooms</div>;
    }

    if ( ! _.isEmpty( this.props.rooms ) ) {
      listItems = _.map( this.props.rooms, (value, key) => {
        return <ListItem
          primaryText={value.name}
          secondaryText={value.create_date}
          key={key}
          leftAvatar={<Avatar icon={<FileFolder />} />}
          onTouchTap={ this.handleClickItem.bind(this, key) }
      />
      });
    }


    return (
      <div className="page">
        <AppBar
          title="Room list"
          showMenuIconButton={false}
          className="header"
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" onClick={this.props.logout} />
            </IconMenu>}
        />

        <Loading />

        <div className="container">
          <List>{ listItems }</List>
        </div>

        <FloatingActionButton className="fab" onTouchTap={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>

        <Dialog
            title="Add room"
            actions={actions}
            modal={false}
            open={this.state.open_dialog}
            onRequestClose={this.handleClose}
          >
          <TextField ref="name" fullWidth={true} hintText="Name of the room" />
        </Dialog>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    rooms: state.rooms,
    app: state.app,
  };
}

export default connect(mapStateToProps, {startRoomListening, stopRoomListening, addRoom, logout})(Rooms);
