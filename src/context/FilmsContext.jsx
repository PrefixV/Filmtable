import {createContext, useState} from "react";

export const FilmsContext = createContext(null);

const FilmsProvider = ({children}) => {
    const [films, setFilms] = useState([]);
    return (
        <FilmsContext.Provider value={{films, setFilms}}>
            {children}
        </FilmsContext.Provider>
    )
}

export default FilmsProvider;