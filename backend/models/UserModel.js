import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		nametag: { type: String, required: true, unique: true },
		email: { type: String, required: true },
		phoneNumber: { type: Number, required: true },
		password: { type: String, required: true },
		profilePicture: { type: String, default: "" },
		bio: { type: String, default: "" },
		followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
		savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
