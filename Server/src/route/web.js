import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import handbookController from "../controllers/handbookController";

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

  // CRUD USER
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

  // PATIENT
  router.post(
    "/api/find-or-create-booking-appointment",
    patientController.handleFindOrCreateBookingAppointment
  );
  router.post(
    "/api/verify-booking-appointment",
    patientController.handleVerifyBookingAppointment
  );
  router.get(
    "/api/get-all-patient-by-doctor",
    patientController.handleGetAllPatientByDoctor
  );

  router.post(
    "/api/doctor-confirm-examination",
    patientController.handleDoctorConfirmExamination
  );

  //SPECIALTY

  router.post(
    "/api/create-detail-specialty",
    specialtyController.handleCreateSpecialty
  );
  router.get("/api/get-specialty", specialtyController.handleGetAllSpecialty);
  router.post("/api/edit-specialty", specialtyController.handleEditSpecialty);

  router.get(
    "/api/get-doctor-by-specialty",
    specialtyController.handleGetDoctorBySpecialty
  );

  router.get(
    "/api/get-doctor-show-on-specialty",
    specialtyController.handleGetDoctorShowOnSpecialty
  );

  //CLINIC
  router.post("/api/create-clinic", clinicController.handleCreateClinic);
  router.get("/api/get-detail-clinic", clinicController.handleGetDetailClinic);
  router.post(
    "/api/edit-detail-clinic",
    clinicController.handleEditDetailClinic
  );
  router.get("/api/get-all-clinic", clinicController.handleGetAllClinic);
  router.get(
    "/api/get-doctor-by-clinic",
    clinicController.handleGetDoctorByClinic
  );

  //HANDBOOK
  router.post("/api/create-handbook", handbookController.handleCreateHandbook);
  router.get("/get-handbook", handbookController.handleGetHandbook);
  router.post("/api/edit-handbook", handbookController.handleEditHandbook);

  return app.use("/", router);
};

module.exports = initWebRoutes;
