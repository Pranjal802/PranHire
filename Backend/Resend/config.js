import { Resend } from "resend";
import express, {request,response} from "express";
import dotenv from 'dotenv'
dotenv.config();

export const resend = new Resend(process.env.RESEND_API_KEY)