import React from "react";
import styles from "./Backdrop.module.css";

interface PropsType {
  onClickHadler: (args?: any) => void | any;
}

const Backdrop: React.FC<PropsType> = ({ onClickHadler }) => {
  return <div className={styles.Backdrop} onClick={onClickHadler}></div>;
};

export default Backdrop;
