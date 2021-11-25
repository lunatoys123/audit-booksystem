const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let transporter = nodemailer.createTransport({
  host: "10.3.1.16",
  port: 25,
  secure: false,
});

transporter.verify((err, sucess) => {
  err ? console.log(err) : console.log("Server ready to sent message");
});

app.post("/SendEmail", (req, res) => {
  const email = req.body.email;
  const BorrowBookComputerNo = req.body.BorrowBookComputerNo;
  const DueDate = req.body.DueDate;
  const EmployeeName = req.body.EmployeeName;
  let mailOptions = {
    from: "AuditBookSystem@aud.gov.hk",
    to: `${email}`,
    subject: "Audit book System Reminder",
    html: `<p>Dear ${EmployeeName}:</p><p>Book (Computer No: ${BorrowBookComputerNo} ) is closed to return date, you can return the book before ${DueDate} or renew the book by visiting the headquarters</p>`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Send Email successfully");
      res.send(data);
    }
  });
});

app.listen(3002, () => {
  console.log("MailPort: Listen to 3002");
});
