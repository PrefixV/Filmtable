import DashboardItem from "../DashboardItem.jsx";

const DashboardRating = (props) => {
    const {
        films
    } = props;

    const totalRating = films.reduce((sum, film) => {
        return sum + (Number(film.filmRating))
    }, 0)

    const averageRating = totalRating / films.length;

    return (
        <DashboardItem tags={["#films", "#rating"]}>
            <p className="dashboard-title">
                {`Средний рейтинг: ${averageRating.toFixed(2)}`}
            </p>
        </DashboardItem>
    )
}

export default DashboardRating;