const BASE_URL = process.env.REACT_APP_API_URI;

export const fetchWithoutToken = (endpoint, data, method = 'GET') => {
   
   const url = `${BASE_URL}/${endpoint}`; // localhost:4000/api/

   if (method === 'GET') {
      return fetch(url);
   } else {
      return fetch(url, {
         method,
         headers: {
            'Content-type': 'application/json'
         },
         body: JSON.stringify(data)
      })
   }
}

export const fetchWithToken = () => {

}