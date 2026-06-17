import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../service/mail.service.js';


export async function registerUser(req, res) {

    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await userModel.create({ username, email, password });

    const emailVerificationToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

    await sendEmail({
       to : email,
        subject : 'Welcome to Perplexity',
        html : `
        <h1>Welcome, ${username}!</h1><p>Thank you for registering at Perplexity. We're excited to have you on board!</p>
        Welcome, ${username}! Thank you for registering at Perplexity. We're excited to have you on board!
        <p>Please verify your email</p>
        <a href="http://localhost:5000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
        `
 });

      res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });


   




    }


    export async function loginUser(req, res) {
        const { email, password } = req.body;


        const user = await userModel.findOne({email})
              .select("+password");
        


        if(!user){
            return res.status(400).json({ message: 'Invalid email or password' });
        }

       const ismatchpassword = await user.comparePassword(password);


       if(!ismatchpassword){
        return res.status(400).json({ message: 'Invalid email or password' });
       }


       if(!user.verified){
        return res.status(400).json({ message: 'Please verify your email before logging in' });
       }


       const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);

       res.cookie('token', token,)

       res.status(200).json({ token, message: 'Login successful' });




    }



    export async function getMe(req, res) {
        const userId = req.user.userId;

        const user = await userModel.findById(userId);
        

        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User retrieved successfully',
            success: true,
            user,
        })
            
            

    }


    export async function verifyEmail(req, res) {
        const {token} = req.query;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({ email: decoded.email });


        if(!user){
            return res.status(400).json({ message: 'Invalid token or user does not exist' ,
                user:{
                    id : user._id,
                    username : user.username,
                    email : user.email,
                    

                }
            });
        }

     user.verified = true;

     await user.save();

     res.status(200).json({ message: 'Email verified successfully. You can now log in.' });


    }





