import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  time: [],
  users: [],
  price: [],
  province: [],
  paymentMethod: [],
  isLoadingGender: false,
  isLoadingPosition: false,
  isLoadingRole: false,
  isLoadingUser: false,
  outstandingDoctor: [],
  allDoctor: [],
  detailDoctor: {},
  doctorSchedule: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    //Gender
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      console.log("hello from FETCH_GENDER_SUCCESS reducer!", state);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGender = false;
      return {
        ...state,
      };

    //positon
    case actionTypes.FETCH_POSITION_START:
      state.isLoadingPosition = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      state.isLoadingPosition = false;
      console.log("hello from FETCH_POSITION_SUCCESS reducer!", state);
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.isLoadingPosition = false;
      return {
        ...state,
      };

    //role
    case actionTypes.FETCH_ROLE_START:
      state.isLoadingRole = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      state.isLoadingRole = false;
      console.log("hello from FETCH_ROLE_SUCCESS reducer!", state);
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.isLoadingRole = false;
      return {
        ...state,
      };
    // time
    case actionTypes.FETCH_TIME_SUCCESS:
      state.time = action.dataTime;
      return {
        ...state,
      };
    case actionTypes.FETCH_TIME_FAILED:
      return {
        ...state,
      };
    //user
    case actionTypes.GET_ALL_USER_START:
      state.isLoadingUser = true;
      return {
        ...state,
      };
    case actionTypes.GET_ALL_USER_SUCCESS:
      state.users = action.userArr.user.reverse();
      state.isLoadingUser = false;
      console.log("hello from GET_ALL_USER_SUCCESS reducer!", state);
      return {
        ...state,
      };
    case actionTypes.GET_ALL_USER_FAILED:
      state.isLoadingUser = false;
      return {
        ...state,
      };

    case actionTypes.GET_OUTSTANDING_DOCTOR_SUCCESS:
      state.outstandingDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_OUTSTANDING_DOCTOR_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAILED:
      return {
        ...state,
      };
    case actionTypes.GET_DETAIL_DOCTOR_SUCCESS:
      state.detailDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_DETAIL_DOCTOR_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_DOCTOR_SCHEDUlE_SUCCESS:
      state.doctorSchedule = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_DOCTOR_SCHEDUlE_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_PROVINCE_SUCCESS:
      state.province = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_PROVINCE_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_PRICE_SUCCESS:
      state.price = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_PRICE_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_PAYMENT_METHOD_SUCCESS:
      state.paymentMethod = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_PAYMENT_METHOD_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
