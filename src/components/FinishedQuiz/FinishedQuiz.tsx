import React from "react";
import Button from "../UI/Button/Button";
import styles from "./FinishedQuiz.module.css";
import classnames from "classnames";
import { QuizItemType } from "../ActiveQuestion/ActiveQuestion";
import { Link } from "react-router-dom";

interface PropTypes {
  results: {
    [key: string]: "success" | "invalid";
  };
  quiz: Array<QuizItemType>;
  retryQuiz: () => void;
}

const FinishedQuiz: React.FC<PropTypes> = ({ results, quiz, retryQuiz }) => {
  const correctAnswers = Object.keys(results).reduce(
    (total: number, result: string) => {
      if (results[result] === "success") {
        return ++total;
      } else {
        return total;
      }
    },
    0
  );

  const onStartOver = () => {
    retryQuiz();
  };

  return (
    <div className={styles.FinishedQuiz}>
      <h2>Ваш результат</h2>
      <ul>
        {Object.keys(results).map((result, index) => {
          return (
            <li key={index + result}>
              <strong>{index + 1}.</strong>
              <span
                className={classnames(styles.question, styles[results[result]])}
              >
                {quiz[+result].question}
              </span>
            </li>
          );
        })}
      </ul>
      <p>
        Правильно {correctAnswers} из {quiz.length}
      </p>
      <div className={styles.footer}>
        <Button
          color="success"
          className={styles.btn}
          onClick={onStartOver}
          type="button"
        >
          Начать сначала
        </Button>
        <Link to="/" className={styles.link}>
          <Button color="primary" className={styles.btn}>
            Перейти к списку тестов
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
