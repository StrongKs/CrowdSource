import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreatePost from "@/components/CreatePost";
import '@testing-library/jest-dom';

jest.mock("@/actions/post.action", () => ({
  addPostsW_Coordinates: jest.fn(),
}));

jest.mock("@/components/OllamaSummarizerFunc", () => ({
  OllamaSummarizerFunction: jest.fn().mockResolvedValue("Mock summary"),
}));

describe("CreatePost Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the text area", () => {
    render(<CreatePost />);
    const textarea = screen.getByPlaceholderText("What's happening near you?");
    expect(textarea).toBeInTheDocument();
  });

  it("enables the Post Original button when content is entered", async () => {
    render(<CreatePost />);
    const textarea = screen.getByPlaceholderText("What's happening near you?");
    fireEvent.change(textarea, { target: { value: "Test post" } });

    const postOriginal = await screen.findByRole("button", { name: /post original/i });
    expect(postOriginal).not.toBeDisabled();
  });

  it("disables the Post Summary button when summary is empty", () => {
    render(<CreatePost />);
    const postSummary = screen.getByRole("button", { name: /post summary/i });
    expect(postSummary).toBeDisabled();
  });

  it("triggers AI summarization and shows the summary", async () => {
    render(<CreatePost />);
    const textarea = screen.getByPlaceholderText("What's happening near you?");
    fireEvent.change(textarea, { target: { value: "Power outage reported" } });

    const summarizeButton = screen.getByRole("button", { name: /summarize/i });
    fireEvent.click(summarizeButton);

    const summaryText = await screen.findByText(/mock summary/i);
    expect(summaryText).toBeInTheDocument();
  });

  it("opens manual location modal", () => {
    render(<CreatePost />);
    const locationButton = screen.getByRole("button", { name: /edit location/i });
    fireEvent.click(locationButton);

    expect(screen.getByText(/enter coordinates/i)).toBeInTheDocument();
  });
});