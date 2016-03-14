import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import ThemeManager from 'material-ui/lib/styles/getMuiTheme';


class NoteListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let { message, type } = this.props;

    let style = {};
    style.backgroundColor = type ? '#ff4081': '#00bcd4';

    return (
      <Card style={style}>
        <CardHeader
          subtitle="developer2"
          avatar="http://lorempixel.com/100/100/nature/"
        />
        <CardText>{ message }</CardText>
      </Card>);
  }
}

export default NoteListItem;
