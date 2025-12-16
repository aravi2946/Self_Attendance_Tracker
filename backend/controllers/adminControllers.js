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
                    id:user._id,
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


const deleteAccController = async (req, res) => {
    let { id } = req.params
  
    try{
        let findUser = await userModel.findById(id )
        if (!findUser) {
            return res.status(404).json({success:false,msg:"User not found"})
        }
        
        await userModel.findByIdAndDelete(id)
        await atdModel.deleteMany({userId:id})
        res.status(200).json({success:true,msg:'Account Deleted Successfully'})
    } catch (err) {
        console.log('error in deleteAccController');
        res.status(500).json({msg:"Internal Server error"})
        
    }
}


export { usersAdminController, deleteAccController }