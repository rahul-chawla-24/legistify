import { combineReducers } from "redux";

const lawyersReducer = (oldState = [], action) => {
  switch (action.type) {
    case "FETCHED_LAWYERS":
      return action?.lawyers;
    default:
      return oldState;
  }
};
const loadingReducer = (oldState = "false", action) => {
  switch (action.type) {
    case "FETCHED_LAWYERS":
      return false;
    case "USER_CREATED":
      return false;
    case "LOADING":
      return true;
    default:
      return oldState;
  }
};

const userReducer = (oldState = null, action) => {
  switch (action.type) {
    case "USER_CREATED":
      return action?.user;
    default:
      return oldState;
  }
};

const slotReducer = (oldState = null, action) => {
  switch (action.type) {
    case "SLOT_CREATED":
      return action?.slot;
    default:
      return oldState;
  }
};

const rootReducer = combineReducers({
  lawyers: lawyersReducer,
  loading: loadingReducer,
  user: userReducer,
  slot: slotReducer,
});

export default rootReducer;
