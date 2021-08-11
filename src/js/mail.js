const sgMail = require("@sendgrid/mail");
let key =""
  

var nodemailer = require("nodemailer");

export const sendMail = (props) => {
  alert();

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
     
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
