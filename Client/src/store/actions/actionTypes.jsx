const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  //admin
  FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
  FETCH_GENDER_FAILED: "FETCH_GENDER_FAILED",

  FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
  FETCH_POSITION_FAILED: "GETCH_POSITION_FAILED",

  FETCH_ROLE_SUCCESS: "FETCH_ROOLE_SUCCESS",
  FETCH_ROLE_FAILED: "FETCH_ROLE_FAILED",

  CREATE_NEW_USER_SUCCESS: "CREATE_NEW_USER_SUCCESS",
  CREATE_NEW_USER_FAILED: "CREATE_NEW_USER_FAILED",

  GET_ALL_USER_SUCCESS: "GET_ALL_USER_SUCCESS",
  GET_ALL_USER_FAILED: "GET_ALL_USER_FAILED",

  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAILED: "DELETE_USER_FAILED",

  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  EDIT_USER_FAILED: "EDIT_USER_FAILED",

  // admin and doctor
  FETCH_TIME_SUCCESS: "FETCH_TIME_SUCCESS",
  FETCH_TIME_FAILED: "FETCH_TIME_FAILED",

  //LOAD TOP OUTSTANDING DOCTOR
  GET_OUTSTANDING_DOCTOR_SUCCESS: "GET_OUTSTANDING_DOCTOR_SUCCESS",
  GET_OUTSTANDING_DOCTOR_FAILED: "GET_OUTSTANDING_DOCTOR_FAILED",

  //FETCH ALL DOCTOR
  FETCH_ALL_DOCTOR_SUCCESS: "FETCH_ALL_DOCTOR_SUCCESS",
  FETCH_ALL_DOCTOR_FAILED: "FETCH_ALL_DOCTOR_FAILED",

  // EDIT OR CREATE DETAIL DOCTOR
  EDIT_OR_CREATE_DETAIL_MARKDOWN_DOCTOR_SUCCESS:
    "EDIT_OR_CREATE_DETAIL_DOCTOR_SUCCESS",
  EDIT_OR_CREATE_DETAIL_MARKDOWN_DOCTOR_FAILED:
    "EDIT_OR_CREATE_DETAIL_DOCTOR_FAILED",

  //GET DETAIL DOCTOR
  GET_DETAIL_DOCTOR_SUCCESS: "GET_DETAIL_DOCTOR_SUCCESS",
  GET_DETAIL_DOCTOR_FAILED: "GET_DETAIL_DOCTOR_FAILED",

  //CREATE BULK DOCTOR SCHEDULE
  CREATE_BULK_DOCTOR_SCHEDULE_SUCCESS: "CREATE_BULK_DOCTOR_SCHEDULE_SUCCESS",
  CREATE_BULK_DOCTOR_SCHEDULE_FAILED: "CREATE_BULK_DOCTOR_SCHEDULE_FAILED",

  //FETCH DOCTOR SHEDULE
  FETCH_DOCTOR_SCHEDUlE_SUCCESS: "FETCH_DOCTOR_SCHEDULE_SUCCESS",
  FETCH_DOCTOR_SCHEDUlE_FAILED: "FETCH_DOCTOR_SCHEDULE_FAILED",

  //FETCH PROVINCE
  FETCH_PROVINCE_SUCCESS: "FETCH_PROVINCE_SUCCESS",
  FETCH_PROVINCE_FAILED: "FETCH_PROVINCE_FAILED",

  //FETCH PRICE
  FETCH_PRICE_SUCCESS: "FETCH_PRICE_SUCCESS",
  FETCH_PRICE_FAILED: "FETCH_PRICE_FAILED",

  //FETCH PAYMENT METHOD
  FETCH_PAYMENT_METHOD_SUCCESS: "FETCH_PAYMENT_METHOD_SUCCESS",
  FETCH_PAYMENT_METHOD_FAILED: "FETCH_PAYMENT_METHOD_FAILED",
});

export default actionTypes;
