import bcrypt from "bcrypt"
import userModel from "../models/userSchema.js";
import jwt from "jsonwebtoken"



const createToken = (id,name,email,role) => {
    return jwt.sign({ id, name,email,role }, process.env.JWT_SECRET,{expiresIn:'7d'})
}
const commonDomains = ["gmail.com", "yahoo.com", "outlook.com"];
function validateDomain(email) {
    const domain = email.split("@")[1];
    return commonDomains.includes(domain);
}

const registerController = async (req, res) => {
    const { name, email, password } = req.body;
     
    try {
        const normalizedEmail = email.toLowerCase();
        const isEmail = await userModel.findOne({ email })
     
        
        if (!validateDomain(email)) {
            return res.status(404).json({success:false,msg:'Invalid Email'})
        }
        if (isEmail) {
            return res.status(404).json({ success: false, msg: "Email is Already registered" })
        }
       
        if (!(password.length> 8)) {
            return res.status(404).json({success:false,msg:"Password must be greater than 8 characters"})
        }
       
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new userModel({
            name,
            email:normalizedEmail,
            password:hashedPassword
        })

        await newUser.save();
       
       
        const token = createToken(newUser._id, newUser.name,newUser.email,newUser.role)
        
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
       
        //session
       
        const token = createToken(user._id,user.name,user.email,user.role)

        res.status(200).json({success:true,msg:"Login Success",token})


    } catch (err) {
        console.log("Error in Controller", err);
        res.status(500).json({ success: false, msg: "Internal Server Error" })
        
    }
}

export { registerController, loginController }