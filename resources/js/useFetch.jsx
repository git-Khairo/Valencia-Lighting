import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

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
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      })
    
    }, [url]);
    

    return {data, error, loading};
}
 
export default useFetch;