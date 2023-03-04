import React from 'react'
import LeftNavigationBar from './index'

const addToFavoritesButtonSelector = "[data-cy=\"add-to-favorites-button\"]";
const removeFromFavoritesButtonSelector = "[data-cy=\"remove-from-favorites-button\"]";

describe('<LeftNavigationBar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LeftNavigationBar/>)
  });

  it('shoul add 3 items to the favorites', () => {
    cy.mount(<LeftNavigationBar/>)
    cy.get(addToFavoritesButtonSelector).then((value) => {
      const menuItemCount = Cypress.$(value).length;

      cy.get(value).each(() => {
        cy.get(addToFavoritesButtonSelector).first().click();
      });
      cy.get(removeFromFavoritesButtonSelector).should('have.length', menuItemCount);
      cy.get(addToFavoritesButtonSelector).should('have.length', 0);
    });
  });

  it('shoul add and remove 3 items to the favorites', () => {
    cy.mount(<LeftNavigationBar/>)
    cy.get(addToFavoritesButtonSelector).then((value) => {
      const menuItemCount = Cypress.$(value).length;
      cy.get(addToFavoritesButtonSelector).each(() => {
        cy.get(addToFavoritesButtonSelector).first().click();
      });
      cy.get(removeFromFavoritesButtonSelector).each(() => {
        cy.get(removeFromFavoritesButtonSelector).first().click();
      });
      cy.get(addToFavoritesButtonSelector).should('have.length', menuItemCount);
      cy.get(removeFromFavoritesButtonSelector).should('have.length', 0);
    });
  });
})
