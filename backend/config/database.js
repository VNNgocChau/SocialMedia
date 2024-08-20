import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.mongoConnection);
		console.log("DB connected");
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};
export default connectDB;
