import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllCode,
  createNewUser,
  getAllUsers,
  deleteUser,
  editUser,
  getOutstandingDoctor,
  getAllDoctor,
  editOrCreateDetailDoctor,
  getDetailDoctor,
  createBulkDoctorSchedule,
  getDoctorSchedule,
  getDoctorExtraInfor,
  getDoctorInforWhenBooking,
} from "../../services/userService";
import { dispatch } from "../../redux";

//gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      let result = await getAllCode("GENDER");
      if (result && result.errCode === 0) {
        console.log("hello from adminAction");
        dispatch(fetchGenderSuccess(result.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log(e);
    }
  };
};

export const fetchGenderSuccess = (data) => {
  return { type: actionTypes.FETCH_GENDER_SUCCESS, data: data };
};

export const fetchGenderFailed = () => {
  return { type: actionTypes.FETCH_GENDER_FAILED };
};

// position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let result = await getAllCode("POSITION");
      if (result && result.errCode === 0) {
        console.log("hello from adminAction");
        dispatch(fetchPositionSuccess(result.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log(e);
    }
  };
};

export const fetchPositionSuccess = (data) => {
  return { type: actionTypes.FETCH_POSITION_SUCCESS, data: data };
};

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

//role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let result = await getAllCode("ROLE");
      if (result && result.errCode === 0) {
        console.log("hello from adminAction");
        dispatch(fetchRoleSuccess(result.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log(e);
    }
  };
};

export const fetchRoleSuccess = (data) => {
  return { type: actionTypes.FETCH_ROLE_SUCCESS, data: data };
};

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

//time
export const fetchTimeStart = () => {
  return async (dispatch, getstate) => {
    try {
      let result = await getAllCode("TIME");
      if (result && result.errCode === 0) {
        dispatch(fetchTimeSuccess(result.data));
      } else {
        dispatch(fetchTimeFailed());
      }
    } catch (e) {}
  };
};
export const fetchTimeSuccess = (data) => {
  return {
    type: actionTypes.FETCH_TIME_SUCCESS,
    dataTime: data,
  };
};
export const fetchTimeFailed = () => {
  return {
    type: actionTypes.FETCH_TIME_FAILED,
  };
};

// create new user (Khong cần adminReducer vì chả cần làm j liên quan tới state)
export const createNewUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let result = await createNewUser(data);
      if (result && result.errCode === 0) {
        console.log("hello from adminAction", result.errCode);
        dispatch(createNewUserSuccess());
        dispatch(getAllUserStart());
      } else {
        alert(result.errMessage);
        dispatch(createNewUserFailed());
      }
    } catch (e) {
      dispatch(createNewUserFailed());
      console.log(e);
    }
  };
};

export const createNewUserSuccess = () => {
  toast.success("CREATE USER SUCCESS!");
  return { type: actionTypes.CREATE_NEW_USER_SUCCESS };
};

export const createNewUserFailed = () => ({
  type: actionTypes.CREATE_NEW_USER_FAILED,
});

//getAllUser
export const getAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let userArr = await getAllUsers("ALL");
      if (userArr && userArr.errCode === 0) {
        console.log("hello from adminAction");

        dispatch(getAllUserSuccess(userArr));
      } else {
        dispatch(getAllUserFailed());
      }
    } catch (e) {
      dispatch(getAllUserFailed());
      console.log(e);
    }
  };
};

export const getAllUserSuccess = (userData) => {
  return {
    type: actionTypes.GET_ALL_USER_SUCCESS,
    userArr: userData,
  };
};
export const getAllUserFailed = () => {
  return {
    type: actionTypes.GET_ALL_USER_FAILED,
  };
};

export const deleteUserStart = (id) => {
  return async (dispatch, getState) => {
    try {
      let result = await deleteUser(id);
      if (result && result.errCode === 0) {
        dispatch(getAllUserStart());
        dispatch(deleteUserSuccess());
      } else {
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      console.log(e);
      dispatch(deleteUserFailed());
    }
  };
};

export const deleteUserSuccess = () => {
  toast.success("DELETE USER SUCCESS!");
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
  };
};
export const deleteUserFailed = () => {
  return {
    type: actionTypes.DELETE_USER_FAILED,
  };
};

export let editUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let result = await editUser(data);
      if (result && result.errCode === 0) {
        dispatch(editUserSuccess());
        dispatch(getAllUserStart());
      } else {
        dispatch(editUserFailed());
      }
    } catch (e) {
      dispatch(editUserFailed());
    }
  };
};

