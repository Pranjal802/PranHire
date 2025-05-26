
export function verificationEmailTemplate(VerificationToken) {
  return `
<!DOCTYPE html>
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body style="background-color:#fff;color:#212121">
    <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0" data-skip-in-text="true">
      PranHire Email Verification
    </div>
    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:37.5em;padding:20px;margin:0 auto;background-color:#eee">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#fff">
              <tbody>
                <tr>
                  <td>
                    <h1 style="color:#333;font-size:20px;font-weight:bold;margin-bottom:15px">
                      Verify your email address
                    </h1>
                    <p style="font-size:14px;line-height:24px;color:#333;margin:24px 0;">
                      Thanks for signing up with <strong>PranHire</strong>! To get started, please verify your email address by entering the verification code below when prompted. If you didn’t sign up, you can safely ignore this message.
                    </p>
                    <p style="font-size:14px;line-height:24px;color:#333;font-weight:bold;text-align:center;">
                      Your Verification Code
                    </p>
                    <p style="font-size:36px;line-height:24px;color:#333;font-weight:bold;text-align:center;">
                      ${VerificationToken}
                    </p>
                    <p style="font-size:14px;line-height:24px;color:#333;text-align:center;">
                      (This code is valid for 10 minutes)
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />
            <p style="font-size:12px;line-height:24px;color:#333;margin:24px 0;padding:0 20px;">
              This message was sent to you by <strong>PranHire</strong>, your personalized career assistant powered by AI. For questions or support, visit 
              <a href="https://pranhire.com" style="color:#2754C5;text-decoration:underline;" target="_blank">pranhire.com</a>.
              <br /><br />
              © 2025, PranHire. All rights reserved.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>

`;
}

export const sendWelcomeEmailTemplate =  `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body style='background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'>
    <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0" data-skip-in-text="true">
      Welcome to PranHire – Your personalized job and resume assistant powered by AI.
    </div>
    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
      <tbody>
        <tr style="width:100%">
          <td>
            <img
              alt="PranHire"
              height="50"
              src="https://PranHire.com/logo.png"
              style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto"
              width="170" />
            <p style="font-size:16px;line-height:26px;margin-top:16px;margin-bottom:16px">
              Hi {name},
            </p>
            <p style="font-size:16px;line-height:26px;margin-top:16px;margin-bottom:16px">
              Welcome to <strong>PranHire</strong>, your smart job assistant powered by AI. Let’s verify your email so you can start building your resume, tracking jobs, and applying with confidence.
            </p>
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="text-align:center">
              <tbody>
                <tr>
                  <td>
                    <a
                      href="https://pranhire.com/verify"
                      style="line-height:100%;text-decoration:none;display:block;max-width:100%;background-color:#4F46E5;border-radius:4px;color:#fff;font-size:16px;text-align:center;padding:12px 24px"
                      target="_blank">
                      Verify Your Email
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <p style="font-size:16px;line-height:26px;margin-top:16px;margin-bottom:16px">
              Best,<br />The PranHire Team
            </p>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
            <p style="font-size:12px;line-height:24px;color:#8898aa;margin-top:16px;margin-bottom:16px">
              PranHire Inc. · Your AI-powered job and resume platform · © 2025
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>

`;


// export const sendPasswordResetEmailTemplate = `
// `