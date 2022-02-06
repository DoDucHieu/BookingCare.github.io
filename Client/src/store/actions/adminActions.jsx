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
  createDetailDoctor,
  getDetailDoctor,
  editDetailDoctor,
} from "../../services/userService";
import { dispatch } from "../../redux";

//gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_GENDER_START });
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
      // dispatch({ type: actionTypes.GET_ALL_USER_START });
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

export let createDetailDoctorStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let result = await createDetailDoctor(data);
      if (result && result.errCode === 0) {
        dispatch(createDetailDoctorSuccess());
      } else {
        dispatch(createDetailDoctorFailed());
      }
    } catch (e) {
      console.log(e);
      dispatch(createDetailDoctorFailed());
    }
  };
};
export let createDetailDoctorSuccess = (data) => {
  toast.success("CREATE DETAIL DOCTOR SUCCESS!");
  return {
    type: actionTypes.CREATE_DETAIL_DOCTOR_SUCCESS,
  };
};
export let createDetailDoctorFailed = () => {
  toast.failed("CREATE DETAIL DOCTOR FAILED!");
  return {
    type: actionTypes.CREATE_DETAIL_DOCTOR_FAILED,
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

export let editDetailDoctorStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let result = await editDetailDoctor(data);
      if (result && result.errCode === 0) {
        dispatch(editDetailDoctorSuccess());
      } else {
        dispatch(editDetailDoctorFailed());
      }
    } catch (e) {
      console.log(e);
      dispatch(editDetailDoctorFailed());
    }
  };
};
export let editDetailDoctorSuccess = (data) => {
  toast.success("EDIT DETAIL DOCTOR SUCCESS!");
  return {
    type: actionTypes.EDIT_DETAIL_DOCTOR_SUCCESS,
  };
};
export let editDetailDoctorFailed = () => {
  toast.failed("EDIT DETAIL DOCTOR FAILED!");
  return {
    type: actionTypes.EDIT_DETAIL_DOCTOR_FAILED,
  };
};
