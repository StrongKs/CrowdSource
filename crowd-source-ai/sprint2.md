# Sprint 2 Documentation - Progress Report

## Back End

### Work done on the backend (Ollama_ai branch, we are still integrating it to frontend):

We integrated an AI-summarization feature into the CreatePost.tsx component. This allows users to generate a concise summary of their input text before posting. The implementation involved the following key steps:

- Developing an AI Summarization Function:
  The summarization function was implemented to call the DeepSeek-R1 model (can always be changed later) via Ollama. The function takes user input, sends a structured prompt to the model, and processes the returned summary while removing unnecessary explanations.
- Enhancing the UI with Summarization Support:
  The UI was modified to include a "Summarize" button next to the input field. When clicked, it triggers the AI summarization process, and the generated summary is displayed below the input box.
- Adding Two Separate Posting Options:
  To give users flexibility, two distinct buttons were introduced:
  _ "Post Original" - Posts the user’s unmodified input.
  _ "Post Summary" - Posts only the AI-generated summary (enabled only when a summary exists).
  Ensuring a Smooth User Experience:
  _ Loading indicators were added to provide feedback while the AI generates a summary.
  _ Disabling the "Post Summary" button until a summary is available to prevent empty submissions. \* Dynamic UI updates ensure real-time visibility of generated summaries.

### Backend Cypress Tests

Posting an Original Message:

- Ensures users can enter text and successfully post it using the "Post Original" button.
  Generating and Posting an AI Summary:
- Tests whether the "Summarize" button correctly triggers AI summarization.
- Waits for the AI-generated summary to appear.
- Confirms that the "Post Summary" button is enabled and allows posting the summary.
  Preventing Summary Posting When No Summary Exists:
- Verifies that the "Post Summary" button remains disabled if AI summarization is not triggered.

### Database API Documentation - Kent

Created 3 posts to get the application up and running. addDefaultPost(), addPost() and getPost() which are all linked to the Neon database using Prisma. Each post has its own use case for the development of the application. The addDefaultPost() is a testing API to check if some buttons work in the front end to link with the database. It will just post a default post with dummy data to test the connection of front-end to back-end. The addPost() will take two parameters: author name and content. This is the first actual implementation of posting to the database for a post with content. This will be updated to handle images and also coordinates for additional information/context and incident tracking. Finally the getPost() which currently gets the 10 latest posts that are in the database and will be updated for most relevant viewing for the user. The getPost() is currently being used to view the current feed.

## Front End

### Styling & UI Improvements

- **Add Tailwind for styling** (#6)

  - Standardized UI components using Tailwind CSS.

  **Implement ShadCN for UI components** (#5)

  - Integrated pre-built UI components for better accessibility and responsiveness.
  - Reduced development time with a standardized component library.

### Frontend Unit Tests:

- background_color_spec.cy.ts
  - Tests theme switching (light/dark mode changes).
- contact_info_spec.cy.ts
  - Tests contact info input functionality in the post creation form.
- create_post_spec.cy.ts
  - Tests the post creation flow, ensuring users can type, submit, and send posts to the backend.
- scrolling_feed_spec.cy.ts
  - Tests the scrolling feed, verifying that posts are fetched and displayed correctly.

## Codebase & Setup Enhancements

- **Set up merge-to-main check process** (#18)
  - Introduced a structured workflow to validate PRs before merging.
  - Ensured a more stable and conflict-free development environment
