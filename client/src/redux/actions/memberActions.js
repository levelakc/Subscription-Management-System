import axios from 'axios';
import { FETCH_MEMBERS, FETCH_MEMBER, ADD_MEMBER, EDIT_MEMBER, DELETE_MEMBER } from './types';

const API_URL = 'http://localhost:8000/api/members';

export const fetchMembers = () => async (dispatch) => {
  try {
    const response = await axios.get(API_URL);
    dispatch({ type: FETCH_MEMBERS, payload: response.data });
  } catch (error) {
    console.error('Error fetching members:', error);
  }
};

export const fetchMember = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    dispatch({ type: FETCH_MEMBER, payload: response.data });
  } catch (error) {
    console.error('Error fetching member:', error);
  }
};

export const addMember = (member) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL, member);
    dispatch({ type: ADD_MEMBER, payload: response.data });
  } catch (error) {
    console.error('Error adding member:', error);
  }
};

export const editMember = (id, member) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, member);
    dispatch({ type: EDIT_MEMBER, payload: response.data });
  } catch (error) {
    console.error('Error editing member:', error);
  }
};

export const deleteMember = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch({ type: DELETE_MEMBER, payload: id });
  } catch (error) {
    console.error('Error deleting member:', error);
  }
};
