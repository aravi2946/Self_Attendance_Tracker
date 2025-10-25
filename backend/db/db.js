import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Database Connected Successfully");
        
        
    } catch (err) {
        console.log("Database Connection failed");
        process.exit(1);
        
    }
}

export default connectToDB;