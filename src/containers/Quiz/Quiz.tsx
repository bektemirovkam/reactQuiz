import React, { Dispatch } from "react";
import styles from "./Quiz.module.css";
import ActiveQuestion, {
  QuizItemType,
} from "../../components/ActiveQuestion/ActiveQuestion";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import { fetchingQuizItem } from "../../redux/actions/quiz";

import Loader from "react-loader-spinner";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/reducers";
import { quizActions } from "./../../redux/actions/quiz";

export interface SomeObjectType {
  [key: string]: "success" | "invalid";
}

type PathParamsType = {
  id: string;
};

type OwnPropsType = RouteComponentProps<PathParamsType> & {
  urlId: string;
};

type MapDispatchToPropsTypes = {
  fetchingQuizItem: (id: string) => void;
  setAnswer: (answer: "success" | "invalid", answerId: number) => void;
  setFinished: () => void;
  getNextAnswer: () => void;
  retryQuiz: () => void;
};

type mapStateToPropsType = {
  activeQuestionNumber: number;
  isFinished: boolean;
  quiz: Array<QuizItemType>;
  results: SomeObjectType;
  answerState: SomeObjectType | null;
  isLoading: boolean;
  error?: any;
};

type PropsType = OwnPropsType & MapDispatchToPropsTypes & mapStateToPropsType;

interface StateType {}

class Quiz extends React.Component<PropsType, StateType> {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchingQuizItem(id);
  }
  componentWillUnmount() {
    this.retryQuiz();
  }
  answerHandler = (answerId: number) => {
    if (this.props.answerState) {
      // Чтобы при двойном клике не перескакивали вопросы
      return;
    }
    const currentQuestion = this.props.quiz[this.props.activeQuestionNumber];
    if (currentQuestion.rightAnswerId === answerId) {
      this.props.setAnswer("success", answerId);
    } else {
      this.props.setAnswer("invalid", answerId);
    }
    const timeout = window.setTimeout(() => {
      if (this.isQuizFinished()) {
        this.props.setFinished();
      } else {
        this.props.getNextAnswer();
      }
      window.clearTimeout(timeout);
    }, 500);
  };

  isQuizFinished = () => {
    return this.props.activeQuestionNumber + 1 >= this.props.quiz.length;
  };

  retryQuiz = () => {
    this.props.retryQuiz();
  };

  render() {
    return (
      <div className={styles.Quiz}>
        {this.props.isLoading || this.props.quiz.length === 0 ? (
          <Loader
            type="Rings"
            color="#3d9152"
            className={styles.preloader}
            width={300}
            height={300}
          />
        ) : this.props.isFinished ? (
          <FinishedQuiz
            results={this.props.results}
            quiz={this.props.quiz}
            retryQuiz={this.retryQuiz}
          />
        ) : (
          <ActiveQuestion
            length={this.props.quiz.length}
            questionNumber={this.props.activeQuestionNumber + 1}
            activeQuestion={this.props.quiz[this.props.activeQuestionNumber]}
            answerHandler={this.answerHandler}
            answerState={this.props.answerState}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    isLoading: state.quiz.isLoading,
    error: state.quiz.error,
    activeQuestionNumber: state.quiz.activeQuestionNumber,
    isFinished: state.quiz.isFinished,
    results: state.quiz.results,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchingQuizItem: (id: string) => {
    dispatch(fetchingQuizItem(id));
  },
  setAnswer: (answer: "success" | "invalid", answerId: number) => {
    dispatch(quizActions.setAnswer(answer, answerId));
  },
  setFinished: () => {
    dispatch(quizActions.setFinished());
  },
  getNextAnswer: () => {
    dispatch(quizActions.getNextAnswer());
  },
  retryQuiz: () => {
    dispatch(quizActions.retryQuiz());
  },
});

export default connect<
  mapStateToPropsType,
  MapDispatchToPropsTypes,
  OwnPropsType,
  AppStateType
>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Quiz));
