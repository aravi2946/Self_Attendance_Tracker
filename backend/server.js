import express from "express"
import "dotenv/config"
import connectToDB from "./db/db.js"
import userRouter from "./routes/userRoutes.js";
import atdRoutes from "./routes/atdRoutes.js";
import cors from "cors"
import adminRoutes from "./routes/adminRoutes.js";
const app = express();



//api end points
app.use(express.json())
app.use(cors())
app.use('/api/user', userRouter)
app.use('/api/atd', atdRoutes)
app.use('/api/admin',adminRoutes)
//database
connectToDB();



const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at ${port}`);

})