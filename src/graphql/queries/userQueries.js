import gql from "graphql-tag";

export const LOGIN_USER_MUTATION = gql`
  mutation loginUser($username: String, $password: String) {
    login(username: $username, password: $password) {
      access_token
      refresh_token
      expires_in
      token_type
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query getUser {
    me {
      id
      name
      email
      avatar
    }
  }
`;

export const LOGOUT = gql`
  mutation logoutUser {
    logout {
      status
      message
    }
  }
`;
