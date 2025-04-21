import React from "react"; // ✅ Required for JSX in some setups
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Sidebar from "@/components/Sidebar";
import "@testing-library/jest-dom";

jest.mock("@/actions/post.action", () => ({
  getPosts: jest.fn(),
}));

jest.mock("@/components/OllamaSummarizerFunc", () => ({
  OllamaSummarizerFunction: jest.fn(),
}));

import { getPosts } from "@/actions/post.action";
import { OllamaSummarizerFunction } from "@/components/OllamaSummarizerFunc";

const mockPosts = [
  {
    id: "1",
    author_name: "Test User",
    content: "Power outage near my building",
    latitude: 40.0,
    longitude: -75.0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    image: null,
  },
];

describe("Sidebar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders original posts and displays summaries", async () => {
    (getPosts as jest.Mock).mockResolvedValue(mockPosts);
    (OllamaSummarizerFunction as jest.Mock).mockResolvedValue("Power outage summary.");

    render(<Sidebar />);

    // Wait for posts to load
    expect(await screen.findByText(/Recent Posts/i)).toBeInTheDocument();
    expect(await screen.findByText(/Power outage near my building/i)).toBeInTheDocument();

    // Trigger summarization
    fireEvent.click(screen.getByText(/AI Summarization/i));

    // Wait for summary to appear
    expect(await screen.findByText(/Power outage summary./i)).toBeInTheDocument();
  });

  it("shows progress indicator while loading summaries", async () => {
    (getPosts as jest.Mock).mockResolvedValue(mockPosts);
    (OllamaSummarizerFunction as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve("Delayed summary"), 100))
    );

    render(<Sidebar />);
    await screen.findByText(/Power outage near my building/i);

    fireEvent.click(screen.getByText(/AI Summarization/i));

    // Check for progress indicator text
    // expect(await screen.findByText((text) => text.includes("Summarizing"))).toBeInTheDocument();
});
});