export let editUserSuccess = () => {
  toast.success("EDIT USER SUCCESS!");
  return {
    type: actionTypes.EDIT_USER_SUCCESS,
  };
};
export let editUserFailed = () => {
  return {
    type: actionTypes.EDIT_USER_FAILED,
  };
};

//get outstanding doctor
export const getOutstandingDoctorStart = (limit) => {
  return async (dispatch, getState) => {
    try {
      let result = await getOutstandingDoctor(limit);
      if (result && result.errCode === 0) {
        dispatch(getOutstandingDoctorSuccess(result.data));
      } else {
        dispatch(getOutstandingDoctorFailed());
      }
    } catch (e) {
      dispatch(getOutstandingDoctorFailed());
    }
  };
};
export const getOutstandingDoctorSuccess = (data) => {
  return {
    type: actionTypes.GET_OUTSTANDING_DOCTOR_SUCCESS,
    data: data,
  };
};

export const getOutstandingDoctorFailed = () => {
  return {
    type: actionTypes.GET_OUTSTANDING_DOCTOR_FAILED,
  };
};

export let getAllDoctorStart = () => {
  return async (dispatch, getState) => {
    try {
      let result = await getAllDoctor();
      if (result && result.errCode === 0) {
        dispatch(getAllDoctorSuccess(result.data));
      } else {
        dispatch(getAllDoctorFailed());
      }
    } catch (e) {
      console.log(e);
      dispatch(getAllDoctorFailed());
    }
  };
};
export let getAllDoctorSuccess = (doctorData) => {
  return {
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    data: doctorData,
  };
};
export let getAllDoctorFailed = () => {
  return {
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
  };
};

export let editOrCreateDetailDoctorStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let result = await editOrCreateDetailDoctor(data);
      if (result && result.errCode === 0) {
        dispatch(editOrCreateDetailDoctorSuccess());
      } else {
        dispatch(editOrCreateDetailDoctorFailed());
      }
    } catch (e) {
      console.log(e);
      dispatch(editOrCreateDetailDoctorFailed());
    }
  };
};
export let editOrCreateDetailDoctorSuccess = (data) => {
  toast.success("EDIT OR CREATE DETAIL DOCTOR SUCCESS!");
  return {
    type: actionTypes.EDIT_OR_CREATE_DETAIL_MARKDOWN_DOCTOR_SUCCESS,
  };
};
export let editOrCreateDetailDoctorFailed = () => {
  toast.error("EDIT OR CREATE DETAIL DOCTOR FAILED!");
  return {
    type: actionTypes.EDIT_OR_CREATE_DETAIL_MARKDOWN_DOCTOR_FAILED,
  };
};

export let getDetailDoctorStart = (id) => {
  return async (dispatch, getState) => {
    try {
      let result = await getDetailDoctor(id);
      if (result && result.errCode === 0) {
        dispatch(getDetailDoctorSuccess(result.data));
      } else {
        dispatch(getDetailDoctorFailed());
      }
    } catch (e) {
      console.log(e);
      dispatch(getDetailDoctorFailed());
    }
  };
};
export let getDetailDoctorSuccess = (data) => {
  console.log("admin action check: ", data);
  return {
    type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS,
    data: data,
  };
};
export let getDetailDoctorFailed = () => {
  return {
    type: actionTypes.GET_DETAIL_DOCTOR_FAILED,
  };
};

export let createBulkDoctorScheduleStart = (data) => {
  return async (dispatch, getstate) => {
    try {
      if (data.length === 0) {
        toast.error("MISSING TIME SCHEDULE!");
        return;
      } else {
        if (!data[0].doctorId || !data[0].date) {
          toast.error("MISSING DATE OR DOCTOR!");
          return;
        }
        let result = await createBulkDoctorSchedule(data);
        if (result && result.errCode === 0) {
          dispatch(createBulkDoctorScheduleSuccess());
        } else {
          dispatch(createBulkDoctorScheduleFailed());
        }
      }
    } catch (e) {
      console.log(e);
      dispatch(createBulkDoctorScheduleFailed());
    }
  };
};

export let createBulkDoctorScheduleSuccess = () => {
  toast.success("CREATE DOCTOR SCHEDULE SUCCESS!");
  return {
    type: actionTypes.CREATE_BULK_DOCTOR_SCHEDULE_SUCCESS,
  };
};
export let createBulkDoctorScheduleFailed = () => {
  toast.error("CREATE DOCTOR SCHEDULE FAILED!");
  return {
    type: actionTypes.CREATE_BULK_DOCTOR_SCHEDULE_FAILED,
  };
};

