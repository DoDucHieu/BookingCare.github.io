require("dotenv").config();
import nodemailer from "nodemailer";

let simpleMailTransferProtocol = async (data, token) => {
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
    // text: "Xin chao anh ban nheeeee!", // plain text body
    html: formatEmailSend(data, token), // html body
  });
};

let formatEmailSend = (data, token) => {
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
    <a href=${data.linkRedirect} target="_blank">Confirm here</a>
    <p>Best regard!</p>
    `;
  }
  return mailDetail;
};

module.exports = { simpleMailTransferProtocol: simpleMailTransferProtocol };
