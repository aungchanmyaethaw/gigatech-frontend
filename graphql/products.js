export const GET_PRODUCTS = `query getProducts($pagination:PaginationArg,$sort:[String],$collection:String) {

  products(pagination:$pagination,sort:$sort,filters:{collection:{slug:{eq:$collection}}}){
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
