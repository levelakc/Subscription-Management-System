// src/redux/reducers/memberReducer.js
import {
  FETCH_MEMBERS,
  FETCH_MEMBER,
  ADD_MEMBER,
  EDIT_MEMBER,
  DELETE_MEMBER
} from '../actions/types';

const initialState = {
  members: [],
  currentMember: null,
};

const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEMBERS:
      return { ...state, members: action.payload };
    case FETCH_MEMBER:
      return { ...state, currentMember: action.payload };
    case ADD_MEMBER:
      return { ...state, members: [...state.members, action.payload] };
    case EDIT_MEMBER:
      return {
        ...state,
        members: state.members.map((member) =>
          member._id === action.payload._id ? action.payload : member
        ),
        // Also update currentMember in case it's the one being edited
        currentMember: state.currentMember && state.currentMember._id === action.payload._id ? action.payload : state.currentMember,
      };
    case DELETE_MEMBER:
      return {
        ...state,
        members: state.members.filter((member) => member._id !== action.payload),
        // Remove from currentMember if the current member is deleted
        currentMember: state.currentMember && state.currentMember._id === action.payload ? null : state.currentMember,
      };
    default:
      return state;
  }
};

export default memberReducer;
