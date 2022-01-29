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
let getAllDoctor=()=>{
  return axios.get('/api/get-all-doctor');
}
// create detail doctor
let createDetailDoctor=(data)=>{
  return axios.post("/api/create-detail-doctor",data)
}
export {
  handleLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
  editUser,
  getAllCode,
  getOutstandingDoctor,
  getAllDoctor,
  createDetailDoctor
};
