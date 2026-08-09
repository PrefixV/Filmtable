import DashboardItem from "../DashboardItem.jsx";

const DashboardFilmsCategories = (props) => {
    const {
        films
    } = props;

    return (
        <DashboardItem tags={["#films", "#categories"]}>
            <p>Anime: {films.filter(film => film.filmType === "anime").length}</p>
            <p>Movies: {films.filter(film => film.filmType === "movie").length}</p>
            <p>Cartoons: {films.filter(film => film.filmType === "cartoon").length}</p>
            <p>Serials: {films.filter(film => film.filmType === "serial").length}</p>
        </DashboardItem>
    )
}

export default DashboardFilmsCategories;