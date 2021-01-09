import { QuizItemType } from "../../components/ActiveQuestion/ActiveQuestion";
import { SomeObjectType } from "../../containers/Quiz/Quiz";
import { QuizzesListItemType } from "../../containers/QuizzesListList/QuizesList";
import { QuizActionsTypes } from "../actions/quiz";

const initialState = {
  isLoading: true,
  quizzes: [] as Array<QuizzesListItemType>,
  error: null,
  activeQuestionNumber: 0,
  isFinished: false,
  results: {} as SomeObjectType,
  answerState: null as SomeObjectType | null,
  quiz: [] as Array<QuizItemType>,
};

type initStateType = typeof initialState;

const quizReducer = (
  state: initStateType = initialState,
  action: QuizActionsTypes
) => {
  switch (action.type) {
    case "SET_QUIZZES": {
      return {
        ...state,
        quizzes: action.quizzes,
      };
    }
    case "FETCHING_COMPLETE_SUCCESS": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "FETCHING_COMPLETE_ERROR": {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }
    case "SET_QUIZ_ITEM": {
      return {
        ...state,
        quiz: action.quiz,
      };
    }
    case "SET_ANSWER": {
      const newResults = { ...state.results };
      newResults[state.activeQuestionNumber] = action.answer;
      return {
        ...state,
        answerState: {
          [action.answerId]: action.answer,
        },
        results: newResults,
      };
    }
    case "SET_FINISHED": {
      return {
        ...state,
        isFinished: true,
      };
    }
    case "GET_NEXT_ANSWER": {
      return {
        ...state,
        activeQuestionNumber: state.activeQuestionNumber + 1,
        answerState: null,
      };
    }
    case "RETRY_QUIZ": {
      return {
        ...state,
        activeQuestionNumber: 0,
        isFinished: false,
        results: {},
        answerState: null,
      };
    }
    default:
      return state;
  }
};

export default quizReducer;
