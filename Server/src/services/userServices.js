import db from "../models/index";
import bcrypt from "bcryptjs";
let salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["id", "email", "roleId", "password", "firstName"],
          where: { email: email },
          // raw: true,
        });
        if (user) {
          let check = bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "login success!";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "password is incorrect!";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "User not found!";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "your email is not exists!";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { email: userEmail } });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = "";
      if (userId === "ALL") {
        user = await db.User.findAll({
          // order: [["id", "DESC"]],
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        user = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (err) {
      reject(err);
    }
  });
};
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkEmail(data.email);
      if (check) {
        resolve({
          errCode: 2,
          errMessage: "This Email is already exist!",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          phoneNumber: data.phoneNumber,
          address: data.address,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.avatar,
        });
        resolve({
          errCode: 0,
          errMessage: "Create new user success!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let editUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userData.id },
        raw: false,
      });
      if (!user) {
        resolve({
          errCode: 2,
          errMessage: "This User is not exists!",
        });
      }
      user.firstName = userData.firstName;
      user.lastName = userData.lastName;
      user.address = userData.address;
      user.phoneNumber = userData.phoneNumber;
      user.gender = userData.gender;
      user.roleId = userData.roleId;
      user.positionId = userData.positionId;
      user.image = userData.avatar;
      await user.save();
      resolve({
        errCode: 0,
        errMessage: "Edit User success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: userId } });
      console.log(user);
      if (!user) {
        resolve({
          errCode: 2,
          errMessage: "This User is not exists!",
        });
      }
      await db.User.destroy({
        where: { id: userId },
      });
      resolve({
        errCode: 0,
        errMessage: "Delete User success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllCode = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Allcode.findAll({
        where: { type: typeInput },
        attributes: {
          exclude: ["createdAt", "updatedAt", "id"],
        },
      });
      if (!data) {
        resolve({
          errCode: 2,
          errMessage: "This type is not exists!",
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "Get all code success!",
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  editUser: editUser,
  getAllCode: getAllCode,
};
