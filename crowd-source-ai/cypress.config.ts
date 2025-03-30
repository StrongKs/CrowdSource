import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // ✅ Change this if your app runs on a different port
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
    supportFile: false, // ✅ Optional: Disables default support file
    viewportWidth: 1280, // ✅ Set browser size for tests
    viewportHeight: 720,
    defaultCommandTimeout: 70000, // ✅ Increase timeout for elements to load
    retries: 2, // ✅ Retries failed tests (optional)
    video: false, // ✅ Disable video recording to save space
  },
});
