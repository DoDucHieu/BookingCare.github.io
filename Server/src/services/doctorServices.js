import res from "express/lib/response";
import db from "../models/index";

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
let createDetailDoctor = async (data) => {
  try {
    let result = await db.Markdown.create({
      contentHTML: data.contentHTML,
      contentMarkdown: data.contentMarkdown,
      description: data.description,
      doctorId: data.doctorId,
    });
    if (result) {
      return {
        errCode: 0,
        errMessage: "Create detail doctor success!",
      };
    } else {
      return {
        errCode: 1,
        errMessage: "Err sever!",
      };
    }
  } catch (e) {
    console.log(e);
  }
};

let editDetailDoctor = async (data) => {
  try {
    let result = await db.Markdown.findOne({
      where: { doctorId: data.doctorId },
      raw: false,
    });
    if (!result) {
      return {
        errCode: 2,
        errMessage: "This markdown is not exists!",
      };
    } else {
      result.contentHTML = data.contentHTML;
      result.contentMarkdown = data.contentMarkdown;
      result.description = data.description;
      await result.save();
      return {
        errCode: 0,
        errMessage: "Edit detail doctor success!",
      };
    }
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
module.exports = {
  getTopDoctor: getTopDoctor,
  getAllDoctor: getAllDoctor,
  createDetailDoctor: createDetailDoctor,
  getDetailDoctor: getDetailDoctor,
  editDetailDoctor: editDetailDoctor,
};
