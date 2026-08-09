import DashboardItem from "../DashboardItem.jsx";
import {
    LineChart,
    Cell,
    Tooltip,
    Legend,
    CartesianGrid, XAxis, YAxis, Line, ResponsiveContainer
} from "recharts";

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
            <div className="dashboard-rating__wrapper">
                <p className="dashboard-title">Средний рейтинг: {averageRating.toFixed(2)}</p>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={films}>
                        <CartesianGrid />
                        <XAxis dataKey="filmName" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="filmRating"
                            stroke="#6366f1"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </DashboardItem>
    )
}

export default DashboardRating;