import { ThunkAction } from "redux-thunk";
import axios from "../../api/axios";
import { QuizItemType } from "../../components/ActiveQuestion/ActiveQuestion";
import { AppStateType } from "../reducers";

type QuizCreateCreatorsTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;

export type QuizThunkActionType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  QuizCreateActionsTypes
>;

export type QuizCreateActionsTypes = ReturnType<
  QuizCreateCreatorsTypes<typeof quizCreatorActions>
>;

export const quizCreatorActions = {
  addQuestion: (newQuizItem: QuizItemType) =>
    ({
      type: "ADD_QUESTION",
      newQuizItem,
    } as const),
  createQuizName: (name: string) =>
    ({
      type: "CREATE_QUIZ_NAME",
      name,
    } as const),
  creatingQuiz: (value: boolean) =>
    ({
      type: "CREATING_QUIZ",
      value,
    } as const),
  clearQuiz: () =>
    ({
      type: "CLEAR_QUIZ",
    } as const),
  fetchingCompleteError: (error: any) =>
    ({
      type: "FETCHING_COMPLETE_ERROR",
      error,
    } as const),
};

export const createNewQuiz = (
  quiz: Array<QuizItemType>,
  name: string
): QuizThunkActionType => async (dispatch) => {
  try {
    dispatch(quizCreatorActions.creatingQuiz(true));
    await axios.post("quizzes.json", {
      quizzes: quiz,
      name: name,
    });
    dispatch(quizCreatorActions.creatingQuiz(false));
    dispatch(quizCreatorActions.clearQuiz());
  } catch (e) {
    dispatch(quizCreatorActions.fetchingCompleteError(e));
  }
};
