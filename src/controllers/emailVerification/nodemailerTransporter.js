import nodemailer from "nodemailer";
  
  
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "pmjuniorcomtec@gmail.com", // generated ethereal user
      pass: "zknjjbuaifidlipl", // generated ethereal password
    },
  });

export default transporter;