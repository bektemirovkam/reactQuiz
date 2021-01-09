import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./QuizzesList.module.css";
import Loader from "react-loader-spinner";
import { fetchingQuizzes } from "../../redux/actions/quiz";

export interface QuizzesListItemType {
  id: string;
  name: string;
}

interface PropsType {
  quizzes: Array<QuizzesListItemType>;
  isLoading: boolean;
  fetchingQuizzes: any;
}

interface StateType {}

class QuizzesList extends React.Component<PropsType, StateType> {
  componentDidMount() {
    this.props.fetchingQuizzes();
  }

  render() {
    return (
      <div className={styles.QuizzesList}>
        <div className={styles.wrapper}>
          <h2>Список тестов :</h2>
          {this.props.isLoading || !this.props.quizzes ? (
            <Loader type="Rings" color="#00BFFF" className={styles.preloader} />
          ) : (
            <ul className={styles.list}>
              {this.props.quizzes.map((quiz, index) => {
                return (
                  <li key={`${index}__${quiz.id}`}>
                    <strong>{`${index + 1}. `}</strong>
                    <Link
                      to={`/quiz/${quiz.id}`}
                      className={styles.link}
                    >{`${quiz.name}`}</Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.quiz.isLoading,
    quizzes: state.quiz.quizzes,
  };
};

export default connect(mapStateToProps, {
  fetchingQuizzes,
})(QuizzesList);
