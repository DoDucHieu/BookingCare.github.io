import clinicServices from "../services/clinicServices";

let handleCreateClinic = async (req, res) => {
  let inputData = req.body;
  if (
    !inputData ||
    !inputData.clinicId ||
    !inputData.provinceId ||
    !inputData.clinicAddress ||
    !inputData.image ||
    !inputData.contentHTML ||
    !inputData.contentMarkdown
  ) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing require parameter!",
    });
  }
  let response = await clinicServices.createClinic(inputData);
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
  });
};

let handleGetDetailClinic = async (req, res) => {
  let clinicId = req.query.clinicId;
  if (!clinicId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing require parameter!",
    });
  }
  let response = await clinicServices.getDetailClinic(clinicId);
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
    data: response.data,
  });
};

let handleEditDetailClinic = async (req, res) => {
  let data = req.body;
  if (
    !data ||
    !data.clinicId ||
    !data.provinceId ||
    !data.clinicAddress ||
    !data.image ||
    !data.contentHTML ||
    !data.contentMarkdown
  ) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing require parameter!",
    });
  }
  let response = await clinicServices.editDetailClinic(data);
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
  });
};

let handleGetAllClinic = async (req, res) => {
  let response = await clinicServices.getAllClinic();
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
    data: response.data,
  });
};

let handleGetDoctorByClinic = async (req, res) => {
  let clinicId = req.query.clinicId;
  if (!clinicId) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing require parameter!",
    });
  }
  let response = await clinicServices.getDoctorByClinic(clinicId);
  return res.status(200).json({
    errCode: response.errCode,
    errMessage: response.errMessage,
    data: response.data,
  });
};

module.exports = {
  handleCreateClinic: handleCreateClinic,
  handleGetDetailClinic: handleGetDetailClinic,
  handleEditDetailClinic: handleEditDetailClinic,
  handleGetAllClinic: handleGetAllClinic,
  handleGetDoctorByClinic: handleGetDoctorByClinic,
};
