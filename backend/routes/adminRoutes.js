import {Router} from "express"
import { deleteAccController, usersAdminController } from "../controllers/adminControllers.js"


const adminRoutes = Router()

adminRoutes.get('/usersList', usersAdminController)
adminRoutes.delete('/deleteUser/:id',deleteAccController)

export default adminRoutes;