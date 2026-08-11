import {createContext, useEffect, useState} from "react";
import {deleteFilm, getFilms} from "../api/filmsApi.js";

export const FilmsContext = createContext(null);

const FilmsProvider = ({children}) => {
    const [films, setFilms] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

    const openDeleteModal = () => {
        setIsModalDeleteOpen(true)
    }

    const closeDeleteOpen = () => {
        setIsModalDeleteOpen(false)
    }


    const handleDeleteFilm = async (filmId) => {
        try {
            await deleteFilm(filmId)
            setFilms(prevFilms => prevFilms.filter(film => film.id !== filmId))
            closeDeleteOpen();
        } catch (e) {
            setError(e.message)
        }
    }

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
        <FilmsContext.Provider value={{films, setFilms, loading, setLoading, error, setError, loadFilms, isModalDeleteOpen, openDeleteModal, closeDeleteOpen, handleDeleteFilm}}>
            {children}
        </FilmsContext.Provider>
    )
}

export default FilmsProvider;