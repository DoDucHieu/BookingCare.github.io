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

let handleEditOrCreateDetailDoctor = async (req, res) => {
  let inputData = req.body;
  if (!inputData) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing require parameter!",
    });
  }
  let response = await doctorServices.editOrCreateDetailDoctor(inputData);
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
  });
};

let handleGetDetailDoctor = async (req, res) => {
  let doctorId = req.query.id;
  if (!doctorId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing require parameter!",
    });
  }
  let response = await doctorServices.getDetailDoctor(doctorId);
  if (response) {
    return res.status(200).json({
      errCode: response.errCode,
      errMessage: response.errMessage,
      data: response.data,
    });
  } else {
    return res.status(500).json({
      errCode: 5,
      errMessage: "err from sever!",
    });
  }
};

let handleCreateBulkDoctorSchedule = async (req, res) => {
  let dataSchedule = req.body;
  if (!dataSchedule || dataSchedule.length === 0) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing parameter required!",
    });
  }
  let response = await doctorServices.createBulkDoctorSchedule(dataSchedule);
  if (response) {
    return res.status(200).json({
      errCode: response.errCode,
      errMessage: response.errMessage,
      data: response.data,
    });
  } else {
    return res.status(500).json({
      errCode: 5,
      errMessage: "err from sever!",
    });
  }
};
let handleGetDoctorScheduleByDate = async (req, res) => {
  let data = req.query;
  if (!data || !data.doctorId || !data.dateSelected) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing parameter required!",
    });
  }
  let response = await doctorServices.getDoctorScheduleByDate(data);
  if (response) {
    return res.status(200).json({
      errCode: response.errCode,
      errMessage: response.errMessage,
      data: response.data,
    });
  } else {
    return res.status(500).json({
      errCode: 5,
      errMessage: "err from sever!",
    });
  }
};
let handleGetDoctorExtraInforById = async (req, res) => {
  let data = req.query;
  if (!data || !data.doctorId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing parameter required!",
    });
  }
  let response = await doctorServices.getDoctorExtraInforById(data.doctorId);
  if (response) {
    return res.status(200).json({
      errCode: response.errCode,
      errMessage: response.errMessage,
      data: response.data,
    });
  } else {
    return res.status(500).json({
      errCode: 5,
      errMessage: "err from sever!",
    });
  }
};

let handleGetDoctorInforWhenBooking = async (req, res) => {
  let doctorId = req.query.doctorId;
  if (!doctorId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing require parameter!",
    });
  }
  let response = await doctorServices.getDoctorInforWhenBooking(doctorId);
  if (response) {
    return res.status(200).json({
      errCode: response.errCode,
      errMessage: response.errMessage,
      data: response.data,
    });
  } else {
    return res.status(500).json({
      errCode: 5,
      errMessage: "err from sever!",
    });
  }
};

module.exports = {
  handleGetTopDoctor: handleGetTopDoctor,
  handleGetAllDoctor: handleGetAllDoctor,
  handleEditOrCreateDetailDoctor: handleEditOrCreateDetailDoctor,
  handleGetDetailDoctor: handleGetDetailDoctor,
  handleCreateBulkDoctorSchedule: handleCreateBulkDoctorSchedule,
  handleGetDoctorScheduleByDate: handleGetDoctorScheduleByDate,
  handleGetDoctorExtraInforById: handleGetDoctorExtraInforById,
  handleGetDoctorInforWhenBooking: handleGetDoctorInforWhenBooking,
};
