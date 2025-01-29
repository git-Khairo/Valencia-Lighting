import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("No Errors");

    useEffect(() => {
      fetch(url)
      .then(res => {
        if(!res.ok){
            throw Error('Could not fetch data');
        }
        return res.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(err => {
        setError(err.message);
      })
    
    }, [url]);
    

    return {data, error};
}
 
export default useFetch;