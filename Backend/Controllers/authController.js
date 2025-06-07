import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../Models/user.model.js";
import bcrypt from "bcrypt";
import { generateVarificationToken } from "../utils/generateVarificationToken.js";
import { generateJwtToken } from "../utils/generateJwtToken.js";
import { sendVerificationEmail } from "../Resend/email.js";
import { sendWelcomeEmail } from "../Resend/email.js";
import crypto from "crypto";
import {sendPasswordResetEmail} from "../Resend/email.js";
import {sendPasswordResetSuccessEmail} from "../Resend/email.js";
import { use } from "react";

// export const signup = async(req, res) => {
//     const { name, email, password } = req.body;
//     try {
//         if (!name || !email || !password) {
//             return new ApiError(400, "Please provide all the required fields");
//         }

//         const userAlreadyExists = await User.findOne({ email });

//         if (userAlreadyExists) {
//             return new ApiError(400, `User already exists with this email -> "${email}"`);
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const VarificationToken = generateVarificationToken();

//         const newUser = await User.create({
//             name,
//             email,
//             password: hashedPassword,
//             VarificationToken : VarificationToken,
//             VarificationExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 30 minutes
//         });

//         await newUser.save();
//         // return res.status(201).json({
//         //     success: true,
//         //     message: "User created successfully",
//         // })

//         generateJwtToken(res,newUser._id); // this can be wrong

//         await sendVerificationEmail(newUser.email, VarificationToken);
//         console.log(newUser._id);

//         return new ApiResponse(201, "User created successfully", {
//             newUser: {
//                 ...newUser._doc,
//                 password: undefined, // Exclude password from the response
//             }
//         });

//     } catch (error) {
//         return new ApiError(500, `Internal Server Error: ${error.message}`);
//     }
// };

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please provide all the required fields" });
        }

        const userAlreadyExists = await User.findOne({ email });

        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: `User already exists with this email -> "${email}"` });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const VarificationToken = generateVarificationToken();

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            VarificationToken: VarificationToken,
            VarificationExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });

        await newUser.save();

        generateJwtToken(res, newUser._id);

        await sendVerificationEmail(newUser.email, VarificationToken);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            newUser: {
                ...newUser._doc,
                password: undefined,
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal Server Error: ${error.message}` });
    }
};



export const login = async(req, res) => {
        const { email, password } = req.body;

        try {
            if (!email || !password) {
                return res.status(400).json({ success: false, message: "Please provide all the required fields" });
            }

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ success: false, message: `User not found with this email -> "${email}"` });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: "Invalid password" });
            }

            if (!user.isVarified) {
                return res.status(400).json({ success: false, message: "Please verify your email before logging in" });
            }

            const token = generateJwtToken(res, user._id);

            return res.status(200).json({
                success: true,
                message: "Login successful",
                user: {
                    ...user._doc,
                    password: undefined,
                },
                token
            });

        } catch (error) {
            return res.status(500).json({ success: false, message: `Internal Server Error: ${error.message}` });
        }
};

export const logout = async(req, res) => {
        res.clearCookie("token")
        res.status(200).json({ success: true, message: "Logout successful" });
};

export const forgotPassword = async(req, res) => {
        const { email } = req.body;
        try {
            const user = await User.findOne({email});
            if(!user) {
                return res.status(400).json({ success: false, message: `User not found with this email -> "${email}"` });
            }
            const resetPasswordToken = crypto.randomBytes(32).toString("hex");
            const resetPasswordExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 1 hour 
            user.resetPasswordToken = resetPasswordToken;
            user.resetPasswordExpiresAt = resetPasswordExpiresAt;

            await user.save();
            await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/resetpassword/${resetPasswordToken}`); // Assuming you have a function to send the reset password email
            return res.status(200).json({ success: true, message: "Password reset email sent successfully" });
        } catch (error) {
            console.error("Error in forgot password:", error);
            return res.status(500).json({ success: false, message: `Internal Server Error: ${error.message}` });
        }
};

export const resetPassword = async(req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        if (!newPassword) {
            return res.status(400).json({ success: false, message: "Please provide all the required fields" });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired password reset token" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        await sendPasswordResetSuccessEmail(user.email); // Assuming you have a function to send a confirmation email

        return res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.error("Error in reset password:", error);
        return res.status(500).json({ success: false, message: `Internal Server Error: ${error.message}` });
    }
}

export const emailverification = async(req, res) => {
        const {code} = req.body;
        try {
             const user = await User.findOne({ 
                VarificationToken: code,
                VarificationExpiresAt: { $gt: Date.now() } 
            });
            if(!user) {
                return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
            }
            user.isVarified = true;
            user.VarificationToken = undefined;
            user.VarificationExpiresAt = undefined;
            await user.save();

            await sendWelcomeEmail(user.email,user.name); // Assuming you have a function to send a welcome email
            return res.status(200).json({ success: true, message: "Email verified successfully" });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Internal Server Error: ${error.message}` });
        }
};

export const checkauth = async(req, res) => {
    try {
       const user =await User.findById(req.userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "User authenticated successfully",
            user:{...user._doc, password: undefined} // Exclude password from the response,
        });
    } catch (error) {
        console.error("Error in checkAuth:", error);
        return res.status(500).json({ success: false, message: `Internal Server Error: ${error.message}` });
    }
};  

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("name email resumeUrl");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};