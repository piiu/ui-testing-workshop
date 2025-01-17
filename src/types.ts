export interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions?: {
        likes: number;
        dislikes: number;
    };
}

export interface CreatePost {
    title: string;
    body: string;
    tags: string[];
}