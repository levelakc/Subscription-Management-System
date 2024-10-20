// Initial State
const initialState = {
  subscriptions: [],
  loading: false,
  error: null
};

// Reducer Function
const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SUBSCRIPTIONS_REQUEST':
    case 'FETCH_SUBSCRIPTIONS_BY_MEMBER_ID_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUBSCRIPTIONS_SUCCESS':
      return { ...state, subscriptions: action.payload, loading: false, error: null };
    case 'FETCH_SUBSCRIPTIONS_BY_MEMBER_ID_SUCCESS':
      return { ...state, subscriptions: action.payload, loading: false, error: null };
    case 'FETCH_SUBSCRIPTIONS_ERROR':
    case 'FETCH_SUBSCRIPTIONS_BY_MEMBER_ID_ERROR':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default subscriptionReducer;
