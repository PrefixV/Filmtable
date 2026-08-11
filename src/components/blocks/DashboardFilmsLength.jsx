import DashboardItem from "../DashboardItem.jsx";
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";


const DashboardFilmsLength = (props) => {

    const {
        films,
    } = props;

    const watchedFilms = films.filter((film) => film.isWatched === true).length;
    const unWatchedFilms = films.filter(film => film.isWatched === false).length
    const favouriteFilms = films.filter(film => film.isFilmFavourite === true).length

    const data = [
        {
            name: "Просмотренно",
            value: watchedFilms
        },
        {
            name: "не просмотренно",
            value: unWatchedFilms
        },
        {
            name: "Избранные",
            value: favouriteFilms
        }
    ]

    return (
        <DashboardItem tags={["#films", "#watched"]}>
            <BarChart width={"100%"} height={300} data={data}>
                <CartesianGrid />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar dataKey={`value`}  fill="#6366f1"/>
            </BarChart>
        </DashboardItem>
    )
}

export default DashboardFilmsLength