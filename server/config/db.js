import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to DB`);
        // console.log(`connected to DB ${connection.connect.host}`)
    } catch (error) {
        console.log(error)
    }
}

export default connectDb;
 
