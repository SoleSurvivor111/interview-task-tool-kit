import { aliasQuery } from '../utils/grapql-test-utils';

describe('Test home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');

    cy.intercept('POST', 'https://api.github.com/graphql', (req) => {
      aliasQuery(req, 'GetRepositories');
    });
  });
  it('search works', () => {
    cy.getByDataId('search').type('sole');
    cy.wait('@gqlGetRepositoriesQuery').its('response.body.data.search.edges').should('have.length', 10);
  });
});
