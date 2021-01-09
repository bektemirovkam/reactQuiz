import React from "react";
import styles from "./AnswersList.module.css";
import AnswerItem from "./../AnswerItem/AnswerItem";
import { SomeObjectType } from "../../containers/Quiz/Quiz";

export interface AnswerType {
  option: string | number;
  id: number;
}

interface PropsType {
  answers: Array<AnswerType>;
  answerHandler: (answerId: number) => void;
  answerState: SomeObjectType | null;
}

const AnswersList: React.FC<PropsType> = ({
  answers,
  answerHandler,
  answerState,
}) => {
  return (
    <ul className={styles.AnswersList}>
      {answers.map((answer, index) => {
        return (
          <AnswerItem
            key={index}
            text={answer.option}
            answerHandler={answerHandler}
            id={answer.id}
            answerState={answerState}
          />
        );
      })}
    </ul>
  );
};

export default AnswersList;
