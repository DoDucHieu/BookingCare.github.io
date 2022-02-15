// import res from "express/lib/response";
import db from "../models/index";
import _ from "lodash";

let getTopDoctor = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.User.findAll({
        limit: limitInput,
        order: [["createdAt", "DESC"]],
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        errMessage: "Get top doctor success!",
        data: res,
      });
    } catch (e) {
      reject("ERR FROM .CATCH :", e);
    }
  });
};

let getAllDoctor = async () => {
  try {
    let result = await db.User.findAll({
      where: { roleId: "R2" },
      attributes: {
        exclude: ["password", "image"],
      },
    });
    if (result) {
      return {
        errCode: 0,
        errMessage: "Get all doctor success!",
        data: result,
      };
    } else {
      return {
        errCode: 1,
        errMessage: "Error from sever!",
      };
    }
  } catch (e) {
    return {
      errCode: 1,
      errMessage: "Error from sever!",
    };
  }
};
let editOrCreateDetailDoctor = async (data) => {
  try {
    let checkExistsMarkdown = await db.Markdown.findOne({
      where: { doctorId: data.doctorId },
      raw: false,
    });
    let checkExistsDoctorInfor = await db.DoctorInfor.findOne({
      where: { doctorId: data.doctorId },
      raw: false,
    });
    let resultMarkdown, resultDoctorInfor;
    if (!checkExistsMarkdown) {
      resultMarkdown = await db.Markdown.create({
        contentHTML: data.contentHTML,
        contentMarkdown: data.contentMarkdown,
        description: data.description,
        doctorId: data.doctorId,
      });
      console.log("======check result markdown:", resultMarkdown);
    } else {
      checkExistsMarkdown.contentHTML = data.contentHTML;
      checkExistsMarkdown.contentMarkdown = data.contentMarkdown;
      checkExistsMarkdown.description = data.description;
      await checkExistsMarkdown.save();
    }
    if (!checkExistsDoctorInfor) {
      resultDoctorInfor = await db.DoctorInfor.create({
        doctorId: data.doctorId,
        priceId: data.priceId,
        provinceId: data.provinceId,
        paymentId: data.paymentId,
        nameClinic: data.nameClinic,
        addressClinic: data.addressClinic,
        note: data.note,
      });
      console.log("======check result DoctorInfor:", resultDoctorInfor);
    } else {
      checkExistsDoctorInfor.priceId = data.priceId;
      checkExistsDoctorInfor.provinceId = data.provinceId;
      checkExistsDoctorInfor.paymentId = data.paymentId;
      checkExistsDoctorInfor.nameClinic = data.nameClinic;
      checkExistsDoctorInfor.addressClinic = data.addressClinic;
      checkExistsDoctorInfor.note = data.note;
      await checkExistsDoctorInfor.save();
    }
    return {
      errCode: 0,
      errMessage: "handle success!",
    };
    // if (checkExistsMarkdown && checkExistsDoctorInfor) {
    //   return {
    //     errCode: 0,
    //     errMessage: "Edit detail doctor success!",
    //   };
    // } else if (resultMarkdown && resultDoctorInfor) {
    //   return {
    //     errCode: 0,
    //     errMessage: "Create detail doctor success!",
    //   };
    // } else {
    //   return {
    //     errCode: 1,
    //     errMessage: "Err from sever!",
    //   };
    // }
  } catch (e) {
    console.log(e);
  }
};

let getDetailDoctor = async (doctorId) => {
  try {
    let result = await db.User.findOne({
      where: { id: doctorId },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: db.Markdown,
          attributes: ["contentHTML", "contentMarkdown", "description"],
        },
        {
          model: db.Allcode,
          as: "positionData",
          attributes: ["valueEn", "valueVi"],
        },
        {
          model: db.DoctorInfor,
          attributes: [
            "provinceId",
            "priceId",
            "paymentId",
            "nameClinic",
            "addressClinic",
            "note",
          ],
          include: [
            {
              model: db.Allcode,
              as: "priceData",
              attributes: ["valueEn", "valueVi", "keyMap"],
            },
            {
              model: db.Allcode,
              as: "provinceData",
              attributes: ["valueEn", "valueVi", "keyMap"],
            },
            {
              model: db.Allcode,
              as: "paymentData",
              attributes: ["valueEn", "valueVi", "keyMap"],
            },
          ],
        },
      ],
      raw: true,
      nest: true,
    });
    if (result) {
      return {
        errCode: 0,
        errMessage: "get detail doctor success!",
        data: result,
      };
    } else {
      return {
        errCode: 2,
        errMessage: "error from sever!",
      };
    }
  } catch (e) {
    console.log(e);
  }
};

let createBulkDoctorSchedule = async (dataSchedule) => {
  try {
    let arrSchedule = dataSchedule.map((item) => {
      item.maxNumber = 10;
      item.date = new Date(item.date).getTime();
      return item;
    });
    let existing = await db.Schedule.findAll({
      where: { doctorId: arrSchedule[0].doctorId, date: arrSchedule[0].date },
      attributes: ["doctorId", "date", "timeType", "maxNumber"],
      raw: true,
    });
    if (existing && existing.length > 0) {
      existing = existing.map((item) => {
        item.date = new Date(item.date).getTime();
        return item;
      });
    }
    let dataDifferent = _.differenceWith(arrSchedule, existing, (a, b) => {
      return a.timeType === b.timeType && a.date === b.date;
    });
    if (dataDifferent && dataDifferent.length > 0) {
      let result = await db.Schedule.bulkCreate(dataDifferent);
      if (result) {
        return {
          errCode: 0,
          errMessage: "create doctor schedule success!",
          data: dataDifferent,
        };
      }
    }

    return {
      errCode: 0,
      errMessage: "create doctor schedule success!",
      data: existing,
    };
  } catch (e) {
    console.log(e);
  }
};

let getDoctorScheduleByDate = async (data) => {
  try {
    let result = await db.Schedule.findAll({
      where: {
        doctorId: data.doctorId,
        date: new Date(data.dateSelected).getTime(),
      },
      attributes: ["doctorId", "date", "timeType", "maxNumber"],
      include: [
        {
          model: db.Allcode,
          as: "timeData",
          attributes: ["valueEn", "valueVi"],
        },
      ],
      raw: true,
      nest: true,
    });
    if (result && result.length > 0) {
      return {
        errCode: 0,
        errMessage: "Get doctor schedule by date success!",
        data: result,
      };
    } else {
      return {
        errCode: 2,
        errMessage: "error from sever!",
        data: [],
      };
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getTopDoctor: getTopDoctor,
  getAllDoctor: getAllDoctor,
  editOrCreateDetailDoctor: editOrCreateDetailDoctor,
  getDetailDoctor: getDetailDoctor,
  createBulkDoctorSchedule: createBulkDoctorSchedule,
  getDoctorScheduleByDate: getDoctorScheduleByDate,
};
