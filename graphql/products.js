export const GET_PRODUCTS = `query getProducts($pagination:PaginationArg,$sort:[String]) {

    products(pagination:$pagination,sort:$sort){
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
        
       }
     `;
