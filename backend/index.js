import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/api/user-management", userRoute);
app.use("/api/post-management", postRoute);

connectDB();

app.listen(port, (err) => {
	if (!err) {
		console.log(`App running successfully on port ${port}`);
	} else {
		console.log("fail to run server");
	}
});
