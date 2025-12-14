import atdModel from "../models/AtdSchema.js";
import userModel from "../models/userSchema.js";


const usersAdminController = async (req, res) => {
    try {

            const usersList = await userModel.find().select('name email')
            const allUsersAtd = await atdModel.find().select('userId result updatedAt ')
            const list = [...usersList]
            const list1 = [...allUsersAtd]
            const combined = list.map(user => {
                const match = list1.find(a => String(a.userId) === String(user._id))
                return {
                    name: user.name,
                    email: user.email,
                    result: match?.result,
                    updatedAt:match?.updatedAt
                    
                }
            })
        
        res.json(combined)
        // res.json(list1)
        // console.log(list1);

        // return res.json({list:usersList,length:usersList.length})


    } catch (err) {
        console.log("Error in usersAdminController", err);

    }
}

const usersAtdAdminController = async (req, res) => {
    try {
        res.json(allUsersAtd)
    } catch (err) {
        console.log("Error in usersAtdAdminController", err);

    }
}


export { usersAdminController, usersAtdAdminController }