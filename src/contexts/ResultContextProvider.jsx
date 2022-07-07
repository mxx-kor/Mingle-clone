import React, { createContext, useCallback, useContext, useState } from "react";

const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';
// baseUrl = 'https://google-search3.p.rapidapi.com/api/v1'

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const getResults = useCallback(async (type) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${baseUrl}${type}`, {
                method: 'GET',
                headers: {
                    'X-User-Agent': 'desktop',
                    'X-Proxy-Location': 'EU',
                    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                    'X-RapidAPI-Host': 'google-search3.p.rapidapi.com'
                }
            });

            const data = await response.json();

            if (response.status === 429) alert('무료 API 데이터를 모두 소진하여 검색을 진행할 수 없습니다.')

            if(type.includes('/news')) {
                setResults(data.entries);
            } else if (type.includes('/image')) {
                setResults(data.image_results);
            } else {
                setResults(data.results);
            } 

            setIsLoading(false);

        } catch (response) {
            setIsLoading(false);

            alert(`Error, 검색 결과를 가져오지 못했습니다.`);
        }
    }, []);

    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </ResultContext.Provider>
    )

}

export const useResultContext = () => useContext(ResultContext)