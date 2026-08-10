import DashboardItem from "../DashboardItem.jsx";

const DashboardBestFilm = (props) => {

    const {
        films
    } = props

    const ratedFilms = films.filter(film => film.filmRating !== "")
    const bestFilm = ratedFilms.reduce((best, film) => {
        if(!best || Number(film.filmRating) > Number(best.filmRating)) {
            return film
        }
        return best;
    }, null)

    return (
        <>
            {bestFilm ? (
                <DashboardItem tags={["#films", "#bestfilm"]}>
                    <div className="best-film__container">
                        <p className="best-film__title">{bestFilm.filmName}</p>
                        <p className="best-film__diagram">{bestFilm.filmRating}</p>
                    </div>
                </DashboardItem>
            ) :(
                <DashboardItem tags={["#films", "#bestfilm"]}>
                    <p>Лучший фильм не найден</p>
                </DashboardItem>
            ) }
        </>
    )
}

export default DashboardBestFilm;