const sgMail = require("@sendgrid/mail");
let key =
  "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";
sgMail.setApiKey(key);
var nodemailer = require("nodemailer");

export const sendMail = (props) => {
  alert();

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ypradeeprao@gmail.com",
      pass: "Tir6tw3q@@",
    },
  });

  var mailOptions = {
    from: "ypradeeprao@gmail.com",
    to: "ypradeeprao@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
