import { raw } from "body-parser";
import db from "../models/index";
let createClinic = async (inputData) => {
  try {
    let result = await db.Clinic.create({
      clinicId: inputData.clinicId,
      provinceId: inputData.provinceId,
      clinicAddress: inputData.clinicAddress,
      image: inputData.image,
      contentHTML: inputData.contentHTML,
      contentMarkdown: inputData.contentMarkdown,
    });
    if (result) {
      return {
        errCode: 0,
        errMessage: "Create clinic success!",
      };
    } else {
      return {
        errCode: 2,
        errMessage: "Create clinic failed!",
      };
    }
  } catch (e) {
    console.log(e);
  }
};

let getDetailClinic = async (clinicId) => {
  try {
    let result = await db.Clinic.findOne({
      where: { clinicId: clinicId },
      attributes: {
        exclude: ["id", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: db.Allcode,
          as: "clinicName",
          attributes: ["valueVi", "valueEn"],
        },
      ],
      raw: true,
      nest: true,
    });
    if (result) {
      return {
        errCode: 0,
        errMessage: "Get detail clinic success!",
        data: result,
      };
    } else {
      return {
        errCode: 2,
        errMessage: "Get detail clinic failed!",
        data: {},
      };
    }
  } catch (e) {
    console.log(e);
  }
};

let editDetailClinic = async (data) => {
  try {
    let result = await db.Clinic.findOne({
      where: { clinicId: data.clinicId },
      raw: false,
    });
    if (result) {
      result.provinceId = data.provinceId;
      result.clinicAddress = data.clinicAddress;
      result.image = data.image;
      result.contentHTML = data.contentHTML;
      result.contentMarkdown = data.contentMarkdown;
      await result.save();
      return {
        errCode: 0,
        errMessage: "Edit detail clinic success!",
      };
    } else {
      return {
        errCode: 2,
        errMessage: "Edit detail clinic failed!",
      };
    }
  } catch (e) {
    console.log(e);
  }
};

let getAllClinic = async () => {
  try {
    let result = await db.Clinic.findAll({
      attributes: ["clinicId", "image"],
      include: [
        {
          model: db.Allcode,
          as: "clinicName",
          attributes: ["valueVi", "valueEn"],
        },
      ],
      raw: true,
      nest: true,
    });
    if (result) {
      return {
        errCode: 0,
        errMessage: "Get all clinic success!",
        data: result,
      };
    } else {
      return {
        errCode: 2,
        errMessage: "Get all clinic falied!",
        data: {},
      };
    }
  } catch (e) {
    console.log(e);
  }
};

let getDoctorByClinic = async (clinicId) => {
  try {
    let result = await db.DoctorInfor.findAll({
      where: { clinicId: clinicId },
      attributes: ["doctorId", "specialtyId"],
    });
    if (result) {
      return {
        errCode: 0,
        errMessage: "Get doctorId by specialtyId success!",
        data: result,
      };
    } else {
      return {
        errCode: 2,
        errMessage: "Get doctorId by specialtyId failed!",
        data: {},
      };
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createClinic: createClinic,
  getDetailClinic: getDetailClinic,
  editDetailClinic: editDetailClinic,
  getAllClinic: getAllClinic,
  getDoctorByClinic: getDoctorByClinic,
};
