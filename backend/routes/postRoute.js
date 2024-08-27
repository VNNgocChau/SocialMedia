import express from "express";
import postController from "../controllers/postController.js";
import authenticateToken from "../middleware/authenticateMiddleware.js";

const postRoute = express.Router();

postRoute.get("/newfeed", authenticateToken, postController.getNewFeedPost);
postRoute.get("/userPost", authenticateToken, postController.getUserPost);
postRoute.post("/create-post", authenticateToken, postController.createPost);
postRoute.put("/modify-post", authenticateToken, postController.modifyPost);
postRoute.delete("/delete-post", authenticateToken, postController.deletePost);

export default postRoute;
