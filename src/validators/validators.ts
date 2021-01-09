type ValidatorType = (value: string) => string | undefined;

export const required: ValidatorType = (value) =>
  value ? undefined : "Поле обязательное";

export const validateEmail: ValidatorType = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase())
    ? undefined
    : "Введите корректный email";
};

export const composeValidators = (...validators: Array<any>) => (
  value: string
) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const minLength = (minValue: number) => (value: string) =>
  value && value.length < minValue
    ? `Минимальная длина ${minValue}`
    : undefined;
