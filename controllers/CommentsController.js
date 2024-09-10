import { Router } from "express";
import { verifyAToken } from "../middlewares/Auth.js";
import { Comments } from "../models/Comments.js";

const commentRouter = Router();
const comment = new Comments();

// Public routes
commentRouter.get('/all/:post_id', async (req, res) => {
    const { post_id } = req.params;
    const result = await comment.getComments(post_id);
    if (result.success) {
        if(result.result.length === 1) {
            res.status(200).json(result.result[0]);
        } else {
            res.status(200).json(result.result);    
        }
    } else {
        res.status(result.status || 500).json({ message: result.message || 'An error occurred' });
    }
});

commentRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await comment.getCommentById(id);
    if (result.success) {
        res.status(200).json(result.result[0]);
    } else {
        res.status(result.status || 500).json({ message: result.message || 'An error occurred' });
    }
});

// Private routes
commentRouter.post('/create', verifyAToken, async (req, res) => {
    const { content, post_id, user_id } = req.body;
    if (!content || !post_id || !user_id) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const result = await comment.createComment({ comment_text: content, post_id, user_id });
    if (result.success) {
        res.status(201).json(result.result);
    } else {
        res.status(result.status || 500).json({ message: result.message || 'An error occurred' });
    }
});

commentRouter.patch('/update/:id', verifyAToken, async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }
    const result = await comment.updateComment(id, { comment_text: content });
    if (result.success) {
        res.status(200).json(result.result);
    } else {
        res.status(result.status || 500).json({ message: result.message || 'An error occurred' });
    }
});

commentRouter.delete('/delete/:id', verifyAToken, async (req, res) => {
    const { id } = req.params;
    const result = await comment.deleteComment(id);
    if (result.success) {
        res.status(200).json(result.result);
    } else {
        res.status(result.status || 500).json({ message: result.message || 'An error occurred' });
    }
});

// Error handling
commentRouter.use((err, req, res, next) => {
    console.error('Unexpected error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

export default commentRouter;