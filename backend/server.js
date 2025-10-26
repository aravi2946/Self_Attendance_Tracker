import express from "express"
import "dotenv/config"
import connectToDB from "./db/db.js"
import userRouter from "./routes/userRoutes.js";
import atdRoutes from "./routes/atdRoutes.js";
const app = express();


//api end points
app.use(express.json())
app.use('/api/user',userRouter)
app.use('/api/atd',atdRoutes)
//database
connectToDB();

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at ${port}`);

})