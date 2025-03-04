import { useState } from "react";
import { Avatar, TextField, Typography, Button } from "@mui/material";
import { useGetCommentsByVideoQuery, useCreateCommentMutation } from "../../redux/api/commentApi";

const CommentsSection = ({ videoId }) => {

    const [commentText, setCommentText] = useState("");
    const { data, isLoading } = useGetCommentsByVideoQuery(videoId);
    const [createComment, { isLoading: isPosting }] = useCreateCommentMutation();

    const handleCommentSubmit = async () => {
        if (!commentText) return;
        const res = await createComment({ videoId, content: commentText });
        console.log(res);

        setCommentText("");
    };

    return (
        <div className="mt-8">
            <Typography
                variant="h6"
                className="mb-10 font-semibold"
                sx={{ marginBottom: 4, marginTop: 4 }}
            >
                Comments
            </Typography>

            {/* Comment Input */}
            <div className="flex items-start space-x-3 gap-3">
                <Avatar alt="User" />
                <TextField
                    placeholder="Add a comment..."
                    multiline
                    fullWidth
                    rows={2}
                    variant="outlined"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={handleCommentSubmit}
                    disabled={isPosting}
                >
                    {isPosting ? "Posting..." : "Post"}
                </Button>
            </div>

            {/* Show Comments */}
            <div className="mt-6 space-y-4">
                {isLoading ? (
                    <Typography>Loading comments...</Typography>
                ) : data?.comments?.length ? (
                    data.comments.map((comment) => (
                        <div
                            key={comment._id}
                            className="flex items-start space-x-3"
                        >
                            <Avatar alt={comment.commentBy.name} />
                            <div>
                                <Typography variant="subtitle2" color="secondary">
                                    {comment.commentBy.name}
                                </Typography>
                                <Typography variant="body2">{comment.content}</Typography>
                            </div>
                        </div>
                    ))
                ) : (
                    <Typography>No comments yet.</Typography>
                )}
            </div>
        </div>
    );
};

export default CommentsSection;
