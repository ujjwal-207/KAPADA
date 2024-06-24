//So that I can fetch data in both development and deployment

const production = {
    url: 'https://kapada-backend.onrender.com'
    
  };
  const development = {
    url: 'http://localhost:5000'
  };
  export const config = process.env.NODE_ENV === 'development' ? development : production;