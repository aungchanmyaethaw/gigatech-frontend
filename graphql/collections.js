export const GET_COLLECTIONS = `query{
  
    collections{
  
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
