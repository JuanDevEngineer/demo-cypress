const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.advantageonlineshopping.com/#/",
  },
  env: {
    apiUrl: "https://restful-booker.herokuapp.com/",
    contentType: "application/json",
  },
});
