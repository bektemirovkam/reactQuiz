import React from "react";
import { SomeObjectType } from "../../containers/Quiz/Quiz";
import AnswersList, { AnswerType } from "../AnswersList/AnswersList";
import styles from "./ActiveQuestion.module.css";

export interface QuizItemType {
  question: string;
  rightAnswerId: number;
  answers: Array<AnswerType>;
}

interface PropsType {
  length: number;
  questionNumber: number;
  activeQuestion: QuizItemType;
  answerHandler: (answerId: number) => void;
  answerState: SomeObjectType | null;
}

const ActiveQuestion: React.FC<PropsType> = ({
  questionNumber,
  length,
  activeQuestion,
  answerHandler,
  answerState,
}) => {
  return (
    <div className={styles.ActiveQuestion}>
      <h2>Выберите правильный ответ</h2>
      <div className={styles.header}>
        <div className={styles.question}>
          <strong>{questionNumber}.</strong> {activeQuestion.question}
        </div>
        <div className={styles.counter}>
          <strong>{questionNumber}</strong> из {length}
        </div>
      </div>
      <AnswersList
        answers={activeQuestion.answers}
        answerHandler={answerHandler}
        answerState={answerState}
      />
    </div>
  );
};

export default ActiveQuestion;
