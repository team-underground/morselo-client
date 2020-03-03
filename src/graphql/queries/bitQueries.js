import gql from "graphql-tag";

export const ALL_BITS_QUERY = gql`
  query getBits {
    bits(orderBy: [{ field: "created_at", order: DESC }]) {
      data {
        id
        title
        snippet
        created_at
        user {
          name
          email
        }
      }
    }
  }
`;

export const ALL_BITS_OF_CURRENT_USER_QUERY = gql`
  query getBitsOfCurrentUser($id: ID!, $page: Int!) {
    user(id: $id) {
      id
      name
      email
      bits(first: 10, page: $page) {
        paginatorInfo {
          count
          total
          hasMorePages
          lastItem
          lastPage
        }
        data {
          id
          title
          snippet
        }
      }
    }
  }
`;

export const ADD_BIT_MUTATION = gql`
  mutation createNewBit($title: String!, $snippet: String!) {
    createBit(title: $title, snippet: $snippet) {
      id
      title
      snippet
    }
  }
`;
