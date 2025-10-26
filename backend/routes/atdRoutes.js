import { Router } from "express"
import { atdController } from "../controllers/atdController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const atdRoutes = Router();

atdRoutes.post('/add',authMiddleware, atdController)

export default atdRoutes;