import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		friendId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "accepted", "declined"],
			default: "pending",
		},
	},
	{ timestamps: true }
);

const FriendShip = mongoose.model("FriendShip", friendshipSchema);
export default FriendShip;
