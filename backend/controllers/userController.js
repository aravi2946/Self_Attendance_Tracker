import bcrypt from "bcrypt"
import userModel from "../models/userSchema.js";

const registerController = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const isEmail = await userModel.findOne({ email })
        if (isEmail) {
            return res.status(409).json({ success: false, msg: "Email is Already registered" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        await newUser.save();
        res.status(200).json({success:true,msg:"Registered Successfully"})



    } catch (err) {
        console.log("Error in register controller",err);

    }
}

const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        
        const user = await userModel.findOne({ email })
        if (!user) {
          return res.status(201).json({success:false,msg:"User not found"})
        }

        const isPassword = await bcrypt.compare(password, user.password)
        
        if (!isPassword) {
            return res.status(401).json({success:false,msg:"Incorrect Password"})
        }
        res.status(200).json({success:true,msg:"Login Success"})


    } catch (err) {
        console.log("Error in Controller",err);
        
    }
}

export { registerController, loginController }