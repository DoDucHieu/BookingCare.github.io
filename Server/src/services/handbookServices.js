import db from "../models/index";

let createHandbook = async (data) => {
  try {
    let result = await db.Handbook.create({
      handbookName: data.handbookName,
      handbookImg: data.handbookImg,
      contentHTML: data.contentHTML,
      contentMarkdown: data.contentMarkdown,
    });
    if (result) {
      return {
        errCode: 0,
        errMessage: "Create handbook success!",
      };
    } else {
      return {
        errCode: 2,
        errMessage: "Create handbook failed!",
      };
    }
  } catch (e) {
    console.log(e);
  }
};

let getHandbook = async (handbookId) => {
  try {
    let result;
    if (handbookId === "ALL") {
      result = await db.Handbook.findAll({
        attributes: [
          "id",
          "handbookName",
          "contentHTML",
          "contentMarkdown",
          "handbookImg",
        ],
      });
      if (result) {
        return {
          errCode: 0,
          errMessage: "Get all handbook success!",
          data: result,
        };
      } else {
        return {
          errCode: 2,
          errMessage: "Get all handbook failed!",
        };
      }
    }
    if (handbookId !== "ALL") {
      result = await db.Handbook.findOne({
        where: { id: handbookId },
        attributes: [
          "id",
          "handbookName",
          "contentHTML",
          "contentMarkdown",
          "handbookImg",
        ],
      });
      if (result) {
        return {
          errCode: 0,
          errMessage: "Get handbook success!",
          data: result,
        };
      } else {
        return {
          errCode: 2,
          errMessage: "Get handbook failed!",
        };
      }
    }
  } catch (e) {
    console.log(e);
  }
};

let editHandbook = async (data) => {
  try {
    let result = await db.Handbook.findOne({
      where: { id: data.handbookId },
      raw: false,
    });
    if (result) {
      result.handbookName = data.handbookName;
      result.handbookImg = data.handbookImg;
      result.contentHTML = data.contentHTML;
      result.contentMarkdown = data.contentMarkdown;
      await result.save();
      return {
        errCode: 0,
        errMessage: "Edit handbook success!",
      };
    } else {
      return {
        errCode: 2,
        errMessage: "Edit handbook failed!",
      };
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createHandbook: createHandbook,
  getHandbook: getHandbook,
  editHandbook: editHandbook,
};
