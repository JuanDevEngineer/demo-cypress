// <references />

describe("go to demo page", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("get demo page ", () => {
    cy.wait(2000);
    cy.get(".roboto-medium").contains("dvantage");
  });
});
