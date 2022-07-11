/// <reference types="Cypress" />

const url = "http://192.168.56.1:8080";

describe("My First Test", () => {
  it("Visits Pokedex", () => {
    cy.visit(url);
  });
});
