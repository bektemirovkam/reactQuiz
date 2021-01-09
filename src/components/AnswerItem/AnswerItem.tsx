import React from "react";
import { SomeObjectType } from "../../containers/Quiz/Quiz";
import styles from "./AnswerItem.module.css";
import classnames from "classnames";

interface PropsType {
  text: string | number;
  answerHandler: (answerId: number) => void;
  id: number;
  answerState: SomeObjectType | null;
}

const AnswerItem: React.FC<PropsType> = ({
  text,
  answerHandler,
  id,
  answerState,
}) => {
  const onItemClick = () => {
    answerHandler(id);
  };
  return (
    <li
      className={classnames(
        styles.AnswerItem,
        answerState ? styles[answerState[id]] : ""
      )}
      onClick={onItemClick}
    >
      {text}
    </li>
  );
};

export default AnswerItem;
