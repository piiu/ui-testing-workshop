import {Box, Chip, IconButton, Typography} from "@mui/material";
import {ThumbDown, ThumbUp} from "@mui/icons-material";
import {Post} from "../types.ts";
import {addLikeToPost} from "../api/dummyjson.ts";
import {useState} from "react";

interface PostListItemProps {
    post2: Post
}

const PostListItem = ({post2}: PostListItemProps) => {
    const [post, setPost] = useState<Post>(post2) // I am a horrible human being and should never develop front-end

    const addLike = () => {
        addLikeToPost(post)
            .then(post => {
                if (!post.reactions) {
                    post.reactions = {
                        likes: 0,
                        dislikes: 0
                    }
                }
                post.reactions.likes = post.reactions.likes + 1
                setPost(post)
            })
            .catch(console.error)
    }

    return (
        <Box mb={2}>
            <Typography variant="h6">{post.title}</Typography>
            <Typography>{post.body}</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="flex-end">
                <Box title="tags" display="flex" gap={1}>
                    {post.tags.map(tag => (<Chip key={tag} label={tag} size="small" />))}
                </Box>
                <Box title="reactions" display="flex" justifyContent="space-between" gap={1}>
                    <Box display="flex" alignItems="center">
                        <Typography title="likes" component="span">{post.reactions?.likes ?? 0}</Typography>
                        <IconButton title={`Like ${post.title}`} onClick={addLike}><ThumbUp /></IconButton>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Typography title="dislikes" component="span">{post.reactions?.dislikes ?? 0}</Typography>
                        <IconButton title={`Dislike ${post.title}`}><ThumbDown /></IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default PostListItem
