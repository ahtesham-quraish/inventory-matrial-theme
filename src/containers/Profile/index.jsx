import React from 'react';
import { connect } from 'react-redux';
import UserProfile from '../../views/UserProfile/UserProfile.jsx';

class ProfileDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <UserProfile />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state,
  };
};

export default connect(
  mapStateToProps,
  null,
)(ProfileDetailContainer);
