import db from "../models/index";
import emailServices from "./emailServices";
import { v4 as uuidv4 } from "uuid";

let findOrCreateBookingAppointment = async (data) => {
  try {
    let [user, created] = await db.User.findOrCreate({
      where: { email: data.email },
      defaults: {
        email: data.email,
        roleId: "R3",
        firstName: data.patientFullName,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        address: data.patientAddressContact,
      },
    });
    if (user) {
      let token = uuidv4();
      let [result, created] = await db.Booking.findOrCreate({
        where: {
          patientId: user.id,
          doctorId: data.doctorId,
          date: data.date,
          timeType: data.timeType,
        },
        defaults: {
          doctorId: data.doctorId,
          patientId: user.id,
          statusId: "S1",
          date: data.date,
          timeType: data.timeType,
          token: token,
        },
      });
      console.log("check result booking: ", result);
      console.log("check created booking: ", created);
      if (result && created === true) {
        await emailServices.SMTP_AskPatientToConfirm(data, token);
      } else {
        return {
          errCode: 2,
          errMessage:
            "This appointment is already exists, please book another date or time!",
        };
      }
    }
    return {
      errCode: 0,
      errMessage: "successful!",
    };
  } catch (e) {
    console.log(e);
  }
};

let verifyBookingAppointment = async (doctorId, token) => {
  try {
    let result = await db.Booking.findOne({
      where: {
        doctorId: doctorId,
        token: token,
        statusId: "S1",
      },
      raw: false,
    });
    if (result) {
      result.statusId = "S2";
      await result.save();
      return {
        errCode: 0,
        errMessage: "Verify booking appointment success!",
      };
    } else {
      return {
        errCode: 2,
        errMessage: "This booking appointment doesn't exists!",
      };
    }
  } catch (e) {
    console.log(e);
  }
};

let getAllPatientByDoctor = async (doctorId) => {
  try {
    let result = await db.Booking.findAll({
      where: { doctorId: doctorId, statusId: "S2" },
      attributes: ["doctorId", "patientId", "date", "timeType"],
      include: [
        {
          model: db.User,
          as: "patientData",
          attributes: ["email", "firstName", "address", "phoneNumber"],
        },
        {
          model: db.Allcode,
          as: "patientTimeData",
          attributes: ["valueVi", "valueEn"],
        },
      ],
      raw: false,
      nest: true,
    });
    if (result) {
      return {
        errCode: 0,
        errMessage: "Get all patient by doctoc success!",
        data: result,
      };
    } else {
      return {
        errCode: 2,
        errMessage: "Get all patient by doctoc failed!",
        data: {},
      };
    }
  } catch (e) {
    console.log(e);
  }
};

let doctorConfirmExamination = async (data) => {
  try {
    let result = await db.Booking.findOne({
      where: {
        doctorId: data.doctorId,
        patientId: data.patientId,
        date: data.date,
        timeType: data.timeType,
        statusId: "S2",
      },
      raw: false,
    });
    if (result) {
      result.statusId = "S3";
      await result.save();
      await emailServices.SMTP_DoctorSendBillToPatient(data);
      return {
        errCode: 0,
        errMessage: "Doctor confirm examination success!",
      };
    } else {
      return {
        errCode: 2,
        errMessage: "This examination is not exists!",
      };
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  findOrCreateBookingAppointment: findOrCreateBookingAppointment,
  verifyBookingAppointment: verifyBookingAppointment,
  getAllPatientByDoctor: getAllPatientByDoctor,
  doctorConfirmExamination: doctorConfirmExamination,
};
