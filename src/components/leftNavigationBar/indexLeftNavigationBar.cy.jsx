import React from 'react'
import LeftNavigationBar from './index'

describe('<LeftNavigationBar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LeftNavigationBar/>)
  });

  it('shoul add 3 items to the favorites', () => {
    let menuItemCount = 0;

    cy.mount(<LeftNavigationBar/>)
    cy.get('[data-cy="add-to-favorites-button"]').then((value) => {
      menuItemCount = Cypress.$(value).length;
    });
    cy.get('[data-cy="add-to-favorites-button"]').first(element => cy.get(element).click());
    cy.get('[data-cy="remove-from-favorites-button"]').should('have.length', menuItemCount);
  });
})
