import React, { Dispatch } from "react";
import { Field, Form } from "react-final-form";
import { FormApi, SubmissionErrors } from "final-form";
import Button from "../../components/UI/Button/Button";
import styles from "./Auth.module.css";

import {
  composeValidators,
  validateEmail,
  required,
  minLength,
} from "../../validators/validators";
import { connect } from "react-redux";
import { auth } from "../../redux/actions/auth";
import { AppStateType } from "../../redux/reducers";

type mapDispatchToPropsType = {
  auth: (
    authData: authDataType,
    submitType: string,
    callback: FormCallbackType,
    form: FormAuthType
  ) => void;
};

type PropsType = mapDispatchToPropsType;

interface StateType {}

interface FormValuesType {
  email: string;
  password: string;
  submitType: "signIn" | "signUp";
}
export interface authDataType {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export type FormCallbackType = (
  errors?: SubmissionErrors
) =>
  | SubmissionErrors
  | Promise<SubmissionErrors | undefined>
  | undefined
  | void;
export type FormAuthType = FormApi<FormValuesType>;

class Auth extends React.Component<PropsType, StateType> {
  onSubmit = async (
    values: FormValuesType,
    form: any,
    callback?: FormCallbackType
  ) => {
    const authData: authDataType = {
      email: values.email,
      password: values.password,
      returnSecureToken: true,
    };
    if (!callback) {
      callback = (error) => {
        console.log(error);
      };
    }
    this.props.auth(authData, values.submitType, callback, form);
  };

  render() {
    return (
      <div className={styles.Auth}>
        <div className={styles.wrapper}>
          <Form
            onSubmit={this.onSubmit}
            render={({
              submitError,
              handleSubmit,
              submitting,
              pristine,
              valid,
              form,
            }) => (
              <form onSubmit={handleSubmit} className={styles.form}>
                {submitError && (
                  <div className={styles.submitError}>{submitError}</div>
                )}
                <Field
                  name="email"
                  validate={composeValidators(required, validateEmail)}
                >
                  {({ input, meta }) => (
                    <div className={styles.input}>
                      <label>Email</label>
                      <input
                        autoComplete="off"
                        type="text"
                        {...input}
                        placeholder="Введите email"
                      />
                      {meta.touched && meta.error && (
                        <span className={styles.error}>{meta.error}</span>
                      )}
                    </div>
                  )}
                </Field>
                <Field
                  name="password"
                  validate={composeValidators(minLength(6), required)}
                >
                  {({ input, meta }) => (
                    <div className={styles.input}>
                      <label>Пароль</label>
                      <input
                        autoComplete="off"
                        type="password"
                        {...input}
                        placeholder="Введите пароль"
                      />
                      {meta.touched && meta.error && (
                        <span className={styles.error}>{meta.error}</span>
                      )}
                    </div>
                  )}
                </Field>
                <div className={styles.footer}>
                  <Button
                    color="success"
                    disabled={submitting || pristine || !valid}
                    onClick={() => {
                      form.change("submitType", "signIn");
                    }}
                  >
                    Войти
                  </Button>
                  <Button
                    color="primary"
                    disabled={submitting || pristine || !valid}
                    onClick={() => {
                      form.change("submitType", "signUp");
                    }}
                  >
                    Регистрация
                  </Button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  auth: (
    authData: authDataType,
    submitType: string,
    callback: FormCallbackType,
    form: FormAuthType
  ) => {
    dispatch(auth(authData, submitType, callback, form));
  },
});

export default connect<
  StateType,
  mapDispatchToPropsType,
  PropsType,
  AppStateType
>(
  null,
  mapDispatchToProps
)(Auth);
