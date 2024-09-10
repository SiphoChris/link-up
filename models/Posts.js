import { db } from '../config/index.js';
import { Comments } from './Comments.js';

export class Posts {
    constructor() {
        this.comments = new Comments();
    }

    async getPosts() {
        const queryString = 'SELECT * FROM Posts ORDER BY created_at DESC';
        try {
            const [rows] = await db.execute(queryString);
            if (rows.length === 0) {
                return { success: false, status: 404, message: 'No posts found' };
            }
            return { success: true, result: rows };
        } catch (err) {
            console.error('Error getting posts:', err);
            return { success: false, status: 500, message: err.message };
        }
    }

    async getPostById(id) {
        const postQuery = 'SELECT * FROM Posts WHERE post_id = ?';
        try {
            const [postRows] = await db.execute(postQuery, [id]);

            if (postRows.length === 0) {
                return { success: false, status: 404, message: 'Post not found' };
            }

            // Fetch comments related to this post
            const commentsResponse = await this.comments.getCommentsByPostId(id);

            // Include the comments in the post response
            return {
                success: true,
                result: {
                    ...postRows[0],
                    comments: commentsResponse.success ? commentsResponse.result : []
                }
            };
        } catch (err) {
            console.error('Error getting post by ID:', err);
            return { success: false, status: 500, message: err.message };
        }
    }

    async createPost(post) {
        const queryString = 'INSERT INTO Posts (content) VALUES (?)';
        try {
            const [result] = await db.execute(queryString, [post.content]);
            if (result.affectedRows === 0) {
                return { success: false, status: 404, message: 'Failed to create post' };
            }
            return { success: true, status: 201, result: { id: result.insertId } };
        } catch (err) {
            console.error('Error creating post:', err);
            return { success: false, status: 500, message: err.message };
        }
    }

    async deletePost(id) {
        const queryString = 'DELETE FROM Posts WHERE post_id = ?';
        try {
            const [result] = await db.execute(queryString, [id]);
            if (result.affectedRows === 0) {
                return { success: false, status: 404, message: 'Post not found' };
            }
            return { success: true, status: 200, result: { id } };
        } catch (err) {
            console.error('Error deleting post:', err);
            return { success: false, status: 500, message: err.message };
        }
    }

    async updatePost(id, post) {
        const queryString = 'UPDATE Posts SET content = ? WHERE post_id = ?';
        try {
            const [result] = await db.execute(queryString, [post.content, id]);
            if (result.affectedRows === 0) {
                return { success: false, status: 404, message: 'Post not found' };
            }
            return { success: true, status: 201, result: { id } };
        } catch (err) {
            console.error('Error updating post:', err);
            return { success: false, message: err.message };
        }
    }
}