import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export async function registerUser(req, res) {

    const { username, email, password } = req.body;


    const exiistinguser = await userModel.findOne({ $or: [{ username }, { email }] });



    if (!existinguser) {
        return res.status(400).json({

            success: false, message: 'Username or email already exists' , err: "user already exists"
        });

    }

}