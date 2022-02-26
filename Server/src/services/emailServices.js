require("dotenv").config();
import nodemailer from "nodemailer";

//USING WHEN PATIENT BOOKING AN APPOINTMENT, SEND MAIL TO ASK PATIENT TO CONFIRM
let SMTP_AskPatientToConfirm = async (data, token) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.APP_EMAIL, // generated ethereal user
      pass: process.env.APP_PASSWORDS, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: `"BookingCare" <${process.env.APP_EMAIL}>`, // sender address
    to: data.email, // list of receivers
    subject: "BookingCare", // Subject line
    // text: "Xin chao anh ban!", // plain text body
    html: formatEmailSendWhenAskPatientToConfirm(data, token), // html body
  });
};

let formatEmailSendWhenAskPatientToConfirm = (data, token) => {
  let mailDetail = "";
  let linkRedirect = `${process.env.URL_REACT}/verify-booking-schedule?doctorId=${data.doctorId}&token=${token}`;
  if (data.language === "vi") {
    mailDetail = `
    <h3>Xin chào ${data.patientFullName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên trang BookingCare</p>
    <h4>Thông tin lịch khám:</h4>
    <p>Thời gian: ${data.timeString}</p>
    <p>Bác sỹ:${data.doctorFullName}</p>
    <h4>Thông tin khách hàng:</h4>
    <p>Họ và tên: ${data.patientFullName}</p>
    <p>Ngày sinh:${data.dateOfBirth}</p>
    <p>Số điện thoại:${data.phoneNumber}</p>
    <p>Địa chỉ:${data.patientAddressContact}</p>
    <p>Lí do khám:${data.reason}</p>
    <p>Nếu thông tin trên là đúng, bạn vui lòng ấn vào đường link bên dưới để xác nhận đặt lịch khám!</p>
    <a href=${linkRedirect} target="_blank">Xác nhận tại đây</a>
    <p>Trân trọng!</p>
    `;
  }
  if (data.language === "en") {
    mailDetail = `
    <h3>Dear ${data.patientFullName}!</h3>
    <p>You received this email because you booked an online medical appointment on BookingCare</p>
    <h4>Information on examination schedule:</h4>
    <p>Time: ${data.timeString}</p>
    <p>Doctor:${data.doctorFullName}</p>
    <h4>Customer information:</h4>
    <p>Full name: ${data.patientFullName}</p>
    <p>Date of bỉth:${data.dateOfBirth}</p>
    <p>Phone number:${data.phoneNumber}</p>
    <p>Address contact:${data.patientAddressContact}</p>
    <p>Reason for examination:${data.reason}</p>
    <p>If the above information is correct, please click on the link below to confirm your appointment!</p>
    <a href=${linkRedirect} target="_blank">Confirm here</a>
    <p>Best regard!</p>
    `;
  }
  return mailDetail;
};

let SMTP_DoctorSendBillToPatient = async (data) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORDS,
    },
  });

  let info = await transporter.sendMail({
    from: `"BookingCare" <${process.env.APP_EMAIL}>`,
    to: data.email,
    subject: "BookingCare",
    html: formatEmailDoctorSendBillToPatient(data),
    attachments: [
      {
        filename: `${data.patientId}_${data.fullName}.png`,
        content: data.billImg.split("base64,")[1],
        encoding: "base64",
      },
    ],
  });
};

let formatEmailDoctorSendBillToPatient = (data) => {
  let mailDetail = "";
  if (data.language === "vi") {
    mailDetail = `
    <h3>Xin chào ${data.fullName}</h3>
    <p>Bạn nhận được email này vì bạn đã hoàn tất quá trình khám bệnh tại BookingCare. Dưới đây là thông tin hóa đơn</p>
    <p>Trân trọng!</p>
    `;
  }
  if (data.language === "en") {
    mailDetail = `
    <h3>Dear ${data.fullName}!</h3>
    <p>You are receiving this email because you have completed your medical examination at BookingCare. Below is the invoice information:</p>
    <p>Best regard!</p>
    `;
  }
  return mailDetail;
};

module.exports = {
  SMTP_AskPatientToConfirm: SMTP_AskPatientToConfirm,
  SMTP_DoctorSendBillToPatient: SMTP_DoctorSendBillToPatient,
};
