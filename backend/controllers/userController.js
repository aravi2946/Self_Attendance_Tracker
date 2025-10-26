import bcrypt from "bcrypt"
import userModel from "../models/userSchema.js";
import jwt from "jsonwebtoken"


const createToken = (id,name) => {
    return jwt.sign({ id, name }, process.env.JWT_SECRET,{expiresIn:'7d'})
}

const registerController = async (req, res) => {
    const { name, email, password } = req.body;
     
    try {
        const normalizedEmail = email.toLowerCase();
        const isEmail = await userModel.findOne({ email })
        if (isEmail) {
            return res.status(409).json({ success: false, msg: "Email is Already registered" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new userModel({
            name,
            email:normalizedEmail,
            password:hashedPassword
        })

        await newUser.save();
       const token =  createToken(newUser._id,newUser.name)
        res.status(200).json({success:true,msg:"Registered Successfully",token})



    } catch (err) {
        console.log("Error in register controller", err);
        res.status(500).json({success:false,msg:"Internal Server Error"})

    }
}

const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const normalizedEmail = email.toLowerCase();
        const user = await userModel.findOne({ email:normalizedEmail })
        if (!user) {
          return res.status(404).json({success:false,msg:"User not found"})
        }

        const isPassword = await bcrypt.compare(password, user.password)
        
        if (!isPassword) {
            return res.status(401).json({success:false,msg:"Incorrect Password"})
        }
       
        const token = createToken(user._id,user.name)

        res.status(200).json({success:true,msg:"Login Success",token})


    } catch (err) {
        console.log("Error in Controller", err);
        res.status(500).json({ success: false, msg: "Internal Server Error" })
        
    }
}

export { registerController, loginController }