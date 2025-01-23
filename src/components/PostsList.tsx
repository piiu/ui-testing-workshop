import {useEffect, useMemo, useState} from "react";
import Loader from "./Loader.tsx";
import {createPost, fetchPosts} from "../api/dummyjson.ts";
import PostListItem from "./PostListItem.tsx";
import {Box, Button, Input, Typography} from "@mui/material";
import {Add, Search} from "@mui/icons-material";
import NewPostDialog from "./NewPostDialog.tsx";
import {CreatePost, Post} from "../types.ts";

const PostsList = () => {
    const [filteredPosts, setFilteredPosts] = useState<Post[]|undefined>(undefined)
    const [allPosts, setAllPosts] = useState<Post[]|undefined>(undefined)
    const [addPostDialogOpen, setAddPostDialogOpen] = useState(false)
    const [query, setQuery] = useState<string>('')

    useEffect(() => {
        fetchPosts().then(r => {
            setAllPosts(r);
            filterPosts('', r);
        })
    }, [])

    const openAddPostDialog = () => setAddPostDialogOpen(true)
    const closeAddPostDialog = () => setAddPostDialogOpen(false)
    const savePost = (post: CreatePost) => {
        createPost(post)
            .then(post => {
                const posts = [post, ...allPosts!!];
                setAllPosts(posts);
                setQuery('');
                filterPosts('', posts);
            })
            .catch(console.error)
            .finally(() => {
                closeAddPostDialog()
            })
    }

    const tags = useMemo(() => {
        return new Set(allPosts?.flatMap((post) => post.tags))
    }, [allPosts]);

    const filterPosts = (q: string, posts: Post[]) => {
        if (!q || q === '') {
            setFilteredPosts(posts);
        }
        const filtered = posts?.filter(post => post.title.toLowerCase().includes(q.toLowerCase()));
        setFilteredPosts(filtered);
    }

    return (
        <>

            <Box display="flex" justifyContent="space-between" alignItems="flex-end">
                <Typography variant="h4" component="h2">Posts</Typography>
                <Button onClick={openAddPostDialog} startIcon={<Add />}>Add post</Button>
            </Box>
            <Box>
                <Input
                    value={query}
                    onInput={(event: any) => setQuery(event.target.value)}
                    role={'searchbox'}
                />
                <Button onClick={() => filterPosts(query, allPosts!!)}>
                    Search <Search />
                </Button>
            </Box>
            <Loader isLoading={!allPosts}>
                <Box>
                    {filteredPosts?.map((post) => <PostListItem key={post.id} post={post} />)}
                </Box>
            </Loader>
            <NewPostDialog
                isOpen={addPostDialogOpen}
                handleClose={closeAddPostDialog}
                handleSave={savePost}
                existingTags={Array.from(tags)}
            />
        </>
    )
}

export default PostsList
