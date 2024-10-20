const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'ADD_USER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case 'ADD_USER_FAIL':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
