import React from "react";
import styles from "./Button.module.css";
import classnames from "classnames";

interface PropTypes {
  children: React.ReactNode;
  disabled?: boolean;
  color?: string;
  className?: string;
  type?: "button" | "reset";
  onClick?: (args?: any) => void | any;
}

const Button: React.FC<PropTypes> = ({
  children,
  disabled = false,
  color,
  className,
  onClick,
  type,
}) => {
  return (
    <button
      className={classnames(
        styles.Button,
        color ? styles[color] : "",
        className
      )}
      disabled={disabled}
      onClick={onClick}
      type={type ? type : "submit"}
    >
      {children}
    </button>
  );
};

export default Button;
