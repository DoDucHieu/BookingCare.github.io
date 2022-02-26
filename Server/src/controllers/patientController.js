import patientServices from "../services/patientServices";

let handleFindOrCreateBookingAppointment = async (req, res) => {
  let data = req.body;
  if (!data || !data.email || !data.doctorId || !data.timeType || !data.date) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing require parameter!",
    });
  }
  let response = await patientServices.findOrCreateBookingAppointment(data);
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
  });
};

let handleVerifyBookingAppointment = async (req, res) => {
  let data = req.body;
  if (!data || !data.token || !data.doctorId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing parameter required!",
    });
  }
  let response = await patientServices.verifyBookingAppointment(
    data.doctorId,
    data.token
  );
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
  });
};

let handleGetAllPatientByDoctor = async (req, res) => {
  let doctorId = req.query.doctorId;
  if (!doctorId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing query string parameter!",
    });
  }
  let response = await patientServices.getAllPatientByDoctor(doctorId);
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
    data: response.data,
  });
};

let handleDoctorConfirmExamination = async (req, res) => {
  let data = req.body;
  if (
    !data ||
    !data.doctorId ||
    !data.patientId ||
    !data.email ||
    !data.date ||
    !data.timeType
  ) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing query string parameter!",
    });
  }
  let response = await patientServices.doctorConfirmExamination(data);
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
  });
};

module.exports = {
  handleFindOrCreateBookingAppointment: handleFindOrCreateBookingAppointment,
  handleVerifyBookingAppointment: handleVerifyBookingAppointment,
  handleGetAllPatientByDoctor: handleGetAllPatientByDoctor,
  handleDoctorConfirmExamination: handleDoctorConfirmExamination,
};
