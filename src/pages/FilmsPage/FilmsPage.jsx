import {useEffect, useState, useContext} from "react";
import {createFilm, getFilms, deleteFilm, toggleFilmWatch, editFilm} from "../../api/filmsApi.js";
import FilmCard from "../../components/FilmCard.jsx";
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
    const [filmSeries, setFilmSeries] = useState("0");
    const [filmSeason, setFilmSeason] = useState("0");
    const [filmRating, setFilmRating] = useState("");

    const [query, setQuery] = useState("");
    const [sortType, setSortType] = useState("byName");

    const [editingFilm, setEditingFilm] = useState(null)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const clearForm = () => {
        setFilmName("")
        setFilmRating("")
        setFilmSeason("0")
        setFilmSeries("0")
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
            setError("Ошибка добавления фильма");
        }
    }

    const handleDeleteFilm = async (filmId) => {
        try {
            const data = await deleteFilm(filmId)
            setFilms(prevFilms => prevFilms.filter(film => film.id !== filmId))
        } catch (e) {
            setError("Ошибка удаления фильма")
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
            setError("Ошибка переключения просмотра")
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
    let sortedFilms = clearSearchQuery ? films.filter((film) => film.filmName.toLowerCase().includes(clearSearchQuery)) : [...films]


    if (sortType === "byName") {
        sortedFilms.sort((a, b) =>
            a.filmName.localeCompare(b.filmName)
        );
    }

    if (sortType === "byType") {
        sortedFilms.sort((a, b) =>
            a.filmType.localeCompare(b.filmType)
        );
    }

    if (sortType === "byRating") {
        sortedFilms.sort((a, b) =>
            Number(b.filmRating) - Number(a.filmRating)
        );
    }

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
                />
            </div>
            <div className="films-page__list">
                {error && <p>{error}</p>}
                {loading && <p>Загрузка...</p>}
                {sortedFilms.map((film) => {
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