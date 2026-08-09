import {Link, useParams} from "react-router-dom"
import { ArrowLeftStroke, Eye, LowVision} from "@boxicons/react"
import {getFilmById} from "../../api/filmsApi.js";
import {useContext, useEffect, useState} from "react";
import {FilmsContext} from "../../context/FilmsContext.jsx";


const FilmDetailsPage = () => {

    const {id} = useParams()
    const {setLoading,loading, error, setError} = useContext(FilmsContext)
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

    useEffect(() => {
        getFilm()
    }, [id]);

    return (
        <div className="film-details__wrapper">
            {loading ? <p>Загрузка...</p> : null}
            {error ? <p>{error}</p> : null}
            {film && (
                <>
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
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default FilmDetailsPage;