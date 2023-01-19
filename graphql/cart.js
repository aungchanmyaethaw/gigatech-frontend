export const GET_CART = `query getCarts($user_id:ID){
  
  carts(filters:{users_permissions_user:{id:{eq:$user_id}}}){
    
    data{
      id
      attributes{
        QTY
        product{
          data{
            id
            attributes{
              slug
            }
          }
        }
        users_permissions_user{
          data{
            id
          }
        }
      }
    }
    
  }
  
}
`;

export const Add_Cart = `mutation addCart($qty:Int!,$product:ID!,$user_id:ID!){
  createCart(data:{QTY:$qty,product:$product,users_permissions_user:$user_id}){
    data{
      id
      attributes{
        	QTY
        	product
        {
          data{
            id
            attributes{
              slug
            }
          }
        }
         users_permissions_user{
          data{
            id
            attributes{
              username
            }
          }
        }
      }
    }
  }
}`;

export const UPDATE_QTY = `mutation updateQty($qty:Int!,$cart_id:ID!){
  
  updateCart(id:$cart_id,data:{QTY:$qty}){
    data{
			id
      attributes{
        QTY
        product{
          data{
            id
            attributes{
           		name   
            }
          }
        }
      }
    }
  }
  
}`;

export const DELETE_CART = `mutation deleteQty($cart_id:ID!){
  deleteCart(id:$cart_id){
			data{
        id
        attributes{
          product{
            data{
              id
              attributes{
                name
              }
            }
          }
        }
      }
  }
}`;
