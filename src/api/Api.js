import {useState, useEffect} from 'react'


async function getCompInfo(){
    const API_KEY = process.env.REACT_APP_FMP_API_KEY;
    const url=`https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${API_KEY}`
    let res = await fetch(url);
    let data = await res.json();
    return data.map((company)=>({
        symbol: company.symbol,
        name: company.name,
        sector: company.sector,
    }))
}


export function useCompInfo() {
    const [loading, setLoading] = useState(true);
    const [companyInfo, setCompanyInfo] = useState([]);
    const [error, setError] = useState(null);

    useEffect(()=>{
        (async()=>{
            try{
                setCompanyInfo(await getCompInfo());
                setLoading(false);
            } catch(err){
                setError(error);
                setLoading(false);
            }

        })();
    },[])   
    return {
        loading,
        companyInfo,
        error,
    }
}