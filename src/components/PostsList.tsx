import {useEffect, useMemo, useState} from "react";
import Loader from "./Loader.tsx";
import {createPost, CreatePost, fetchPosts, Post} from "../api/dummyjson.ts";
import PostCard from "./PostCard.tsx";
import {Box, Button, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import NewPostDialog from "./NewPostDialog.tsx";

const PostsList = () => {
    const [posts, setPosts] = useState<Post[]|undefined>(undefined)
    const [addPostDialogOpen, setAddPostDialogOpen] = useState(false)

    useEffect(() => {
        fetchPosts().then(setPosts)
    }, [])

    const openAddPostDialog = () => setAddPostDialogOpen(true)
    const closeAddPostDialog = () => setAddPostDialogOpen(false)
    const savePost = (post: CreatePost) => {
        createPost(post)
            .then(post => {
                setPosts(
                    (prevState) => prevState
                        ? [post, ...prevState]
                        : [post]
                )
            })
            .finally(() => {
                closeAddPostDialog()
            })
    }

    const tags = useMemo(() => {
        return new Set(posts?.flatMap((post) => post.tags))
    }, [posts]);

    return (
        <Loader isLoading={!posts}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-end">
                <Typography variant="h4" component="h2">Posts</Typography>
                <Button onClick={openAddPostDialog} startIcon={<Add />}>Add post</Button>
            </Box>
            <Box>
                {posts?.map((post) => <PostCard key={post.id} post={post} />)}
            </Box>
            <NewPostDialog
                isOpen={addPostDialogOpen}
                handleClose={closeAddPostDialog}
                handleSave={savePost}
                existingTags={Array.from(tags)}
            />
        </Loader>
    )
}

export default PostsList
