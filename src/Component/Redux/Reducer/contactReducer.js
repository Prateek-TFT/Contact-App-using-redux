import {
  ADD_CONTACT,
  EDIT_CONTACT,
  FETCH_CONTACT,
  REMOVE_CONTACT,
  TOGGLE_SPINNER,
} from "../const";

const initialState = {
  contacts: [],
  showSpinner: false,
};
const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTACT: {
      return {
        contacts: action.payload,
      };
    }
    case ADD_CONTACT:
      return {
        contacts: state.contacts.concat(action.payload),
      };

    case REMOVE_CONTACT:
      return {
        contacts: state.contacts.filter((cont) => cont.id !== action.payload),
        showSpinner: state.showSpinner,
      };
    case EDIT_CONTACT:
      let allContact = [...state.contacts];
      allContact[action.payload.id - 1] = action.payload;
      return {
        contacts: allContact,
        showSpinner: state.showSpinner,
      };
    case TOGGLE_SPINNER:
      return {
        contacts: state.contacts,
        showSpinner: action.payload,
      };

    default:
      return {
        contacts: state.contacts,
        showSpinner: state.showSpinner,
      };
  }
};
export default contactReducer;
