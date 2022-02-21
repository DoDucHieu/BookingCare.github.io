import specialtyServices from "../services/specialtyServices";

let handleCreateSpecialty = async (req, res) => {
  let inputData = req.body;
  if (
    !inputData ||
    !inputData.specialtyId ||
    !inputData.image ||
    !inputData.contentHTML ||
    !inputData.contentMarkdown
  ) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing require parameter!",
    });
  }
  let response = await specialtyServices.createSpecialty(inputData);
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
  });
};

let handleGetAllSpecialty = async (req, res) => {
  let specialtyId = req.query.specialtyId;
  if (!specialtyId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing require parameter!",
    });
  }
  let response = await specialtyServices.getAllSpecialty(specialtyId);
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
    data: response.data,
  });
};

let handleEditSpecialty = async (req, res) => {
  let inputData = req.body;
  if (
    !inputData ||
    !inputData.specialtyId ||
    !inputData.image ||
    !inputData.contentHTML ||
    !inputData.contentMarkdown
  ) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing require parameter!",
    });
  }
  let response = await specialtyServices.editSpecialty(inputData);
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
  });
};

let handleGetDoctorBySpecialty = async (req, res) => {
  let specialtyId = req.query.specialtyId;
  if (!specialtyId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing require parameter!",
    });
  }
  let response = await specialtyServices.getDoctorBySpecialty(specialtyId);
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
    data: response.data,
  });
};

let handleGetDoctorShowOnSpecialty = async (req, res) => {
  let doctorId = req.query.doctorId;
  if (!doctorId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing require parameter!",
    });
  }
  let response = await specialtyServices.getDoctorShowOnSpecialty(doctorId);
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
    data: response.data,
  });
};

module.exports = {
  handleCreateSpecialty: handleCreateSpecialty,
  handleGetAllSpecialty: handleGetAllSpecialty,
  handleEditSpecialty: handleEditSpecialty,
  handleGetDoctorBySpecialty: handleGetDoctorBySpecialty,
  handleGetDoctorShowOnSpecialty: handleGetDoctorShowOnSpecialty,
};
