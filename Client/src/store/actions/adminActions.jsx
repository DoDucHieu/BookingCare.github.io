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
  getDoctorInforWhenBooking,
  findOrCreateBookingAppointment,
  verifyBookingAppointment,
  createDetailSpecialty,
  getSpecialty,
  editSpecialty,
  getDoctorBySpecialty,
} from "../../services/userService";
import { dispatch } from "../../redux";

//gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      let result = await getAllCode("GENDER");
      if (result && result.errCode === 0) {
        // console.log("hello from adminAction");
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
  // console.log("admin action check: ", data);
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

export let fetchSpecialtyStart = () => {
  return async (dispatch, getState) => {
    try {
      let result = await getAllCode("SPECIALTY");
      if (result && result.errCode === 0) {
        dispatch(fetchSpecialtySuccess(result.data));
      } else {
        dispatch(fetchSpecialtyFailed());
      }
    } catch (e) {
      console.log(e);
      dispatch(fetchSpecialtyFailed());
    }
  };
};

export let fetchSpecialtySuccess = (data) => {
  return {
    type: actionTypes.FETCH_SPECIALTY_SUCCESS,
    data: data,
  };
};
export let fetchSpecialtyFailed = () => {
  return {
    type: actionTypes.FETCH_SPECIALTY_FAILED,
  };
};

export let fetchClinicStart = () => {
  return async (dispatch, getState) => {
    try {
      let result = await getAllCode("CLINIC");
      if (result && result.errCode === 0) {
        dispatch(fetchClinicSuccess(result.data));
      } else {
        dispatch(fetchClinicFailed());
      }
    } catch (e) {
      console.log(e);
      dispatch(fetchClinicFailed());
    }
  };
};

export let fetchClinicSuccess = (data) => {
  return {
    type: actionTypes.FETCH_CLINIC_SUCCESS,
    data: data,
  };
};
export let fetchClinicFailed = () => {
  return {
    type: actionTypes.FETCH_CLINIC_FAILED,
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

export let findOrCreateBookingAppointmentStart = (data) => {
  return async (disptach, getState) => {
    try {
      let result = await findOrCreateBookingAppointment(data);
      if (result && result.errCode === 0) {
        dispatch(findOrCreateBookingAppointmentSuccess());
      } else {
        dispatch(findOrCreateBookingAppointmentFailed());
      }
    } catch (e) {
      console.log(e);
      dispatch(findOrCreateBookingAppointmentFailed());
    }
  };
};

export let findOrCreateBookingAppointmentSuccess = () => {
  toast.success("SUCCESSFULL!");
  return {
    type: actionTypes.FIND_OR_CREATE_BOOKING_APPOINTMENT_SUCCESS,
  };
};
export let findOrCreateBookingAppointmentFailed = () => {
  toast.error("FAILED!");
  return {
    type: actionTypes.FIND_OR_CREATE_BOOKING_APPOINTMENT_FAILED,
  };
};

export let verifyBookingAppointmentStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let result = await verifyBookingAppointment(data);
      if (result && result.errCode === 0) {
        dispatch(verifyBookingAppointmentSuccess({ isVerify: true }));
      } else {
        dispatch(verifyBookingAppointmentFailed({ isVerify: false }));
      }
    } catch (e) {
      console.log(e);
      dispatch(verifyBookingAppointmentFailed({ isVerify: false }));
    }
  };
};

export let verifyBookingAppointmentSuccess = (data) => {
  toast.success("CONFIRM BOOKING SCHEDULE SUCCESS!");
  return {
    type: actionTypes.VERIFY_BOOKING_APPOINTMENT_SUCCESS,
    data: data.isVerify,
  };
};

export let verifyBookingAppointmentFailed = (data) => {
  toast.error("CONFIRM BOOKING SCHEDULE FAILED!");
  return {
    type: actionTypes.VERIFY_BOOKING_APPOINTMENT_FAILED,
    data: data.isVerify,
  };
};

export let createDetailSpecialtyStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let result = await createDetailSpecialty(data);
      if (result && result.errCode === 0) {
        dispatch(createDetailSpecialtySuccess());
      } else {
        dispatch(createDetailSpecialtyFailed());
      }
    } catch (e) {
      console.log(e);
      dispatch(createDetailSpecialtyFailed());
    }
  };
};

export let createDetailSpecialtySuccess = () => {
  toast.success("CREATE DETAIL SPECIALTY SUCCESS!");
  return {
    type: actionTypes.CREATE_DETAIL_SPECIALTY_SUCCESS,
  };
};

export let createDetailSpecialtyFailed = () => {
  toast.error("CREATE DETAIL SPECIALTY FAILED!");

  return {
    type: actionTypes.CREATE_DETAIL_SPECIALTY_FAILED,
  };
};

export let getSpecialtyStart = (specialtyId) => {
  return async (dispatch, getState) => {
    try {
      let result = await getSpecialty(specialtyId);
      if (result && result.errCode === 0) {
        dispatch(getSpecialtySuccess(result.data));
      } else {
        dispatch(getSpecialtyFailed());
      }
    } catch (e) {
      console.log(e);
      dispatch(getSpecialtyFailed());
    }
  };
};

export let getSpecialtySuccess = (data) => {
  return {
    type: actionTypes.GET_SPECIALTY_SUCCESS,
    data: data,
  };
};

export let getSpecialtyFailed = () => {
  return {
    type: actionTypes.GET_SPECIALTY_SUCCESS,
  };
};

export let editSpecialtyStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let result = await editSpecialty(data);
      if (result && result.errCode === 0) {
        dispatch(editSpecialtySuccess());
      } else {
        dispatch(editSpecialtyFailed());
      }
    } catch (e) {
      console.log(e);
      dispatch(editSpecialtyFailed());
    }
  };
};

export let editSpecialtySuccess = () => {
  toast.success("EDIT SPECIALTY SUCCESS!");
  return {
    type: actionTypes.EDIT_SPECIALTY_SUCCESS,
  };
};

export let editSpecialtyFailed = () => {
  toast.error("EDIT SPECIALTY FAILED!");

  return {
    type: actionTypes.EDIT_SPECIALTY_FAILED,
  };
};

export let getDoctorBySpecialtyStart = (specialtyId) => {
  return async (dispatch, getState) => {
    try {
      let result = await getDoctorBySpecialty(specialtyId);
      if (result && result.errCode === 0) {
        dispatch(getDoctorBySpecialtySuccess(result.data));
      } else {
        dispatch(getDoctorBySpecialtyFailed());
      }
    } catch (e) {
      console.log(e);
      dispatch(getDoctorBySpecialtyFailed());
    }
  };
};

export let getDoctorBySpecialtySuccess = (data) => {
  return {
    type: actionTypes.GET_DOCTOR_BY_SPECIALTY_SUCCESS,
    data: data,
  };
};

export let getDoctorBySpecialtyFailed = (data) => {
  return {
    type: actionTypes.GET_DOCTOR_BY_SPECIALTY_FAILED,
  };
};
