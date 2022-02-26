import axios from "../axios";
import Specialty from "../containers/HomePage/Section/Specialty";

let handleLogin = (email, password) => {
  return axios.post("/api/login", { email, password });
};

let getAllUsers = (idInput) => {
  return axios.get(`/api/get-all-user?id=${idInput}`);
};
let createNewUser = (data) => {
  return axios.post("./api/create-new-user", data);
};
let deleteUser = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};
let editUser = (data) => {
  return axios.put("/api/edit-user", data);
};
let getAllCode = (type) => {
  return axios.get(`/api/get-all-code?type=${type}`);
};

//get outstanding doctor
let getOutstandingDoctor = (limit) => {
  return axios.get(`/api/get-top-doctor?limit=${limit}`);
};
//get all doctor
let getAllDoctor = () => {
  return axios.get("/api/get-all-doctor");
};
// create detail doctor
let editOrCreateDetailDoctor = (data) => {
  return axios.post("/api/edit-or-create-detail-doctor", data);
};

let getDetailDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor?id=${id}`);
};

let editDetailDoctor = (data) => {
  return axios.put("/api/edit-detail-doctor", data);
};
let createBulkDoctorSchedule = (data) => {
  return axios.post("/api/post-bulk-doctor-schedule", data);
};

let getDoctorSchedule = (doctorId, dateSelected) => {
  return axios.get(
    `/api/get-doctor-schedule-by-date?doctorId=${doctorId}&dateSelected=${dateSelected}`
  );
};

let getDoctorExtraInfor = (doctorId) => {
  return axios.get(`api/get-doctor-extra-infor-by-id?doctorId=${doctorId}`);
};

let getDoctorInforWhenBooking = (doctorId) => {
  return axios.get(
    `api/get-doctor-infor-when-booking-by-id?doctorId=${doctorId}`
  );
};

let findOrCreateBookingAppointment = (data) => {
  return axios.post("/api/find-or-create-booking-appointment", data);
};

let verifyBookingAppointment = (data) => {
  return axios.post("/api/verify-booking-appointment", data);
};

let createDetailSpecialty = (data) => {
  return axios.post("/api/create-detail-specialty", data);
};

let getSpecialty = (specialtyId) => {
  return axios.get(`/api/get-specialty?specialtyId=${specialtyId}`);
};

let editSpecialty = (data) => {
  return axios.post("/api/edit-specialty", data);
};

let getDoctorBySpecialty = (specialtyId) => {
  return axios.get(`/api/get-doctor-by-specialty?specialtyId=${specialtyId}`);
};

let getDoctorShowOnSpecialty = (doctorId) => {
  return axios.get(`/api/get-doctor-show-on-specialty?doctorId=${doctorId}`);
};

let createClinic = (data) => {
  return axios.post("/api/create-clinic", data);
};

let getDetailClinic = (clinicId) => {
  return axios.get(`/api/get-detail-clinic?clinicId=${clinicId}`);
};

let editDetailClinic = (data) => {
  return axios.post("/api/edit-detail-clinic", data);
};

let getAllClinic = () => {
  return axios.get("/api/get-all-clinic");
};

let getDoctorByClinic = (clinicId) => {
  return axios.get(`/api/get-doctor-by-clinic?clinicId=${clinicId}`);
};

let getAllPatientByDoctor = (doctorId) => {
  return axios.get(`/api/get-all-patient-by-doctor?doctorId=${doctorId}`);
};

let doctorConfirmExamination = (data) => {
  return axios.post("/api/doctor-confirm-examination", data);
};

let createHandbook = (data) => {
  return axios.post("/api/create-handbook", data);
};

let getHandbook = (handbookId) => {
  return axios.get(`/get-handbook?handbookId=${handbookId}`);
};

let editHandbook = (data) => {
  return axios.post("/api/edit-handbook", data);
};
export {
  handleLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
  editUser,
  getAllCode,
  getOutstandingDoctor,
  getAllDoctor,
  editOrCreateDetailDoctor,
  getDetailDoctor,
  editDetailDoctor,
  createBulkDoctorSchedule,
  getDoctorSchedule,
  getDoctorExtraInfor,
  getDoctorInforWhenBooking,
  findOrCreateBookingAppointment,
  verifyBookingAppointment,
  createDetailSpecialty,
  getSpecialty,
  editSpecialty,
  getDoctorBySpecialty,
  getDoctorShowOnSpecialty,
  createClinic,
  getDetailClinic,
  editDetailClinic,
  getAllClinic,
  getDoctorByClinic,
  getAllPatientByDoctor,
  doctorConfirmExamination,
  createHandbook,
  getHandbook,
  editHandbook,
};
