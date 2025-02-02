import mongoose from "mongoose"

const connectDB = async () => {

    try {
        await mongoose.connect(`${process.env.DB_URL}`);
        console.log("\n db connected secseccfully");

    } catch (error) {
        console.error("error", error);

    }

}

export default connectDB