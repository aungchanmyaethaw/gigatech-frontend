export const ADD_ORDER = `mutation addOrderDetails($total_amount:Float!,$user_id:ID!){
  
    createOrder(data:{total_amount:$total_amount,users_permissions_user:$user_id,status:"pending"}){
  
      data{
        
        id
        attributes{
          total_amount
          createdAt
          status
        }
      }
      
    }
    
  }`;

export const GET_ORDERS = `query getOrders($user_id:ID!){


    orders(filters:{users_permissions_user:{id:{eq:$user_id}}}){
      
      data{
          id
          attributes{
          total_amount
          createdAt
          status
        }
      }
      
    }
    
  }
    `;
