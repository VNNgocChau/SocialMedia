import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

connectDB();
app.listen(port, (err) => {
	if (!err) {
		console.log(`App running successfully on port ${port}`);
	} else {
		console.log("fail to run server");
	}
});
