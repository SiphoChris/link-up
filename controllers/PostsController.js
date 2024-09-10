import { Router } from "express";
import { Posts } from "../models/Posts.js";
import { verifyAToken } from "../middlewares/Auth.js";

const postRouter = Router();
const post = new Posts();

// Public routes
postRouter.get('/all', async (req, res) => {
    const result = await post.getPosts();
    if (result.success) {
        if(result.result.length === 1) {
            res.status(200).json(result.result[0]);
        } else {
            res.status(200).json(result.result);
        }
    } else {
        res.status(result.status).json({ message: result.message });
    }
});

postRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await post.getPostById(id);
    if (result.success) {
        res.status(200).json(result.result[0]);
    } else {
        res.status(result.status).json({ message: result.message });
    }
});

// Private routes
postRouter.post('/create', verifyAToken, async (req, res) => {
    const { content } = req.body;
    const result = await post.createPost({ content });
    if (result.success) {
        res.status(201).json(result.result);
    } else {
        res.status(result.status).json({ message: result.message });
    }
});

postRouter.delete('/delete/:id', verifyAToken, async (req, res) => {
    const { id } = req.params;
    const result = await post.deletePost(id);
    if (result.success) {
        res.status(200).json(result.result);
    } else {
        res.status(result.status).json({ message: result.message });
    }
});

postRouter.patch('/update/:id', verifyAToken, async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const result = await post.updatePost(id, { content });
    if (result.success) {
        res.status(200).json(result.result);
    } else {
        res.status(result.status).json({ message: result.message });
    }
});

// Error handling
postRouter.use((err, req, res, next) => {
    console.error('Unexpected error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

export default postRouter;