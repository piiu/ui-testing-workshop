import {beforeEach, describe, expect, it, vi} from "vitest";
import {render, screen, waitFor} from "@testing-library/react";
import {createPost, fetchPosts} from "../src/api/dummyjson";
import * as React from "react";
import PostsList from "../src/components/PostsList";
import {userEvent} from "@testing-library/user-event";

vi.mock('../src/api/dummyjson.ts')

describe('PostsList', () => {
    beforeEach(() => {
        vi.mocked(fetchPosts).mockResolvedValue([
            {
                id: 123,
                title: 'Existing post',
                body: 'with some text',
                tags: ['tag1'],
            },
            {
                id: 124,
                title: 'Filtered post',
                body: 'with some other text',
                tags: ['tag2'],
            }
        ])
        vi.mocked(createPost).mockImplementation(
            (post) => Promise.resolve({id: 234, ...post})
        )
    })

    it('calls API to create post and adds the result to the posts list', async () => {
        render(<PostsList />);

        expect(screen.getByRole('heading')).toHaveTextContent(/Posts/i)
        expect(screen.getByRole('button', {name: /Add post/i})).toBeInTheDocument()

        await userEvent.click(screen.getByRole('button', { name: /Add post/i }))

        expect(screen.getByRole('dialog')).toBeInTheDocument()

        const bodyOf100As = Array(101).join('a')

        await userEvent.type(screen.getByLabelText(/Title/i), 'Some title that is at least 15 characters long')
        await userEvent.type(screen.getByLabelText(/Body/i), bodyOf100As)
        await userEvent.type(screen.getByRole('combobox'), 'ta{arrowdown}{enter}')
        await userEvent.click(screen.getByRole('button', { name: /Save/i }))

        expect(screen.queryByText(/tags field must have at least 1 items/i)).toBeNull()

        expect(createPost).toHaveBeenCalledOnce()
        expect(createPost).toHaveBeenCalledWith({
            title: 'Some title that is at least 15 characters long',
            body: bodyOf100As,
            tags: ['tag1']
        })

        await waitFor(() =>
            screen.getByRole('heading', { name: /Some title that is at least 15 characters long/i })
        )

        expect(screen.queryAllByText('tag1').length).toBe(2)
    })

    it('filters posts', async () => {
        render(<PostsList />);

        expect(screen.getByRole('searchbox')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText(/Filtered post/i)).toBeInTheDocument()
            expect(screen.queryByText(/Existing post/i)).toBeInTheDocument()
        })

        await userEvent.type(screen.getByRole('searchbox'), 'Filtered')
        await userEvent.click(screen.getByRole('button', { name: /Search/i }))

        await waitFor(() => {
            expect(screen.queryByText(/Existing post/i)).not.toBeInTheDocument()
            expect(screen.queryByText(/Filtered post/i)).toBeInTheDocument()
        })
    })
})
