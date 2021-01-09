import { QuizItemType } from "../../components/ActiveQuestion/ActiveQuestion";
import { QuizCreateActionsTypes } from "../actions/quizCreate";

const initialState = {
  quiz: [] as Array<QuizItemType>,
  creatingQuiz: false,
  name: "",
};

type initStateType = typeof initialState;

const createQuizReducer = (
  state: initStateType = initialState,
  action: QuizCreateActionsTypes
) => {
  switch (action.type) {
    case "ADD_QUESTION": {
      const newQuiz = state.quiz.concat();
      newQuiz.push(action.newQuizItem);
      return {
        ...state,
        quiz: newQuiz,
      };
    }
    case "CREATE_QUIZ_NAME": {
      return {
        ...state,
        name: action.name,
      };
    }
    case "CREATING_QUIZ": {
      return {
        ...state,
        creatingQuiz: action.value,
      };
    }
    case "CLEAR_QUIZ": {
      return {
        ...state,
        quiz: [],
        name: "",
      };
    }
    default:
      return state;
  }
};

export default createQuizReducer;
