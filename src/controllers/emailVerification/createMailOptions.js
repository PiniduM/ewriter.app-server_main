const createMail = (mailAddress, verificationCode) => {
  // setup email data with unicode symbols
  return {
    from: '"e Writer" <pmjunior@gmail.com>', // sender address
    to: mailAddress, // list of receivers
    subject: "Verification Code", // Subject line
    text: `Your verification code is: ${verificationCode}`, // plain text body
    html: `<table style="width: 500px; margin: 0 auto; border-collapse: collapse;">
                  <tr>
                  <td style="background-color: #FFF5F1; padding: 20px; text-align: center;">
                  <h1>e Writer</h1>
                  </td>
                  </tr>
                  <tr>
                      <td style="background-color: #f5f5f5; padding: 20px; font-size: 18px; text-align: center;">
                          <p>Verification Code</p>
                          <p style="font-size: 30px;"><b><span style="letter-spacing: 0.1rem;">${verificationCode}</span></b></p>
                      </td>
                      </tr>
                      <tr>
                      <td style="background-color: #f5f5f5; padding: 20px; font-size: 14px; text-align: center;">
                      <p>This code will expire in 10 minutes.</p>
                      <p>Please use it to verify your account.</p>
                      </td>
                      </tr>
                      <tr>
                      <td style="background-color: #FFF5F1; padding: 20px; text-align: center;">
                      <p>Copyright © e Writer</p>
                      </td>
                      </tr>
                      </table>`,
    // html body
  };
};

export default createMail;
