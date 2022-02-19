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
      },
    });

    if (user && created === true) {
      let token = uuidv4();
      let [result, created] = await db.Booking.findOrCreate({
        where: { patientId: user.id },
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
        await emailServices.simpleMailTransferProtocol(data, token);
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

module.exports = {
  findOrCreateBookingAppointment: findOrCreateBookingAppointment,
  verifyBookingAppointment: verifyBookingAppointment,
};
