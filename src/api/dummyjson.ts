import {CreatePost, Post} from "../types.ts";

export const fetchPosts = async (): Promise<Post[]> => {
    return fetch('https://dummyjson.com/posts')
        .then(res => res.json())
        .then(data => data.posts)
}

export const createPost  = async (post: CreatePost): Promise<Post> => {
    return fetch('https://dummyjson.com/posts/add', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...post,
            userId: 1,
        })
    })
        .then(res => res.json())

}

