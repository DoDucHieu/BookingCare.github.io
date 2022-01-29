import db from "../models/index";
import CRUDservices from "../services/CRUDservices";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.send(JSON.stringify(data));
    } catch (e) {
        console.log(e);
    }
};

let getAbout = async (req, res) => {
    res.send("hello world from server");
};

let getCRUD = async (req, res) => {
    res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
    let message = await CRUDservices.createNewUser(req.body);
    console.log(message);
    return res.send("post-crud success");
};

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservices.getAllUser();
    return res.render("display-getCRUD.ejs", {
        data: data,
    });
};

let editCRUD = async (req, res) => {
    let userId = req.query.id;
    let userData = await CRUDservices.editUser(userId);
    if (userData) {
        res.render("edit-CRUD.ejs", { userData: userData });
    } else {
        res.send("Không tồn tại User!");
    }
};

let putCRUD = async (req, res) => {
    let userData = req.body;
    if (!userData) {
        return res.status(500).json({
            errCode: 1,
            errMessage: "Missing parameters required!",
        });
    }
    let resultUpdate = await CRUDservices.putUser(userData);
    return res.status(200).json({
        errCode: resultUpdate.errCode,
        errMessage: resultUpdate.errMessage,
    });
    // return res.redirect("/get-crud");
};
let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    let result = await CRUDservices.deleteUser(userId);
    res.send(result);
};
module.exports = {
    getHomePage: getHomePage,
    getAbout: getAbout,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
};
