export const ADD_ORDER_DETAILS = `mutation addOrderDetails($order_id:ID!,$product:ID!,$qty:Int!){
  
  createOrderDetail(data:{order:$order_id,product:$product,QTY:$qty}){

    data{
      
      id
      attributes{
          QTY     
          product{
            data{
              attributes{
                name
                brand
                price
                slug
                
                  }
                }
              }
            }
          }
          
        }
    }
    `;

export const GET_ORDER_DETAILS = `query getOrderDetails($order_id:ID){
  
  orderDetails(filters:{order:{id:{eq:$order_id}}}){
    
    data{
      
      id
      attributes{
        QTY
        product{
          data{
            id
            attributes{
              
              name
              brand
              price
              slug
              images{
                data{
                  attributes{
                    formats
                  }
                }
              }
             
            }
          }
        }
      }
    }
    
  }
  
}
  
  `;
