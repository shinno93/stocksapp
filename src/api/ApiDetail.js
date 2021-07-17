import {useState, useEffect} from 'react'


async function getStock(search){
    const API_KEY = process.env.REACT_APP_AV_API_KEY;  
    const url=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${search}&apikey=${API_KEY}`
    let res = await fetch(url);
    let data = await res.json();
    let output = [];
    let i = 0;
    for (let key in data["Time Series (Daily)"]){
        output[i] = {
        date: key,
        open: data["Time Series (Daily)"][key]["1. open"],
        high: data["Time Series (Daily)"][key]["2. high"],
        low: data["Time Series (Daily)"][key]["3. low"],
        close: data["Time Series (Daily)"][key]["4. close"],
        volume: data["Time Series (Daily)"][key]["5. volume"],
    }
        i++;
    }
    return output

}


export function useStockInfo(search) {
    const [loading, setLoading] = useState(true);
    const [stockInfo, setStockInfo] = useState([]);
    const [error, setError] = useState(null);
    const [found, setFound] = useState(false)

    console.log(stockInfo)
    console.log(found)
    console.log()

    useEffect(()=>{
        (async()=>{
            try{
                (getStock(search))
                .then((result)=> {
                    setLoading(false)
                    if (result.length!==0){
                        setStockInfo(result)
                        setFound(true)
                    }
                })
    
            } catch(err) {
                setError(error);
                setLoading(false);
            }
        })();
    },[]);

    return {
        loading,
        stockInfo,
        error,
        found
    }
}