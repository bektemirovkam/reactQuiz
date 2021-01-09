import { combineReducers } from "redux";
import createQuizReducer from "./createQuizReducer";
import quizReducer from "./quizReducer";
import { authReducer } from "./authReducer";

const rootReducer = combineReducers({
  quiz: quizReducer,
  quizCreate: createQuizReducer,
  auth: authReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
