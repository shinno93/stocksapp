import {useState, useEffect} from 'react'


async function getCompInfo(){
    const url='https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=4c91adaa6177bfa5923a8a70a8056a30'
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