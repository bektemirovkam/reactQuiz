import React, { Dispatch } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authActions } from "./../../redux/actions/auth";
import { AppStateType } from "../../redux/reducers";

type MapDispatchToPropsType = {
  logout: () => void;
};

class Logout extends React.Component<MapDispatchToPropsType, {}> {
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    logout: () => dispatch(authActions.logout()),
  };
};

export default connect<{}, MapDispatchToPropsType, {}, AppStateType>(
  null,
  mapDispatchToProps
)(Logout);
