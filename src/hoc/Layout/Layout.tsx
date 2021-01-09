import React, { Component } from "react";
import Burger from "../../components/UI/Burger/Burger";
import ToggleMenu from "../../components/ToggleMenu/ToggleMenu";
import styles from "./Layout.module.css";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/reducers";

type OwnPropsType = {
  children: React.ReactNode;
};

type MapStatePropsType = {
  isAuth: boolean;
};

type StateType = {
  menuVisible: boolean;
};

type PropsType = OwnPropsType & MapStatePropsType;

class Layout extends Component<PropsType, StateType> {
  state = {
    menuVisible: false,
  };

  onToggleMenu = () => {
    this.setState({
      menuVisible: !this.state.menuVisible,
    });
  };

  onMenuClose = () => {
    this.setState({
      menuVisible: false,
    });
  };

  render() {
    return (
      <div className={styles.Layout}>
        <Burger
          isVisible={this.state.menuVisible}
          handleClick={this.onToggleMenu}
        />

        <ToggleMenu
          isVisible={this.state.menuVisible}
          closeMenu={this.onMenuClose}
        />
        <main>{this.props.children}</main>
        {!this.props.isAuth && (
          <span className={styles.prompt}>
            Чтобы создавать свои тесты, залогиньтесь!
          </span>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  isAuth: !!state.auth.token,
});

export default connect<MapStatePropsType, {}, OwnPropsType, AppStateType>(
  mapStateToProps
)(Layout);
