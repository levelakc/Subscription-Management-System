const initialState = {
  allMovies: [],
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES_SUCCESS':
      return {
        ...state,
        allMovies: action.payload,
      };
    case 'FETCH_MOVIES_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default movieReducer;
