import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

const getNewFeedPost = async (req, res) => {
	try {
		const userId = req.user.userId;

		// avoid owner post
		const currentUser = await User.findById(userId).populate("following");
		if (!currentUser) {
			return res.status(404).json({ message: "User not found" });
		}

		// Get posts from followers
		const followerId = currentUser.following.map((follower) => follower._id);
		const followerPost = await Post.find({ userId: { $in: followerId } });

		// Get recommended posts (excluding those from followers)
		const recommendedPosts = await Post.find({
			userId: { $nin: [...followerId, userId] },
		}).limit(10);

		//  Combine and shuffle the posts
		const combinedPosts = [...followerPost, ...recommendedPosts];
		const shuffledPosts = combinedPosts.sort(() => 0.5 - Math.random());

    if (!shuffledPosts.length) {
      return res.status(404).json({ message: "No posts available" });
    }
	} catch (err) {
		res.status(500).json({ message: "Error getting posts for feed", err });
	}
};

const getUserPost = async (req, res) => {
	try {
		const userPost = await Post.find({
			userId: req.user.userId,
		});
		if (!userPost || userPost.length == 0) {
			return res.status(404).json({ message: "No posts found for this user" });
		}
		res.status(200).json({ userPost });
	} catch (err) {
		res.status(500).json({ message: "Err getting user post" }, err);
	}
};

const createPost = async (req, res) => {
	try {
		const newPost = new Post({
			userId: req.user.userId,
			image: req.body.image,
			caption: req.body.caption,
		});
		await newPost.save();
		res.status(201).json({ message: "Post created successfully", newPost });
	} catch (err) {
		res.status(500).json({ message: "Error creating post", err });
	}
};

const modifyPost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
		if (post.userId.toString() !== req.user.userId) {
			return res
				.status(403)
				.json({ message: "You are not authorized to modify this post" });
		}
		post.image = req.body.image || post.image;
		post.caption = req.body.caption || post.caption;

		await post.save();
		res.status(200).json({ message: "Post update successfully", post });
	} catch (err) {
		res.status(500).json({ message: "Error modify post", err });
	}
};

const deletePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
		if (post.userId.toString() !== req.user.userId) {
			return res
				.status(403)
				.json({ message: "You are not authorized to delete this post" });
		}

		await post.deleteOne();
		res.status(200).json({ message: "Post deleted successfully" });
	} catch (err) {
		res.status(500).json({ message: "Error delete post", err });
	}
};

export default {
	getNewFeedPost,
	getUserPost,
	createPost,
	modifyPost,
	deletePost,
};
