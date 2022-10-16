// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("createBooking", () => {
  cy.request({
    url: Cypress.env("apiUrl") + "booking",
    method: "POST",
    headers: {
      "Content-Type": Cypress.env("contentType"),
    },
    body: {
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
      },
      additionalneeds: "Breakfast",
    },
  }).as("createBooking");

  cy.get("@createBooking").then(({ status, body }) => {
    expect(status).to.eq(200);
    expect(body).haveOwnProperty("booking");
    expect(body.booking).have.property("bookingdates");
    expect(body.booking.bookingdates).have.deep.equal({
      checkin: "2018-01-01",
      checkout: "2019-01-01",
    });
  });
});
//
// -- This is a parent command --
Cypress.Commands.add("getBooking", () => {
  const id = Math.floor(Math.random() * (200 - 1 + 1) + 1);
  cy.request({
    url: Cypress.env("apiUrl") + "booking/" + id,
    method: "GET",
    headers: {
      Accept: Cypress.env("contentType"),
    },
  }).as("getBoking");

  cy.get("@getBoking").then((response) => {
    expect(response.status).to.eq(200);
    assert.isObject(response.body);
  });
});
//
// -- This is a parent command --
Cypress.Commands.add("updateBooking", (token) => {
  const id = Math.floor(Math.random() * (200 - 1 + 1) + 1);
  cy.request({
    url: Cypress.env("apiUrl") + "booking/" + id,
    method: "PUT",
    headers: {
      "Content-Type": Cypress.env("contentType"),
      Accept: Cypress.env("contentType"),
      Cookie: `token=${token}`,
    },
    body: {
      firstname: "James",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
      },
      additionalneeds: "Breakfast",
    },
  }).as("updateBooking");

  cy.get("@updateBooking").then((response) => {
    expect(response.status).to.eq(200);
    assert.isObject(response.body);
  });
});
//
//
Cypress.Commands.add("deleteBooking", (token) => {
  const id = Math.floor(Math.random() * (200 - 1 + 1) + 1);
  cy.request({
    url: Cypress.env("apiUrl") + "booking/" + id,
    method: "DELETE",
    headers: {
      "Content-Type": Cypress.env("contentType"),
      Cookie: `token=${token}`,
    },
    body: {
      firstname: "James",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
      },
      additionalneeds: "Breakfast",
    },
  }).as("deleteBooking");

  cy.get("@deleteBooking").then((response) => {
    if (response.status === 200) {
      expect(response.status).to.eq(201);
    } else if (response.status === 405) {
      expect(response.status).to.eq(405);
    }
  });
});
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loadFormValues", (username) => {
  cy.get("input[name=usernameRegisterPage]").type(username);
  cy.get("input[name=emailRegisterPage]").type("test@test.com");
  cy.get("input[name=passwordRegisterPage]").type("123As");
  cy.get("input[name=confirm_passwordRegisterPage]").type("123As", { force: true });
});

Cypress.Commands.add("logout", () => {
  cy.get("#menuUserLink").click();
  cy.get("label").last().click();
});
