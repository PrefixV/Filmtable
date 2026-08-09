import {createContext, useEffect, useState} from "react";
import {getFilms} from "../api/filmsApi.js";

export const FilmsContext = createContext(null);

const FilmsProvider = ({children}) => {
    const [films, setFilms] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadFilms = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await getFilms();
            setFilms(data);
        } catch(e) {
            setError(e.message);
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        loadFilms()
    }, []);

    return (
        <FilmsContext.Provider value={{films, setFilms, loading, setLoading, error, setError, loadFilms}}>
            {children}
        </FilmsContext.Provider>
    )
}

export default FilmsProvider;