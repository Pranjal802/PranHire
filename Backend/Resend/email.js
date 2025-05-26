import { resend } from "./config.js"
import { sendWelcomeEmailTemplate, verificationEmailTemplate } from "./email_template.js";
import { ApiError } from "../utils/ApiError.js";
// import { verificationEmailTemplate } from "./email_template.js";

export const sendVerificationEmail = async (email, VarificationToken) => {
    try {
         const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [email], // email associated with resent account
        subject: "Verify your email now..!!",
        html: verificationEmailTemplate(VarificationToken),
  });
    } catch (error) {
        console.error("Error sending verification email:", error);
        return new ApiError(500, `Internal Server Error: ${error.message}`);
    }
}

export const sendWelcomeEmail = async(email, name) => {
    try {
        const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [email], // email associated with resent account
        subject: "Welcome to PranHire...!!",
        html: sendWelcomeEmailTemplate.replace("{name}", name),
        });
    } catch (error) {
        console.error("Error sending welcome email:", error);
        return new ApiError(500, `Internal Server Error: ${error.message}`);
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [email], // email associated with resent account
        subject: "Reset your password...!!",
        html: `<p>Click <a href="${resetURL}">here</a> to reset your password.</p>`,
        });
    }catch (error) {
        console.error("Error sending password reset email:", error);
        return new ApiError(500, `Internal Server Error: ${error.message}`);
    }
};

export const sendPasswordResetSuccessEmail = async (email) => {
    try {
        const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [email], // email associated with resent account
        subject: "Password reset successfully...!!",
        html: `Password was reset successfully...!!`,
        });
    }catch (error) {
        console.error("Error sending password reset email:", error);
        return new ApiError(500, `Internal Server Error: ${error.message}`);
    }
};