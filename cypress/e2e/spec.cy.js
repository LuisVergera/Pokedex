/// <reference types="Cypress" />

const url = "http://192.168.56.1:8080";
const pokemonsPerPage = 20;

describe("Page test", () => {
  it("Visits Pokedex", () => {
    cy.visit(url);
  });
  it("Makes sure the number of pokemons match the given number", () => {
    cy.get("#pokelist").find(".cards").should("have.length", pokemonsPerPage);
  });
  it("verify that cards can be clicked", () => {
    cy.get(".cards").click({ multiple: true });
  });
});

describe("Paginator", () => {
  it("only next button should be visible on first page", () => {
    cy.get(".pagination").find("#prev").should("not.be.visible");
    cy.get(".pagination").find("#next").should("be.visible");
  });

  it("page get id active", () => {
    cy.get(".pagination a")
      .then(($a) => {
        const items = $a.toArray();
        return Cypress._.sample(items);
      })
      .then(($a) => {
        expect(Cypress.dom.isJquery($a), "jQuery element").to.be.true;
        cy.log(`you picked "${$a.text()}"`);
      })
      .click()
      .should("have.id", "active");
  });
});

describe("Pokemons", () => {
  it("It makes sure information is displayed when a pokemon is clicked", () => {
    for (let i = 1; i < pokemonsPerPage; i++) {
      cy.get("#pokelist").find(".cards").eq(i).click();
      cy.get("#details").find("#sprite").should("be.visible");
      //  cy.get('.popup-header').find('button').click();
    }
  });
});

describe("Serchbar", () => {
  it("It makes sure information is displayed when a pokemon is searched", () => {
    cy.get(".searchBox").trigger("mouseover");

    cy.get(".searchInput").type("pikachu", { force: true });
    cy.get(".searchButton").click({ force: true });
    cy.get("#details").find("#sprite").should("be.visible");
    //  cy.get('.popup-header').find('button').click();
  });
});
