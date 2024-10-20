import axios from 'axios';

// Action Types
const FETCH_SUBSCRIPTIONS_REQUEST = 'FETCH_SUBSCRIPTIONS_REQUEST';
const FETCH_SUBSCRIPTIONS_SUCCESS = 'FETCH_SUBSCRIPTIONS_SUCCESS';
const FETCH_SUBSCRIPTIONS_ERROR = 'FETCH_SUBSCRIPTIONS_ERROR';

const FETCH_SUBSCRIPTIONS_BY_MEMBER_ID_REQUEST = 'FETCH_SUBSCRIPTIONS_BY_MEMBER_ID_REQUEST';
const FETCH_SUBSCRIPTIONS_BY_MEMBER_ID_SUCCESS = 'FETCH_SUBSCRIPTIONS_BY_MEMBER_ID_SUCCESS';
const FETCH_SUBSCRIPTIONS_BY_MEMBER_ID_ERROR = 'FETCH_SUBSCRIPTIONS_BY_MEMBER_ID_ERROR';

// Base URL for your API
const BASE_URL = 'http://localhost:8000/api/subscriptions';

// Action Creators
export const fetchSubscriptions = () => async (dispatch) => {
  dispatch({ type: FETCH_SUBSCRIPTIONS_REQUEST });
  try {
    const response = await axios.get(BASE_URL);
    dispatch({ type: FETCH_SUBSCRIPTIONS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: FETCH_SUBSCRIPTIONS_ERROR,
      error: error.message,
    });
  }
};

export const fetchSubscriptionsByMemberId = (memberId) => async (dispatch) => {
  dispatch({ type: FETCH_SUBSCRIPTIONS_BY_MEMBER_ID_REQUEST });

  try {
    const response = await axios.get(`${BASE_URL}/member/${memberId}`);
    dispatch({ type: FETCH_SUBSCRIPTIONS_BY_MEMBER_ID_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: FETCH_SUBSCRIPTIONS_BY_MEMBER_ID_ERROR,
      error: error.message,
    });
  }
};
