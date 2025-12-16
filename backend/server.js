import express from "express"
import "dotenv/config"
import connectToDB from "./db/db.js"
import userRouter from "./routes/userRoutes.js";
import atdRoutes from "./routes/atdRoutes.js";
import cors from "cors"
import adminRoutes from "./routes/adminRoutes.js";
import morgan from "morgan";
const app = express();



//api end points
app.use(express.json())
app.use(cors())
app.use('/api/user', userRouter)
app.use('/api/atd', atdRoutes)
app.use('/api/admin', adminRoutes)
app.use(morgan('dev'))
//database
connectToDB();



const port = process.env.PORT || 3000;
app.get('/', () => {
    res.send("Welcome")
})
app.listen(port, () => {
    console.log(`Server running at ${port}`);

})