import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";


export const CoinContext = createContext();

const CoinContextProvider = (props)=> {

    const [allCoin, setAllCoin] = useState([]); 
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })

    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-RmxGJMJMV2AiUxD6GYmKmr1t' }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
    }


    useEffect(() =>{
        fetchAllCoin();
    },[currency])


    const ContentValue = {
        allCoin, currency, setCurrency
    }

    return (
        <CoinContext.Provider value={ContentValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;