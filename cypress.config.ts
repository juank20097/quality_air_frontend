import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    defaultCommandTimeout: 100000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
