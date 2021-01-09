import React from "react";
import { Field, Form } from "react-final-form";

import { required } from "../../validators/validators";
import styles from "./QuizCreator.module.css";
import Button from "../../components/UI/Button/Button";
import { QuizItemType } from "./../../components/ActiveQuestion/ActiveQuestion";
import { FORM_ERROR } from "final-form";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/reducers";
import {
  quizCreatorActions,
  createNewQuiz,
} from "../../redux/actions/quizCreate";

interface QwnPropsType {}

interface StateType {}

type MapStatePropsType = {
  creatingQuiz: boolean;
  name: string;
  quiz: Array<QuizItemType>;
};

type MapDispatchPropsType = {
  addQuestion: (newQuestion: QuizItemType) => void;
  createQuizName: (name: string) => void;
  createNewQuiz: (quiz: Array<QuizItemType>, name: string) => void;
  clearQuiz: () => void;
};

type PropsType = QwnPropsType & MapStatePropsType & MapDispatchPropsType;

interface SubmitValuesType {
  name: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  question: string;
  rightAnswer: number;
}

interface NameSubmitValuesType {
  name: string;
}

class QuizCreator extends React.Component<PropsType, StateType> {
  componentWillUnmount() {
    this.props.clearQuiz();
  }

  addQuestion = (values: SubmitValuesType) => {
    const newQuizItem = {
      question: values.question,
      rightAnswerId: +values.rightAnswer,
      answers: [
        { option: values.option1, id: 1 },
        { option: values.option2, id: 2 },
        { option: values.option3, id: 3 },
        { option: values.option4, id: 4 },
      ],
    };
    this.props.addQuestion(newQuizItem);
  };

  createQuiz = () => {
    this.props.createNewQuiz(this.props.quiz, this.props.name);
  };

  onSubmit = async (values: SubmitValuesType, form: any, callback: any) => {
    try {
      this.addQuestion(values);
    } catch (error) {
      callback({ [FORM_ERROR]: "Произошла ошибка при создании вопроса" });
      console.log(error);
    }
  };

  onQuizNameSubmit = (values: NameSubmitValuesType) => {
    this.props.createQuizName(values.name);
  };

  render() {
    return (
      <div className={styles.QuizCreator}>
        <div className={styles.wrapper}>
          <h2>
            {this.props.creatingQuiz
              ? "Идет создание теста ..."
              : "Заполните все поля"}
          </h2>
          {this.props.creatingQuiz ? (
            <Loader
              type="Rings"
              color="#3d9152"
              className={styles.preloader}
              width={300}
              height={300}
            />
          ) : this.props.name === "" ? (
            <Form
              onSubmit={this.onQuizNameSubmit}
              render={({ handleSubmit, submitting, pristine, valid }) => (
                <form onSubmit={handleSubmit}>
                  <Field name="name" validate={required}>
                    {({ input, meta }) => (
                      <div
                        className={styles.input}
                        style={{ marginBottom: "20px" }}
                      >
                        <label>Название теста</label>
                        <input
                          autoComplete="off"
                          type="text"
                          {...input}
                          placeholder="Введите название вопроса"
                        />
                        {meta.touched && meta.error && (
                          <span className={styles.error}>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Button
                    color="success"
                    disabled={submitting || pristine || !valid}
                  >
                    Готово
                  </Button>
                </form>
              )}
            />
          ) : (
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
                <form
                  onSubmit={(event) => {
                    handleSubmit(event)?.then(form.restart);
                  }}
                  className={styles.form}
                >
                  {submitError && (
                    <div className={styles.submitError}>{submitError}</div>
                  )}
                  <Field name="question" validate={required}>
                    {({ input, meta }) => (
                      <div className={styles.input}>
                        <label>Текст вопроса</label>
                        <input
                          autoComplete="off"
                          type="text"
                          {...input}
                          placeholder="Введите текст вопроса"
                        />
                        {meta.touched && meta.error && (
                          <span className={styles.error}>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <h3>Варианты ответов :</h3>
                  {[1, 2, 3, 4].map((numberAnswer, index) => {
                    return (
                      <Field
                        name={`option${numberAnswer}`}
                        validate={required}
                        key={numberAnswer + index}
                      >
                        {({ input, meta }) => (
                          <div className={styles.input}>
                            <label>{`Вариант №${numberAnswer}`}</label>
                            <input
                              autoComplete="off"
                              type="text"
                              {...input}
                              placeholder="Введите вариант ответа"
                            />
                            {meta.touched && meta.error && (
                              <span className={styles.error}>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    );
                  })}
                  <h3>Выберите номер правильного ответа :</h3>
                  <Field
                    name="rightAnswer"
                    component="select"
                    className={styles.select}
                    validate={required}
                  >
                    <option></option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </Field>
                  <div className={styles.footer}>
                    <Button
                      color="success"
                      disabled={submitting || pristine || !valid}
                    >
                      Добавить вопрос
                    </Button>
                    <Button
                      color="primary"
                      type="button"
                      disabled={this.props.quiz.length === 0}
                      onClick={() => {
                        this.createQuiz();
                      }}
                    >
                      Создать тест
                    </Button>
                  </div>
                </form>
              )}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  creatingQuiz: state.quizCreate.creatingQuiz,
  name: state.quizCreate.name,
  quiz: state.quizCreate.quiz,
});

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  QwnPropsType,
  AppStateType
>(mapStateToProps, {
  addQuestion: quizCreatorActions.addQuestion,
  createQuizName: quizCreatorActions.createQuizName,
  createNewQuiz,
  clearQuiz: quizCreatorActions.clearQuiz,
})(QuizCreator);
