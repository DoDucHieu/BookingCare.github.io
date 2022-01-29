import bcrypt from "bcryptjs";
import db from "../models/index";
let salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender === "1" ? true : false,
                phoneNumber: data.phoneNumber,
                address: data.address,
                roleId: data.roleId,
            });
            resolve("ok create new user success!!!");
        } catch (err) {
            reject(err);
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

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({ raw: true });
            resolve(users);
        } catch (err) {
            reject(err);
        }
    });
};

let editUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = await db.User.findOne({ where: { id: userId } });
            if (userData) {
                resolve(userData);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

let putUser = (userData) => {
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
    try {
        return new Promise(async (resolve, reject) => {
            let user = await db.User.findOne({ where: { id: userId } });
            console.log(user);
            if (user) {
                await db.User.destroy({
                    where: { id: userId },
                });
                resolve("delete success!");
            } else {
                resolve("delete failue!");
            }
        });
    } catch (e) {
        reject(e);
    }
};
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    editUser: editUser,
    putUser: putUser,
    deleteUser: deleteUser,
};
