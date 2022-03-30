import {
  ADD_CONTACT,
  EDIT_CONTACT,
  FETCH_CONTACT,
  REMOVE_CONTACT,
  TOGGLE_SPINNER,
} from "../const";

export const Fetch_contact = (payload) => {
  return {
    type: FETCH_CONTACT,
    payload: payload,
  };
};
export const Add_Contact = (payload) => {
  return {
    type: ADD_CONTACT,
    payload: payload,
  };
};
export const Remove_Contact = (payload) => {
  return {
    type: REMOVE_CONTACT,
    payload: payload,
  };
};
export const Edit_Contact = (payload) => {
  return {
    type: EDIT_CONTACT,
    payload: payload,
  };
};
export const Toggle_Spinner = (payload) => {
  return {
    type: TOGGLE_SPINNER,
    payload: payload,
  };
};
