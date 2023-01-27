export const LOG_IN_USER = `mutation LogInUser($identifier:String!,$password:String!) {
    login(input: {identifier: $identifier, password: $password}) {
      jwt
      user {
        id
        username
        email
        
      }
    }
  }`;

export const REGISTER_USER = `mutation RegisterUser($username:String!,$email:String!,$password:String!) {
  register(input: {username:$username,email: $email, password: $password}) {
    jwt
    user {
      id
      username
      email
     
    }
  }
}

 `;

export const UPDATE_USER = `mutation UpdateUser($id:ID!,$username:String!,$email:String!) {
  updateUsersPermissionsUser(id:$id,data: {username:$username,email:$email}) {
 
    data{
      id
      attributes{
        username
        email
       
      }
    }
    
}
}`;

export const CHANGE_PASSWORD = `mutation changePassword($current:String!,$new:String!,$confirm:String!){
  
  changePassword(currentPassword:$current,password:$new,passwordConfirmation:$confirm){
    
    jwt
    
  }
  
}`;
