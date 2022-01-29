import doctorServices from "../services/doctorServices";

let handleGetTopDoctor = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) {
    limit = 10;
  }
  let response = await doctorServices.getTopDoctor(+limit);
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
    data: response.data,
  });
};

let handleGetAllDoctor = async (req, res) => {
  let response = await doctorServices.getAllDoctor();
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
    data: response.data,
  });
};

let handleCreateDetailDoctor = async (req, res) => {
  let inputData = req.body;
  if (!inputData) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing require parameter!",
    });
  }
  let response = await doctorServices.createDetailDoctor(inputData);
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
  });
};
module.exports = {
  handleGetTopDoctor: handleGetTopDoctor,
  handleGetAllDoctor: handleGetAllDoctor,
  handleCreateDetailDoctor: handleCreateDetailDoctor,
};
