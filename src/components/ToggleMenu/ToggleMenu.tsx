import classNames from "classnames";
import React from "react";
import { NavLink } from "react-router-dom";
import Backdrop from "../UI/Backdrop/Backdrop";
import styles from "./ToggleMenu.module.css";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/reducers";

type OwnPropType = {
  isVisible: boolean;
  closeMenu: () => void;
};

type MapStatePropsType = {
  isAuth: boolean;
};

type PropsType = OwnPropType & MapStatePropsType;

const ToggleMenu: React.FC<PropsType> = ({ isVisible, closeMenu, isAuth }) => {
  const onClickLinkHandler = () => {
    closeMenu();
  };
  const links = [
    {
      label: "Список тестов",
      to: "/",
      exact: true,
    },
  ];

  if (isAuth) {
    links.push(
      {
        label: "Создание теста",
        to: "/create",
        exact: true,
      },
      {
        label: "Выйти",
        to: "/logout",
        exact: false,
      }
    );
  } else {
    links.push({
      label: "Авторизация",
      to: "/auth",
      exact: false,
    });
  }

  return (
    <>
      <div
        className={classNames(styles.ToggleMenu, {
          [styles.active]: isVisible,
        })}
      >
        <nav>
          <ul className={styles.list}>
            {links.map((link, index) => {
              return (
                <li key={index + link.label} onClick={onClickLinkHandler}>
                  <NavLink
                    exact={link.exact}
                    className={styles.link}
                    to={link.to}
                    activeClassName={styles.active}
                  >
                    {link.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      {isVisible ? <Backdrop onClickHadler={onClickLinkHandler} /> : null}
    </>
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: !!state.auth.token,
  };
};

export default connect<MapStatePropsType, {}, OwnPropType, AppStateType>(
  mapStateToProps
)(ToggleMenu);
