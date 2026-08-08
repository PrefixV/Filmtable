import DashboardItem from "../DashboardItem.jsx";

const DashboardFilmsLength = (props) => {

    const {
        films,
    } = props;

    const watchedFilms = films.filter((film) => film.isWatched === true).length;

    return (
        <DashboardItem tags={["#films", "#watched"]}>
            <p className="dashboard-title">
                {`Всего фильмов: ${films.length}`}
            </p>
            <p className="dashboard-title">
                {`Всего просмотренных фильмов: ${watchedFilms}`}
            </p>
        </DashboardItem>
    )
}

export default DashboardFilmsLength