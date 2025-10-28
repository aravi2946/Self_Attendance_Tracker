import { Router } from "express"
import { addPreviousDataController, atdController, fetchAtdController, fetchTodayAtdController, resetAtdDataController } from "../controllers/atdController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const atdRoutes = Router();

atdRoutes.post('/add',authMiddleware, atdController)
atdRoutes.post('/add-prev', authMiddleware, addPreviousDataController)
atdRoutes.get('/', authMiddleware, fetchAtdController)
atdRoutes.post('/today', authMiddleware, fetchTodayAtdController)
atdRoutes.put('/reset',authMiddleware,resetAtdDataController)

export default atdRoutes;