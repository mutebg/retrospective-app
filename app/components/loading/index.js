import './index.scss';
import React from 'react';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/lib/linear-progress';


class Loading extends React.Component{

  render() {
    if ( this.props.app.loading ) {
      return <LinearProgress className="load-bar" mode="indeterminate"/>;
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default connect(mapStateToProps, null)(Loading);
