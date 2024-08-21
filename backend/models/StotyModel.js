import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		image: { type: String, required: true },
		text: { type: String },
		expiresAt: { type: Date, required: true },
	},
	{ timestamps: true }
);

const Story = mongoose.model("Story", storySchema);

export default Story;
