import axios from "axios";
import { FORM_ERROR } from "final-form";
import { ThunkAction } from "redux-thunk";
import { API_KEY } from "../../api/apiKey";
import {
  authDataType,
  FormAuthType,
  FormCallbackType,
} from "../../containers/Auth/Auth";
import { AppStateType } from "../reducers";

type AuthCreatorsTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type AuthThunkActionType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  AuthActionsTypes
>;

export type AuthActionsTypes = ReturnType<
  AuthCreatorsTypes<typeof authActions>
>;

export const authActions = {
  authSuccess: (token: string) =>
    ({
      type: "AUTH_SUCCESS",
      token,
    } as const),
  logout: () => {
    localStorage.removeItem("localId");
    localStorage.removeItem("idToken");
    localStorage.removeItem("expiresIn");
    return {
      type: "LOGOUT",
    } as const;
  },
};

export const auth = (
  authData: authDataType,
  submitType: string,
  callback: FormCallbackType,
  form: FormAuthType
): AuthThunkActionType => async (dispatch) => {
  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

  if (submitType === "signUp") {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
  }

  try {
    const response = await axios.post(url, authData);
    const data = response.data;
    dispatch(authActions.authSuccess(data.idToken));

    localStorage.setItem("localId", data.localId);
    localStorage.setItem("idToken", data.idToken);
    localStorage.setItem(
      "expiresIn",
      new Date(new Date().getTime() + data.expiresIn * 1000).toString()
    );
    dispatch(autoLogout(data.expiresIn * 1000));
  } catch (error) {
    callback({ [FORM_ERROR]: error.response.data.error.message });
    const timeout = window.setTimeout(() => {
      form.restart();
      window.clearTimeout(timeout);
    }, 1000);
  }
};

export const autoLogout = (time: number): AuthThunkActionType => async (
  dispatch
) => {
  console.log(time);

  window.setTimeout(() => {
    dispatch(authActions.logout());
  }, time);
};

export const autoLogin = (): AuthThunkActionType => async (dispatch) => {
  const token = localStorage.getItem("idToken");
  if (!token) {
    dispatch(authActions.logout());
  } else {
    const expirationDate = new Date(
      localStorage.getItem("expiresIn") as string
    );
    if (expirationDate <= new Date()) {
      dispatch(authActions.logout());
    } else {
      dispatch(authActions.authSuccess(token));
      dispatch(autoLogout(expirationDate.getTime() - new Date().getTime()));
    }
  }
};
