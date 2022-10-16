/// <reference types="cypress" />

describe("Fill Form and register user", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("fill in the form fields", () => {
    cy.loadFormValues("arthur");
    cy.get('[type="checkbox"]').first().check({ force: true });
  });

  it("values required true", () => {
    cy.loadFormValues("arthur");
    cy.get("input[name=usernameRegisterPage]").invoke("val").should("not.be.empty");
    cy.get("input[name=emailRegisterPage]").invoke("val").should("not.be.empty");
    cy.get("input[name=passwordRegisterPage]").invoke("val").should("not.be.empty");
  });

  it("verify if button submit is disabled", () => {
    cy.get('button:contains("REGISTER")').should("be.disabled");
  });

  it("Invalid username", () => {
    cy.loadFormValues("arthur");
    cy.get('[type="checkbox"]').first().uncheck({ force: true });
    cy.get('[type="checkbox"]').last().check({ force: true });

    cy.get('button:contains("REGISTER")').click();
    cy.get("label.invalid").should("contain.text", "User name already exists");
  });

  it("Register Success", () => {
    cy.loadFormValues("username3"); // make the username dynamic randomised for testing
    cy.get('[type="checkbox"]').first().uncheck({ force: true });
    cy.get('[type="checkbox"]').last().check({ force: true });

    cy.get('button:contains("REGISTER")').click();

    cy.visit("/");
    cy.wait(4000);
    cy.logout();
  });
});
