const initilaState = {
  token: null as string | null,
};

type initilaStateType = typeof initilaState;

export const authReducer = (
  state: initilaStateType = initilaState,
  action: any
) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return {
        ...state,
        token: action.token,
      };
    case "LOGOUT": {
      return {
        ...state,
        token: null,
      };
    }
    default:
      return state;
  }
};
