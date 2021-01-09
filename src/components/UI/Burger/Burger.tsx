import React from "react";
import styles from "./Burger.module.css";
import classNames from "classnames";

interface PropTypes {
  isVisible: boolean;
  handleClick: () => void;
}

const Burger: React.FC<PropTypes> = ({ isVisible, handleClick }) => {
  return (
    <div
      className={classNames(styles.Burger, { [styles.active]: isVisible })}
      onClick={handleClick}
    >
      <span></span>
    </div>
  );
};

export default Burger;
