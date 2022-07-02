import React, { createContext, useCallback, useContext, useState } from "react";

const ResultContext = createContext();
const baseUrl = 'https://google';
// baseUrl = 'https://google-search3.p.rapidapi.com/api/v1'

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('Elon Musk');

    const getResults = useCallback(async (type) => {
        setIsLoading(true);

        const response = await fetch(`${baseUrl}${type}`, {
            method: 'GET',
            headers: {
                'X-User-Agent': 'desktop',
                'X-Proxy-Location': 'EU',
                'X-RapidAPI-Key': '20fd69a613mshfb876fe5b78d611p107431jsn50062e01807a',
                'X-RapidAPI-Host': 'google-search3.p.rapidapi.com'
              }
        });

        const data = await response.json();

        if(type.includes('/news')) {
            setResults(data.entries);
        } else if (type.includes('/image')) {
            setResults(data.image_results);
        } else {
            setResults(data.results);
        }
        
        setIsLoading(false);
    }, []);

    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </ResultContext.Provider>
    )

}

export const useResultContext = () => useContext(ResultContext)