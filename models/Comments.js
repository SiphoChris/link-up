import { db } from '../config/index.js';

export class Comments {
    async getComments(postId) {
        const queryString = 'SELECT * FROM Comments WHERE post_id = ? ORDER BY created_at DESC';
        try {
            const [rows] = await db.execute(queryString, [postId]);

            if (rows.length === 0) {
                return { success: false, status: 404, message: 'No comments found' };
            }

            return { success: true, status: 200, result: rows };
        } catch (err) {
            console.error('Error fetching comments for post:', err);
            return { success: false, message: err.message };
        }
    }

    async getCommentById(id) {
        const queryString = 'SELECT * FROM Comments WHERE comment_id = ?';
        try {
            const [rows] = await db.execute(queryString, [id]);
            if (rows.length === 0) {
                return { success: false, status: 404, message: 'Comment not found' };
            }
            return { success: true, result: rows[0] };
        } catch (err) {
            console.error('Error fetching comment by ID:', err);
            return { success: false, status: 500, message: err.message };
        }
    }


    async getCommentsByPostId(postId) {
        const queryString = `
            SELECT 
                Comments.comment_id,
                Comments.comment_text,
                Comments.created_at,
                Users.username,
                Users.profile_picture
            FROM Comments
            JOIN Users ON Comments.user_id = Users.user_id
            WHERE Comments.post_id = ?
            ORDER BY Comments.created_at DESC
        `;
        try {
            const [rows] = await db.execute(queryString, [postId]);
    
            if (rows.length === 0) {
                return { success: false, status: 404, message: 'No comments found' };
            }
    
            return { success: true, status: 200, result: rows };
        } catch (err) {
            console.error('Error fetching comments for post:', err);
            return { success: false, message: err.message };
        }
    }
    

    async createComment(comment) {
        const queryString = 'INSERT INTO Comments (comment_text, post_id, user_id) VALUES (?, ?, ?)';
        try {
            const [result] = await db.execute(queryString, [comment.comment_text, comment.post_id, comment.user_id]);
            if (result.affectedRows === 0) {
                return { success: false, status: 404, message: 'Failed to create comment' };
            }
            return { success: true, status: 201, result: { id: result.insertId } };
        } catch (err) {
            console.error('Error creating comment:', err);
            return { success: false, status: 500, message: err.message };
        }
    }

    async updateComment(id, comment) {
        const queryString = 'UPDATE Comments SET comment_text = ? WHERE comment_id = ?';
        try {
            const [result] = await db.execute(queryString, [comment.comment_text, id]);
            if (result.affectedRows === 0) {
                return { success: false, status: 404, message: 'Comment not found' };
            }
            return { success: true, status: 200, result: { id } };
        } catch (err) {
            console.error('Error updating comment:', err);
            return { success: false, status: 500, message: err.message };
        }
    }

    async deleteComment(id) {
        const queryString = 'DELETE FROM Comments WHERE comment_id = ?';
        try {
            const [result] = await db.execute(queryString, [id]);
            if (result.affectedRows === 0) {
                return { success: false, status: 404, message: 'Comment not found' };
            }
            return { success: true, status: 200, result: { id } };
        } catch (err) {
            console.error('Error deleting comment:', err);
            return { success: false, status: 500, message: err.message };
        }
    }
}
