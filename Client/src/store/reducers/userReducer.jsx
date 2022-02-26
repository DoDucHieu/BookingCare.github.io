import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      state.isLoggedIn = true;
      state.userInfo = action.userInfo;
      return {
        ...state,
      };
    case actionTypes.USER_LOGIN_FAIL:
      state.isLoggedIn = false;
      state.userInfo = null;
      return {
        ...state,
      };
    case actionTypes.PROCESS_LOGOUT:
      state.isLoggedIn = false;
      state.userInfo = null;
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default userReducer;
