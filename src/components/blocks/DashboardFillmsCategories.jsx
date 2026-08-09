import DashboardItem from "../DashboardItem.jsx";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";


const DashboardFilmsCategories = (props) => {
    const {
        films
    } = props;

const data = [
    {
        name: "Movies",
        value: films.filter(film => film.filmType === "movie").length
    },
    {
        name: "Anime",
        value: films.filter(film => film.filmType === "anime").length
    },
    {
        name: "Cartoons",
        value: films.filter(film => film.filmType === "cartoon").length
    },
    {
        name: "Serials",
        value: films.filter(film => film.filmType === "serial").length
    }
]

    const COLORS = [
        "#6366f1",
        "#a573f5",
        "#878eff",
        "#2149d2"
    ];

    return (
        <DashboardItem tags={["#films", "#categories"]}>
                <PieChart width={400} height={300}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                </PieChart>
        </DashboardItem>
    )
}

export default DashboardFilmsCategories;