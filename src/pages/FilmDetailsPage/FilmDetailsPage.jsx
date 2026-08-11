import {Link, useParams, useNavigate} from "react-router-dom"
import { ArrowLeftStroke, Eye, LowVision} from "@boxicons/react"
import {editFilmFavourite, getFilmById} from "../../api/filmsApi.js";
import {useContext, useEffect, useState} from "react";
import {FilmsContext} from "../../context/FilmsContext.jsx";
import Button from "../../components/Button.jsx";
import ModalDeleteConfirm from "../../components/ModalDeleteConfirm.jsx";


const FilmDetailsPage = () => {

    const {id} = useParams()
    const {setLoading,loading, error, setError, handleDeleteFilm, openDeleteModal, closeDeleteOpen, isModalDeleteOpen} = useContext(FilmsContext)
    const [film, setFilm] = useState(null)


    const getFilm = async () => {
        try {
            setLoading(true)
            const data = await getFilmById(id)
            setFilm(data)
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    const editFilmIsFavourite = async () => {
        try {
            const data = await editFilmFavourite(id, !film.isFilmFavourite);
            console.log(film)
            setFilm(data);
        } catch (e) {
            setError(e.message)
        }
    }

    const navigate = useNavigate();

    const onHandleDeleteFilm = () => {
        try {
            handleDeleteFilm(id)
            navigate("/films")
        } catch (e) {
            setError(e.message)
        }
    }

    useEffect(() => {
        getFilm()
    }, [id]);

    return (
        <div className="film-details__wrapper">
            {loading ? <p>Загрузка...</p> : null}
            {error ? <p>{error}</p> : null}
            {film && (
                <>
                    <ModalDeleteConfirm
                        isModalDeleteOpen={isModalDeleteOpen}
                        setModalDeleteClose={closeDeleteOpen}
                        onDeleteFilm={onHandleDeleteFilm}
                        id={id}
                    />
                    <div className="link__wrapper">
                        <Link to={"/films"}>
                            <ArrowLeftStroke />
                            Назад
                        </Link>
                    </div>
                    <div className="card-wrapper">
                        <div className="card-header">
                            <h2>
                                {film.filmName}
                            </h2>
                            <div className="film-status">
                                <div className="card-tag">
                                    <p>#{film.filmType}</p>
                                </div>
                                <p className="watch-status">{film.isWatched ? <Eye/> : <LowVision />}</p>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="card-details">
                                {film.filmDetails}
                            </p>
                            <div className="film-info">
                                <p className="film-type">
                                    Тип: {film.filmType}
                                </p>
                                <p className="film-rating">
                                    Рейтинг: {film.filmRating}
                                </p>
                                {film.filmType === "serial" && (
                                    <>
                                        <p className="film-season">
                                            Сезон: {film.filmSeason}
                                        </p>
                                        <p className="film-series">
                                            Серия: {film.filmSeries}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="card-footer">
                            <Button className={"delete-button"} onClick={() => openDeleteModal()}>
                                Удалить
                            </Button>
                            <Button onClick={editFilmIsFavourite}>
                                {film.isFilmFavourite ? "Убрать из избранного" : "Добавить в избранное"}
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default FilmDetailsPage;