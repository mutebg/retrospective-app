import './index.scss';
import React from 'react';
import { connect } from 'react-redux';
import { startAuthLIstening, login } from '../../actions/user';



class Base extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.startAuthLIstening();
    if ( ! this.props.app.is_login ) {
      this.props.login();
    }
  }

  componentWillUnmount() {

  }

  render() {
    if ( this.props.app.is_login ) {
      return <div className="base">{ this.props.children }</div>;
    } else {
      return <div className="base">You need to login</div>
    }
  }
}

Base.propTypes = {
  children: React.PropTypes.element,
};

function mapStateToProps(state) {
  return {
    app: state.app
  };
}

export default connect(mapStateToProps, { login, startAuthLIstening })(Base);
