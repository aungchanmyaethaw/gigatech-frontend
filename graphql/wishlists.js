export const GET_WISHLISTS = `query getWishList($product:ID,$user_id:ID!){
  
  wishlists(filters:{product:{id:{eq:$product}},users_permissions_user:{id:{eq:$user_id}}}){
    
    data{
      id
      attributes{
        product{
          
          data{
            id
            attributes{
              price
              slug
              collection{
                data{
                  attributes{
                    slug
                  }
                }
              }
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
  
}
`;

export const DELETE_WISHLISTS = `mutation deleteWishlist($wishlist_id:ID!){

  deleteWishlist(id:$wishlist_id){

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

export const ADD_WISHLIST = `mutation addWishlist($product:ID!,$user_id:ID!){
  
  createWishlist(data:{product:$product,users_permissions_user:$user_id}){
    
    data{

      id
      attributes{
        product{
					data{
            id
            attributes{
              slug
              collection{
                data{
                  attributes{
                    slug
                  }
                }
              }
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
