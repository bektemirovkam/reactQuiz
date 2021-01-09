import { ThunkAction } from "redux-thunk";
import axios from "../../api/axios";
import { QuizItemType } from "../../components/ActiveQuestion/ActiveQuestion";
import { QuizzesListItemType } from "../../containers/QuizzesListList/QuizesList";
import { AppStateType } from "../reducers";

type QuizCreatorsTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type QuizThunkActionType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  QuizActionsTypes
>;

export type QuizActionsTypes = ReturnType<
  QuizCreatorsTypes<typeof quizActions>
>;

export const quizActions = {
  fetchingCompleteSuccess: () =>
    ({
      type: "FETCHING_COMPLETE_SUCCESS",
    } as const),

  fetchingCompleteError: (error: any) =>
    ({
      type: "FETCHING_COMPLETE_ERROR",
      error,
    } as const),

  setQuizzes: (quizzes: Array<QuizzesListItemType>) =>
    ({
      type: "SET_QUIZZES",
      quizzes,
    } as const),
  setQuizItem: (quiz: Array<QuizItemType>) =>
    ({
      type: "SET_QUIZ_ITEM",
      quiz,
    } as const),
  setAnswer: (answer: "success" | "invalid", answerId: number) =>
    ({
      type: "SET_ANSWER",
      answer,
      answerId,
    } as const),
  setFinished: () =>
    ({
      type: "SET_FINISHED",
    } as const),
  getNextAnswer: () =>
    ({
      type: "GET_NEXT_ANSWER",
    } as const),
  retryQuiz: () =>
    ({
      type: "RETRY_QUIZ",
    } as const),
};

export const fetchingQuizzes = (): QuizThunkActionType => async (dispatch) => {
  try {
    const { data } = await axios.get("quizzes.json");
    const quizzes = [] as Array<QuizzesListItemType>;

    if (data) {
      Object.keys(data).forEach((quizId) => {
        const quiz = data[quizId] as QuizzesListItemType;
        quizzes.push({
          id: quizId,
          name: quiz.name,
        });
      });
      dispatch(quizActions.setQuizzes(quizzes));
    }
    dispatch(quizActions.fetchingCompleteSuccess());
  } catch (e) {
    dispatch(quizActions.fetchingCompleteError(e));
  }
};

export const fetchingQuizItem = (id: string): QuizThunkActionType => async (
  dispatch
) => {
  try {
    const { data } = await axios.get(`quizzes/${id}.json`);
    dispatch(quizActions.setQuizItem(data.quizzes));
    dispatch(quizActions.fetchingCompleteSuccess());
  } catch (e) {
    dispatch(quizActions.fetchingCompleteError(e));
  }
};
