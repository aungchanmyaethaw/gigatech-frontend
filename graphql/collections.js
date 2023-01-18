export const GET_COLLECTIONS = `query getCollections($slug:String){
  
    collections(filters:{slug:{eq:$slug}}){
  
      data{
        
        id
        attributes{
          
          name
          slug
          image{
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
