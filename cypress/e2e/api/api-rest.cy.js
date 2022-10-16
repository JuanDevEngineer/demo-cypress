/// <reference types="cypress" />

describe("Api test Auth user", () => {
  let tokenLocal;

  it("login user Request api", () => {
    cy.request({
      url: Cypress.env("apiUrl") + "auth",
      method: "POST",
      headers: {
        "Content-Type": Cypress.env("contentType"),
      },
      body: {
        username: "admin",
        password: "password123",
      },
    }).as("authRequest");

    cy.get("@authRequest").then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body).haveOwnProperty("token");
      tokenLocal = body.token;
      localStorage.setItem("token", body.token);
    });
  });

  it("(POST) createBooking Request api", () => {
    cy.createBooking();
  });

  it("(GET) getBooking Request api", () => {
    cy.getBooking();
  });

  it("(PUT) updateBooking Request api", () => {
    cy.updateBooking(tokenLocal);
  });

  it("(DELETE) deleteBooking Request api", () => {
    cy.deleteBooking(tokenLocal);
  });
});
