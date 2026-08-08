import {useEffect, useState, useContext} from "react";
import {createFilm, getFilms, deleteFilm, toggleFilmWatch, editFilm, getFilmById} from "../../api/filmsApi.js";
import FilmCard from "../../components/blocks/FilmCard.jsx";
import UtilsForm from "../../components/blocks/UtilsForm.jsx";
import AddFilmForm from "../../components/forms/AddFilmForm.jsx";
import {FilmsContext} from "../../context/FilmsContext.jsx";

const FilmsPage = () => {

    const {films, setFilms} = useContext(FilmsContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [filmName, setFilmName] = useState("");
    const [filmType, setFilmType] = useState("movie");
    const [filmSeries, setFilmSeries] = useState("");
    const [filmSeason, setFilmSeason] = useState("");
    const [filmRating, setFilmRating] = useState("");

    const [enableSeries, setEnableSeries] = useState(false);
    const [enableRating, setEnableRating] = useState(false);

    const [query, setQuery] = useState("");
    const [sortType, setSortType] = useState("byName");
    const [watchFilter, setWatchFilter] = useState("all")

    const [editingFilm, setEditingFilm] = useState(null)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const clearForm = () => {
        setFilmName("")
        setFilmRating("")
        setFilmSeason("")
        setFilmSeries("")
        setEnableSeries(false);
        setFilmType("movie")
    }


    const closeModal = () => {
        setIsModalOpen(false)
        clearForm()
        setEditingFilm(null)
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


    const handleSaveFilm = async () => {
        try {
            const data = await createFilm(
                {
                    filmName,
                    filmType,
                    filmRating,
                    filmSeason,
                    filmSeries,
                    isWatched: false,
                    id: crypto?.randomUUID() ?? Date.now().toString()
                });
            setFilms(prevFilms => [...prevFilms, data])
            clearForm();
            setIsModalOpen(false);

        } catch (e) {
            setError(e.message);
        }
    }

    const handleDeleteFilm = async (filmId) => {
        try {
            await deleteFilm(filmId)
            setFilms(prevFilms => prevFilms.filter(film => film.id !== filmId))
        } catch (e) {
            setError(e.message)
        }
    }
    
    const handleToggleIsWatched = async (filmId, isWatched) => {
        try {
            const data = await toggleFilmWatch(filmId, !isWatched);
            setFilms(prevFilms => {
                return prevFilms.map((film) => {
                    console.log(film);
                    if(film.id === filmId) {
                        return data
                    }
                    return film;
                })
            })
        } catch (e) {
            setError(e.message)
        }
        
    }

    const handleEditFilm = async (filmId) => {
        try {
            const data = await editFilm(filmId, {filmName, filmType, filmSeason, filmSeries, filmRating})
            setFilms(prevFilms => prevFilms.map((film) => {
                if(film.id === filmId) {
                    return data;
                }
                return film;
            }))

        } catch (e) {
            setError(e.message)
        }finally {
            setIsModalOpen(false)
            setEditingFilm(null)
            clearForm();
        }
    }

    const handleStartEdit = (film) => {
        setEditingFilm(film.id);

        setFilmName(film.filmName);
        setFilmType(film.filmType);
        setFilmSeason(film.filmSeason);
        setFilmSeries(film.filmSeries);
        setFilmRating(film.filmRating);

        setIsModalOpen(true);
    };

    const clearSearchQuery = query.trim().toLowerCase();
    let filteredFilms = [...films]

    if(watchFilter === "selectAll") {
        filteredFilms = [...films]
    }

    if(watchFilter === "byDoWatch") {
        filteredFilms = films.filter(film => film.isWatched);
    }

    if(watchFilter === "byNotWatch") {
        filteredFilms = films.filter(film => film.isWatched === false)
    }

    if (sortType === "byName") {
        filteredFilms.sort((a, b) =>
            a.filmName.localeCompare(b.filmName)
        );
    }

    if (sortType === "byType") {
        filteredFilms.sort((a, b) =>
            a.filmType.localeCompare(b.filmType)
        );
    }

    if (sortType === "byRating") {
        filteredFilms.sort((a, b) =>
            Number(b.filmRating) - Number(a.filmRating)
        );
    }

    clearSearchQuery.length > 0 ? filteredFilms = filteredFilms.filter((film) => film.filmName.toLowerCase().includes(clearSearchQuery)) : filteredFilms



    useEffect(() => {
        loadFilms()
    }, []);

    return (
        <div className="films-page__wrapper">
            <div className="films-page__options">
                <UtilsForm
                    openModal={openModal}
                    searchQuery={query}
                    setSearchQuery={setQuery}
                    sortType={sortType}
                    setSortType={setSortType}
                    watchFilter={watchFilter}
                    setWatchFilter={setWatchFilter}
                />
                <AddFilmForm
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    filmName={filmName}
                    setFilmName={setFilmName}
                    filmType={filmType}
                    setFilmType={setFilmType}
                    filmRating={filmRating}
                    setFilmRating={setFilmRating}
                    filmSeason={filmSeason}
                    setFilmSeason={setFilmSeason}
                    filmSeries={filmSeries}
                    setFilmSeries={setFilmSeries}
                    onSaveFilm={handleSaveFilm}
                    editingFilm={editingFilm}
                    onEditFilm={handleEditFilm}
                    enableSeries={enableSeries}
                    setEnableSeries={setEnableSeries}
                    enableRating={enableRating}
                    setEnableRating={setEnableRating}
                />
            </div>
            <div className="films-page__list">
                {error && <p>{error}</p>}
                {loading && <p>Загрузка...</p>}
                {filteredFilms.map((film) => {
                    return <FilmCard
                        {...film}
                        key={film.id}
                        onDeleteFilm={handleDeleteFilm}
                        onToggleIsWatched={handleToggleIsWatched}
                        onEditFilm={handleEditFilm}
                        editingFilm={editingFilm}
                        setEditingFilm={setEditingFilm}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        onEditStart={handleStartEdit}
                    />
                })}
            </div>
        </div>
    )
}

export default FilmsPage;