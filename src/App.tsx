import React, { Dispatch } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import styles from "./App.module.css";
import Quiz from "./containers/Quiz/Quiz";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizzesList from "./containers/QuizzesListList/QuizesList";
import { AppStateType } from "./redux/reducers";
import { connect } from "react-redux";
import Logout from "./components/Logout/Logout";
import { autoLogin } from "./redux/actions/auth";

type OwnPropsType = {};
type StateType = {};
type MapStatePropsType = {
  isAuth: boolean;
};
type MapDispatchToPropsType = {
  autoLogin: () => void;
};

type PropsType = OwnPropsType & MapStatePropsType & MapDispatchToPropsType;

class App extends React.Component<PropsType, StateType> {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" exact component={QuizzesList} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/create" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" exact component={QuizzesList} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return <div className={styles.App}>{routes}</div>;
  }
}
const mapStateToProps = (state: AppStateType) => ({
  isAuth: !!state.auth.token,
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  autoLogin: () => dispatch(autoLogin()),
});

export default connect<
  MapStatePropsType,
  MapDispatchToPropsType,
  OwnPropsType,
  AppStateType
>(
  mapStateToProps,
  mapDispatchToProps
)(App);
