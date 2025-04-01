import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreatePost from "@/components/CreatePost";

// Mocking navigator.geolocation
beforeAll(() => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
      Promise.resolve(
        success({
          coords: {
            latitude: 29.65,
            longitude: -82.34,
          },
        })
      )
    ),
  };
  // @ts-ignore
  global.navigator.geolocation = mockGeolocation;
});

describe("CreatePost Component", () => {
  it("renders the text area", () => {
    render(<CreatePost />);
    const textarea = screen.getByPlaceholderText("What's happening near you?");
    expect(textarea).toBeInTheDocument();
  });

  it("enables the Post button when content is entered", async () => {
    render(<CreatePost />);
    const textarea = screen.getByPlaceholderText("What's happening near you?");
    fireEvent.change(textarea, { target: { value: "Test post" } });

    const postButton = await screen.findByRole("button", { name: /post/i });
    expect(postButton).not.toBeDisabled();
  });

  it("opens contact info modal", () => {
    render(<CreatePost />);
    const contactButton = screen.getByRole("button", { name: /contact info/i });
    fireEvent.click(contactButton);
    expect(screen.getByText(/add contact info/i)).toBeInTheDocument();
  });

  it("opens manual location modal", () => {
    render(<CreatePost />);
    const locationButton = screen.getByRole("button", { name: /set location/i });
    fireEvent.click(locationButton);
    expect(screen.getByText(/enter coordinates/i)).toBeInTheDocument();
  });
});
