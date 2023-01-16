export const LOG_IN_USER = `mutation LogInUser($identifier:String!,$password:String!) {
    login(input: {identifier: $identifier, password: $password}) {
      jwt
      user {
        username
        email
      }
    }
  }`;

export const REGISTER_USER = `mutation LogInUser($username:String!,$email:String!,$password:String!) {
  register(input: {username:$username,email: $email, password: $password}) {
    jwt
    user {
      username
      email
    }
  }
}

 `;
