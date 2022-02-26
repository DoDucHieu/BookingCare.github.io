import actionTypes from "../actions/actionTypes";

const initialState = {
  language: "vi",
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LANGUAGE:
      console.log("Change language with redux appReducer: ", action);
      return {
        ...state,
        language: action.language,
      };
    default:
      return state;
  }
};

export default appReducer;
