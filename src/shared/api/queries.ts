import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories($query: String!, $first: Int!, $after: String!) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            id
            name
            owner {
              login
            }
            stargazers {
              totalCount
            }
            pushedAt
          }
        }
      }
    }
  }
`;

export const GET_OWNER_REPOSITORIES = gql`
  query GetOwnerRepositories($first: Int!, $after: String!) {
    viewer {
      repositories(first: $first, after: $after) {
        totalCount
        edges {
          node {
            name
            stargazerCount
            updatedAt
            url
            owner {
              login
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const GET_REPOSITORY_DETAILS = gql`
  query GetRepositoryDetails($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      owner {
        login
        avatarUrl
      }
      stargazers {
        totalCount
      }
      pushedAt
      description
      languages(first: 10) {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;
