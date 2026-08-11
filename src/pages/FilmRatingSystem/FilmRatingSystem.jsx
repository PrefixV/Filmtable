import { Link } from "react-router-dom"
import Accordion from "../../components/blocks/Accordion.jsx";
import {useState} from "react";
import {ArrowLeftStroke} from "@boxicons/react";

const FilmRatingSystem = () => {

    const ratingDetails = [
        { title: "Сценарий, развитие сюжета",
            details: "Насколько интересен сюжет, логично ли развиваются события и насколько хорошо написан сценарий." },
        { title: "Актерская игра",
            details: "Насколько убедительно актеры передают эмоции, характеры и поведение своих персонажей." },
        { title: "VFX эффекты",
            details: "Качество визуальных эффектов, их реалистичность и то, насколько органично они вписываются в происходящее." },
        { title: "Звуковое сопровождение",
            details: "Качество музыки, саундтрека и звуковых эффектов, а также их соответствие сценам и атмосфере." },
        { title: "Оригинальность",
            details: "Насколько фильм выделяется среди других работ, использует свежие идеи и избегает шаблонных решений." },
        { title: "Пересматриваемость",
            details: "Насколько сильно хочется посмотреть фильм снова и интересно ли находить в нем новые детали при повторном просмотре." },
        { title: "Создание атмосферы",
            details: "Насколько хорошо фильм передает настроение, эмоции и ощущение своего мира через визуал, музыку, звук и постановку." },
        { title: "Развитие персонажа",
            details: "Насколько убедительно персонажи меняются и развиваются по ходу истории, имеют ли они мотивацию и глубину." },
        { title: "Озвучка",
            details: "Качество голосов, эмоциональная подача, соответствие голосов персонажам и естественность диалогов." },
        { title: "Личная оценка",
            details: "Насколько фильм понравился лично вам и какие впечатления он оставил после просмотра." },
    ];

    const [itemOpen, setItemOpen] = useState(false);
    const toggleItem = (index) => {
        setItemOpen(itemOpen === index ? null : index)
    }

    return (
        <div className="rating-system__wrapper">
            <div className="link__wrapper">
                <Link to={"/films"}>
                    <ArrowLeftStroke />
                    К фильмам
                </Link>
            </div>
            <div className="rating-system">
                <div className="rating-system__header">
                    <h2 className="rating-system__title">
                        Система рейтинга фильмов
                    </h2>
                    <div className="rating-system__tags">
                        <p className="rating-system__tag">
                            #films
                        </p>
                        <p className="rating-system__tag">
                            #rating
                        </p>
                    </div>
                </div>
                <div className="rating-system__body">
                    <Accordion data={ratingDetails} toggleItem={toggleItem} isItemOpen={itemOpen}/>
                </div>
            </div>
        </div>
    )
}

export default FilmRatingSystem;