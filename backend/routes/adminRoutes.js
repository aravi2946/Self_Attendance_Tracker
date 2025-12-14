import {Router} from "express"
import { usersAdminController, usersAtdAdminController } from "../controllers/adminControllers.js"


const adminRoutes = Router()

adminRoutes.get('/usersList', usersAdminController)
adminRoutes.get('/usersAtdList',usersAtdAdminController)

export default adminRoutes;