import React from "react";
import style from "./Input.module.css";

interface PropTypes {
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<PropTypes> = ({ type, onChange }) => {
  return (
    <div className={style.Input}>
      <input type={type ? type : "text"} onChange={onChange} />
    </div>
  );
};

export default Input;
