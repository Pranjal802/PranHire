import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../Models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return new ApiError(400, "Please provide all the required fields");
        }

        const userAlreadyExists = await User.findOne({ email });

        if (userAlreadyExists) {
            return new ApiError(400, `User already exists with this email -> "${email}"`);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const VarificationToken = generateVarificationToken();

    } catch (error) {
        
    }
};




export const login = async(req, res) => {
        res.send('Login Route')
};
export const logout = async(req, res) => {
        res.send('Logout Route')
};
export const resetpassword = async(req, res) => {
        res.send('Reset Password  Route');
};
export const emailvarification = async(req, res) => {
        res.send('Email Varification Route');
};