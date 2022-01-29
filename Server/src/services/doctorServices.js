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
module.exports = {
  getTopDoctor: getTopDoctor,
  getAllDoctor: getAllDoctor,
  createDetailDoctor: createDetailDoctor,
};
