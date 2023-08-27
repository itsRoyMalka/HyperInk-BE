import User from "../models/user/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const signIn = async (req,res) =>{

    try{

        const {email, password} = req.body

        const user = await User.findOne({email: email})

        if(!user){
            return res.status(400).json({msg: "Invalid credentials"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({msg: "Invalid credentials"})
        }


        jwt.sign({

                isAdmin: user.isAdmin,
                id: user._id,
            },
            process.env.JWT_SECRET,  {expiresIn: "12h"}, (error,token) =>{
                if(error){
                    throw error;
                }


                return res.status(200).cookie('token', token).json({status: 200, message: "Sign in successfully", isAdmin: user.isAdmin, token:token})

            })


    }catch(error){
        res.status(500).json({error: error.message})
    }
}

export const signUp = async (req,res) =>{

    try{

        const {firstName, lastName, email, password, phone, address} = req.body

        const user = await User.findOne({email: email})

        if(user){
            return res.status(400).json({msg: "User already exist"})
        }

        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(password, salt)

        await User.create({
            firstName,
            lastName,
            email,
            password: hash,
            phone,
            address,
            orders: [],
            isAdmin: false
        })


        res.status(200).json({msg: "User Created Successfully"})

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

export const signOut = async (req,res) =>{

    try{

        res.clearCookie('token').status(200).json({message: "Signed out successfully"});

    }catch(error){
        res.status(500).json({error: error.message})
    }
}


