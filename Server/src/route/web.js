import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";

let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAbout);
  router.get("/crud", homeController.getCRUD); //display form add new user
  router.post("/post-crud", homeController.postCRUD); //add new user
  router.get("/get-crud", homeController.displayGetCRUD); //display list user
  router.get("/edit-crud", homeController.editCRUD); //display form edit user
  router.post("/put-crud", homeController.putCRUD); // put cannot submit with form
  router.get("/delete-crud", homeController.deleteCRUD); //delete user

  // API

  // CRUD API
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-user", userController.handleGetAllUser);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);

  // DOCTOR
  router.get("/api/get-all-code", userController.handleGetAllCode);
  router.get("/api/get-top-doctor", doctorController.handleGetTopDoctor);
  router.get("/api/get-all-doctor", doctorController.handleGetAllDoctor);
  router.post(
    "/api/edit-or-create-detail-doctor",
    doctorController.handleEditOrCreateDetailDoctor
  );
  router.get("/api/get-detail-doctor", doctorController.handleGetDetailDoctor);
  router.post(
    "/api/post-bulk-doctor-schedule",
    doctorController.handleCreateBulkDoctorSchedule
  );
  router.get(
    "/api/get-doctor-schedule-by-date",
    doctorController.handleGetDoctorScheduleByDate
  );
  router.get(
    "/api/get-doctor-extra-infor-by-id",
    doctorController.handleGetDoctorExtraInforById
  );
  router.get(
    "/api/get-doctor-infor-when-booking-by-id",
    doctorController.handleGetDoctorInforWhenBooking
  );

  return app.use("/", router);
};

module.exports = initWebRoutes;
