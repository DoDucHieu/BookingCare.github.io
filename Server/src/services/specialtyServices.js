import db from "../models/index";

let createSpecialty = async (data) => {
  try {
    let [specialty, created] = await db.Specialty.findOrCreate({
      where: { specialtyId: data.specialtyId },
      defaults: {
        specialtyId: data.specialtyId,
        contentHTML: data.contentHTML,
        contentMarkdown: data.contentMarkdown,
        image: data.image,
      },
    });
    if (specialty && created === true) {
      return {
        errCode: 0,
        errMessage: "Create specialty success!",
      };
    }
    return {
      errCode: 2,
      errMessage: "this specialty is already exists!",
    };
  } catch (e) {
    console.log(e);
  }
};

let getAllSpecialty = async (specialtyId) => {
  try {
    if (specialtyId === "ALL") {
      let result = await db.Specialty.findAll({
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.Allcode,
            as: "specialtyName",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      if (result) {
        return {
          errCode: 0,
          errMessage: "Get all specialty success!",
          data: result,
        };
      } else {
        return {
          errCode: 2,
          errMessage: "Get all specialty failed!",
          data: {},
        };
      }
    } else {
      let result = await db.Specialty.findOne({
        where: { specialtyId: specialtyId },
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.Allcode,
            as: "specialtyName",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      if (result) {
        return {
          errCode: 0,
          errMessage: "Get detail specialty success!",
          data: result,
        };
      } else {
        return {
          errCode: 2,
          errMessage: "Get detail specialty failed!",
          data: {},
        };
      }
    }
  } catch (e) {
    console.log(e);
  }
};

let editSpecialty = async (data) => {
  try {
    let result = await db.Specialty.findOne({
      where: { specialtyId: data.specialtyId },
      raw: false,
    });

    if (result) {
      result.contentHTML = data.contentHTML;
      result.contentMarkdown = data.contentMarkdown;
      result.image = data.image;
      await result.save();
      return {
        errCode: 0,
        errMessage: "Edit specialty success!",
      };
    } else {
      return {
        errCode: 2,
        errMessage: "This specialty is not exists!",
      };
    }
  } catch (e) {
    console.log(e);
  }
};

let getDoctorBySpecialty = async (specialtyId) => {
  try {
    let res = await db.DoctorInfor.findAll({
      where: { specialtyId: specialtyId },
      attributes: ["doctorId"],
      include: [
        {
          model: db.Clinic,
          attributes: ["provinceId"],
        },
      ],
      raw: true,
      nest: true,
    });
    if (res) {
      return {
        errCode: 0,
        errMessage: "Get doctor by specialtyId success!",
        data: res,
      };
    } else {
      return {
        errCode: 0,
        errMessage: "Get doctor by specialtyId failed!",
        data: {},
      };
    }
  } catch (e) {
    console.log(e);
  }
};

let getDoctorShowOnSpecialty = async (doctorId) => {
  try {
    let result = await db.User.findOne({
      where: { id: doctorId },
      attributes: ["positionId", "firstName", "lastName", "image"],
      include: [
        {
          model: db.Allcode,
          as: "positionData",
          attributes: ["valueVi", "valueEn"],
        },
        {
          model: db.Markdown,
          attributes: ["description"],
        },
        {
          model: db.DoctorInfor,
          attributes: {
            exclude: [
              "id",
              "createdAt",
              "updatedAt",
              "count",
              "paymentId",
              "priceId",
              "specialtyId",
              "note",
            ],
          },
          include: [
            {
              model: db.Clinic,
              attributes: ["provinceId"],
              include: [
                {
                  model: db.Allcode,
                  as: "provinceData",
                  attributes: ["valueVi", "valueEn"],
                },
              ],
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
        errMessage: "Get doctor to show on specialty success!",
        data: result,
      };
    } else {
      return {
        errCode: 2,
        errMessage: "This doctor is not exists!",
        data: {},
      };
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
  editSpecialty: editSpecialty,
  getDoctorBySpecialty: getDoctorBySpecialty,
  getDoctorShowOnSpecialty: getDoctorShowOnSpecialty,
};
