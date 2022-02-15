import axios from "../axios";

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
};
