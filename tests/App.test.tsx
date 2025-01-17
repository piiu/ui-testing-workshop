import {beforeEach, describe, expect, it, vi} from "vitest";
import {render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import App from "../src/App";
import {fetchPosts} from "../src/api/dummyjson";
import * as React from "react";

vi.mock('../src/api/dummyjson.ts')

describe('App', () => {
    beforeEach(() => {
        vi.mocked(fetchPosts).mockResolvedValue([])
    })

    it('renders correctly', async () => {
        render(<App />);

        expect(screen.getByRole('heading', {name: /Awesome UI App/i})).toBeInTheDocument()
        await waitForElementToBeRemoved(() => screen.getByTitle(/Loading/i))
    })
})