export let getDoctorScheduleStart = (doctorId, dateSelected) => {
  return async (dispatch, getState) => {
    try {
      let result = await getDoctorSchedule(doctorId, dateSelected);
      if (result) {
        dispatch(getDoctorScheduleSuccess(result.data));
      } else {
        dispatch(getDoctorScheduleFailed());
      }
    } catch (e) {
      console.log(e);
      dispatch(getDoctorScheduleFailed());
    }
  };
};
export let getDoctorScheduleSuccess = (data) => {
  return {
    type: actionTypes.FETCH_DOCTOR_SCHEDUlE_SUCCESS,
    data: data,
  };
};
export let getDoctorScheduleFailed = (data) => {
  return {
    type: actionTypes.FETCH_DOCTOR_SCHEDUlE_FAILED,
  };
};

export let fetchProvinceStart = () => {
  return async (dispatch, getState) => {
    try {
      let result = await getAllCode("PROVINCE");
      if (result && result.errCode === 0) {
        dispatch(fetchProvinceSuccess(result.data));
      } else {
        dispatch(fetchProvinceFailed());
      }
    } catch (e) {
      console.log(e);
      dispatch(fetchProvinceFailed());
    }
  };
};
export let fetchProvinceSuccess = (data) => {
  return {
    type: actionTypes.FETCH_PROVINCE_SUCCESS,
    data: data,
  };
};
export let fetchProvinceFailed = () => {
  return {
    type: actionTypes.FETCH_PROVINCE_FAILED,
  };
};

export let fetchPriceStart = () => {
  return async (dispatch, getState) => {
    try {
      let result = await getAllCode("PRICE");
      if (result && result.errCode === 0) {
        dispatch(fetchPriceSuccess(result.data));
      } else {
        dispatch(fetchPriceFailed());
      }
    } catch (e) {
      console.log(e);
      dispatch(fetchPriceFailed());
    }
  };
};
export let fetchPriceSuccess = (data) => {
  return {
    type: actionTypes.FETCH_PRICE_SUCCESS,
    data: data,
  };
};
export let fetchPriceFailed = () => {
  return {
    type: actionTypes.FETCH_PRICE_FAILED,
  };
};

export let fetchPaymentMethodStart = () => {
  return async (dispatch, getState) => {
    try {
      let result = await getAllCode("PAYMENT");
      if (result && result.errCode === 0) {
        dispatch(fetchPaymentMethodSuccess(result.data));
      } else {
        dispatch(fetchPaymentMethodFailed());
      }
    } catch (e) {
      console.log(e);
      dispatch(fetchPaymentMethodFailed());
    }
  };
};
export let fetchPaymentMethodSuccess = (data) => {
  return {
    type: actionTypes.FETCH_PAYMENT_METHOD_SUCCESS,
    data: data,
  };
};
export let fetchPaymentMethodFailed = () => {
  return {
    type: actionTypes.FETCH_PAYMENT_METHOD_FAILED,
  };
};

export let fetchDoctorExtraInforStart = (doctorId) => {
  return async (dispatch, getState) => {
    try {
      let result = await getDoctorExtraInfor(doctorId);
      if (result && result.errCode === 0) {
        dispatch(fetchDoctorExtraInforSuccess(result.data));
      } else {
        dispatch(fetchDoctorExtraInforFailed());
      }
    } catch (e) {
      console.log(e);
      dispatch(fetchDoctorExtraInforFailed());
    }
  };
};

export let fetchDoctorExtraInforSuccess = (data) => {
  return {
    type: actionTypes.FETCH_DOCTOR_EXTRA_INFOR_SUCCESS,
    data: data,
  };
};

export let fetchDoctorExtraInforFailed = () => {
  return {
    type: actionTypes.FETCH_DOCTOR_EXTRA_INFOR_FAILED,
  };
};

export let fetchDoctorInforWhenBookingStart = (doctorId) => {
  return async (dispatch, getState) => {
    try {
      let result = await getDoctorInforWhenBooking(doctorId);
      if (result && result.errCode === 0) {
        dispatch(fetchDoctorInforWhenBookingSuccess(result.data));
      } else {
        dispatch(fetchDoctorInforWhenBookingFailed());
      }
    } catch (e) {
      console.log(e);
      dispatch(fetchDoctorInforWhenBookingFailed());
    }
  };
};

export let fetchDoctorInforWhenBookingSuccess = (data) => {
  return {
    type: actionTypes.FETCH_DOCTOR_INFOR_WHEN_BOOKING_SUCCESS,
    data: data,
  };
};

export let fetchDoctorInforWhenBookingFailed = () => {
  return {
    type: actionTypes.FETCH_DOCTOR_INFOR_WHEN_BOOKING_FAILED,
  };
};
