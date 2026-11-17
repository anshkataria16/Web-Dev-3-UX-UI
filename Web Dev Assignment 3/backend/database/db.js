import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected Successfully");
    }
    catch (error) {
        console.log("Database Connection Error");
        console.log(error);
        throw error;
    }
};

export default connectDB;