import './index.scss';
import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { addNote } from '../../actions/notes';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';





class AddRoom extends React.Component {

  handleClose = () => {
    hashHistory.push('/room/' + this.props.params.id );
  }

  handleSave = (type) => {
    //alert('save...');
    let data = {
      message: this.refs.message.getValue(),
      roomID: this.props.params.id,
      type,
    };

    this.props.addNote(data);
    hashHistory.push('/room/' + this.props.params.id );
  }

  render() {
    return (<div className="page">
      <AppBar
        title="Add note"
        className="header"
        onLeftIconButtonTouchTap={this.handleClose}
        onRightIconButtonTouchTap={this.handleSave}
        iconElementLeft={<IconButton onClick={this.handleClose}><NavigationClose /></IconButton>}
        />

      <div className="container">
        <TextField
          hintText="Message Field"
          floatingLabelText="MultiLine and FloatingLabel"
          multiLine={true}
          fullWidth={true}
          ref="message"
          />

        <div className="button-footer">
            <RaisedButton
              label="Positive"
              primary={true}
              onClick={this.handleSave.bind(this, true)}
              icon={<FontIcon className="material-icons">mood</FontIcon>}
            />
            <RaisedButton
              label="Negative"
              secondary={true}
              onClick={this.handleSave.bind(this, false)}
              icon={<FontIcon className="material-icons">mood_bad</FontIcon>}
            />
        </div>
      </div>
    </div>);
  }
}


export default connect(null,  {addNote} )(AddRoom);
