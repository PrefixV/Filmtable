import {useState, useContext, useEffect, use} from "react";
import {createFilm, toggleFilmWatch, editFilm} from "../../api/filmsApi.js";
import {Link, useParams, useNavigate} from "react-router-dom";
import FilmCard from "../../components/blocks/FilmCard.jsx";
import UtilsForm from "../../components/blocks/UtilsForm.jsx";
import AddFilmForm from "../../components/forms/AddFilmForm.jsx";
import {FilmsContext} from "../../context/FilmsContext.jsx";
import ModalDeleteConfirm from "../../components/ModalDeleteConfirm.jsx";
import Pagination from "../../components/blocks/Pagination.jsx";

const FilmsPage = () => {

    const {page} = useParams();
    const {films, setFilms, loading, error, setError, isModalDeleteOpen, openDeleteModal, closeDeleteOpen, handleDeleteFilm} = useContext(FilmsContext);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [filmName, setFilmName] = useState("");
    const [filmType, setFilmType] = useState("movie");
    const [filmSeries, setFilmSeries] = useState("");
    const [filmSeason, setFilmSeason] = useState("");
    const [filmPlot, setFilmPlot] = useState(0)
    const [acting, setActing] = useState(0);
    const [vfxEffects, setVfxEffects] = useState(0);
    const [audioEffects, setAudioEffects] = useState(0);
    const [originality, setOriginality] = useState(0);
    const [rewatchable, setRewatchable] = useState(0);
    const [ambience, setAmbience] = useState(0);
    const [character, setCharacter] = useState(0)
    const [voiceOver, setVoiceOver] = useState(0);
    const [personalOpinion, setPersonalOpinion] = useState(0)
    const [filmDetails, setFilmDetails] = useState("")

    const [enableSeries, setEnableSeries] = useState(false);
    const [enableRating, setEnableRating] = useState(false);

    const [query, setQuery] = useState("");
    const [sortType, setSortType] = useState("byName");
    const [watchFilter, setWatchFilter] = useState("all")

    const [editingFilm, setEditingFilm] = useState(null)
    const [deletingFilmId, setDeletingFilmId] = useState(null);

    let filteredFilms = [...films]

    const currentPage = Number(page) || 1
    const filmsPerPage = 10;
    const startIndex = (currentPage - 1) * filmsPerPage;
    const endIndex = (startIndex + filmsPerPage)
    let currentFilms = filteredFilms.slice(startIndex, endIndex);

    const navigate = useNavigate();

    const goToPage = (page) => {
        navigate(`/films/page/${page}`)
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const clearForm = () => {
        setFilmName("")
        setFilmSeason("")
        setFilmSeries("")
        setEnableSeries(false);
        setFilmPlot(0);
        setActing(0);
        setAmbience(0);
        setAudioEffects(0);
        setCharacter(0);
        setPersonalOpinion(0);
        setVoiceOver(0);
        setVfxEffects(0);
        setOriginality(0);
        setRewatchable(0);
        setFilmType("movie")
    }


    const closeModal = () => {
        setIsModalOpen(false)
        clearForm()
        setEditingFilm(null)
    }


    const handleSaveFilm = async () => {
        try {
            const data = await createFilm(
                {
                    filmName,
                    filmType,
                    filmRating: (Number(filmPlot) + Number(acting) + Number(vfxEffects) + Number(audioEffects) + Number(originality) + Number(rewatchable) + Number(ambience) + Number(character) + Number(voiceOver) + Number(personalOpinion)).toFixed(2),
                    filmPlot,
                    acting,
                    vfxEffects,
                    audioEffects,
                    originality,
                    rewatchable,
                    ambience,
                    character,
                    voiceOver,
                    personalOpinion,
                    filmSeason,
                    filmSeries,
                    filmDetails,
                    isFilmFavourite: false,
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
            const data = await editFilm(filmId, {filmName, filmType, filmSeason, filmSeries, filmPlot, acting, ambience, character, voiceOver, personalOpinion, audioEffects, vfxEffects, originality, rewatchable})
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
        setFilmDetails(film.filmDetails);
        setFilmPlot(film.filmPlot);
        setActing(film.acting);
        setAmbience(film.ambience);
        setAudioEffects(film.audioEffects);
        setCharacter(film.character);
        setPersonalOpinion(film.personalOpinion);
        setVoiceOver(film.voiceOver);
        setVfxEffects(film.vfxEffects);
        setOriginality(film.originality);
        setRewatchable(film.rewatchable);
        setIsModalOpen(true);
    };

    const handleStartDelete = (filmId) => {
        openDeleteModal()
        setDeletingFilmId(filmId)
    }


    const clearSearchQuery = query.trim().toLowerCase();

    if(watchFilter === "selectAll") {
        currentFilms = [...films]
    }

    if(watchFilter === "byDoWatch") {
        currentFilms = films.filter(film => film.isWatched);
    }

    if(watchFilter === "byNotWatch") {
        currentFilms = films.filter(film => film.isWatched === false)
    }

    if (sortType === "byName") {
        currentFilms.sort((a, b) =>
            a.filmName.localeCompare(b.filmName)
        );
    }

    if (sortType === "byType") {
        currentFilms.sort((a, b) =>
            a.filmType.localeCompare(b.filmType)
        );
    }

    if (sortType === "byRating") {
        currentFilms.sort((a, b) =>
            Number(b.filmRating) - Number(a.filmRating)
        );
    }

    if(watchFilter === "byFavourite") {
        currentFilms = films.filter(film => film.isFilmFavourite === true)
    }

    clearSearchQuery.length > 0 ? currentFilms = currentFilms.filter((film) => film.filmName.toLowerCase().includes(clearSearchQuery)) : filteredFilms

    return (
        <>
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
                        filmDetails={filmDetails}
                        setFilmDetails={setFilmDetails}
                        filmPlot={filmPlot}
                        setFilmPlot={setFilmPlot}
                        acting={acting}
                        setActing={setActing}
                        vfxEffects={vfxEffects}
                        setVfxEffects={setVfxEffects}
                        audioEffects={audioEffects}
                        setAudioEffects={setAudioEffects}
                        originality={originality}
                        setOriginality={setOriginality}
                        rewatchable={rewatchable}
                        setRewatchable={setRewatchable}
                        ambience={ambience}
                        setAmbience={setAmbience}
                        character={character}
                        setCharacter={setCharacter}
                        voiceOver={voiceOver}
                        setVoiceOver={setVoiceOver}
                        personalOpinion={personalOpinion}
                        setPersonalOpinion={setPersonalOpinion}
                    />
                </div>
                <ModalDeleteConfirm
                    isModalDeleteOpen={isModalDeleteOpen}
                    setModalDeleteClose={closeDeleteOpen}
                    onDeleteFilm={handleDeleteFilm}
                    id={deletingFilmId}
                />
                <div className="films-page__list">
                    {error && <p>{error}</p>}
                    {loading && <p>Загрузка...</p>}
                    {currentFilms.map((film) => {
                        return <FilmCard
                            {...film}
                            key={film.id}
                            onToggleIsWatched={handleToggleIsWatched}
                            onEditFilm={handleEditFilm}
                            editingFilm={editingFilm}
                            setEditingFilm={setEditingFilm}
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            onEditStart={handleStartEdit}
                            onDeleteButtonClick={handleStartDelete}
                        />
                    })}
                </div>
                <div className="films-page__footer">
                    <Pagination
                        currentPage={currentPage}
                        navigate={navigate}
                        goToPage={goToPage}
                    />
                    <Link to={"/rating&system"}>
                        система оценки фильмов
                    </Link>
                </div>
            </div>
        </>
    )
}

export default FilmsPage;