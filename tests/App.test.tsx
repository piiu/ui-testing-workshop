import {expect, vi, test} from "vitest";
import {render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import App from "../src/App";
import {fetchPosts} from "../src/api/dummyjson";
import * as React from "react";

vi.mock('../src/api/dummyjson.ts')

test('App renders correctly', async () => {
    vi.mocked(fetchPosts).mockResolvedValue([])
    render(<App />);

    expect(screen.getByRole('heading', {name: /Awesome UI App/i})).toBeInTheDocument()
    await waitForElementToBeRemoved(() => screen.getByTitle(/Loading/i))
})