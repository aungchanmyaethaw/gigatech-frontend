export const GET_PRODUCTS = `query getProducts($pagination:PaginationArg,$sort:[String],$collection:String,$query:String) {

  products(pagination:$pagination,sort:$sort,filters:{collection:{slug:{eq:$collection}},or:[{name:{containsi:$query}},{brand:{containsi:$query}}]}){
   data{
     id
     attributes{
       name
       brand
       description
       price
       slug
       collection{
        data{
          attributes{
            slug
            name
          }
        }
      }
       images{
 
         data{
           id
           attributes{
             
             formats
             
           }
         }
         
       }
     }
     
   }
    meta{
      pagination{
        page
        total
        pageSize
        pageCount
      }
    }
 }
      
     }

     `;

export const GET_TRENDING_PRODUCT = `query getProducts($pagination:PaginationArg,$trending:Boolean!) {

  products(pagination:$pagination,filters:{trending:{eq:$trending}}){
   data{
     id
     attributes{
       name
       brand
       description
       price
       slug
       collection{
        data{
          attributes{
            slug
            name
          }
        }
      }
       images{
 
         data{
           id
           attributes{
             
             formats
             
           }
         }
         
       }
     }
     
   }
    meta{
      pagination{
        page
        pageSize
        pageCount
        total
      }
    }
 }
      
     }   
`;

export const GET_SINGLE_PRODUCT = `query getProducts($slug:String!) {

  products(filters:{slug:{eq:$slug}}){
   data{
     id
     attributes{
       name
       brand
       description
       price
       slug
      
       images{
 
         data{
           id
           attributes{
             
             formats
             
           }
         }
         
       }
     }
   }
 }
      
}`;
