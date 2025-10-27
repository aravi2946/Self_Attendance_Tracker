import { Router } from "express"
import { addPreviousDataController, atdController } from "../controllers/atdController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const atdRoutes = Router();

atdRoutes.post('/add',authMiddleware, atdController)
atdRoutes.post('/add-prev',authMiddleware,addPreviousDataController)
export default atdRoutes;