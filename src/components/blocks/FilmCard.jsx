import Button from "../Button.jsx";
import {Check, TrashAlt, PenAlt} from '@boxicons/react';
import { Link } from "react-router-dom"


const FilmCard = (props) => {

    const {
        filmName,
        filmType,
        filmSeason,
        filmSeries,
        filmRating,
        isWatched,
        id,
        children,
        onToggleIsWatched,
        onEditStart,
        onDeleteButtonClick,
    } = props;

    return (
        <div className={isWatched ? `film-card watched` : `film-card`}>
            <div className={"film-card__header"}>
                <p className={`film-card__${filmType} film-card__type`}>
                    #{filmType}
                </p>
                <div className={"film-card__header-info"}>
                    {filmSeason && <p className={"film-card__season"}>Сезон: {filmSeason}</p>}
                    {filmSeries && <p className={"film-card__series"}>Серия: {filmSeries}</p>}
                </div>
            </div>
            <div className={"film-card__body"}>
                <h2 className={"film-card__name"}>{filmName}</h2>
                <p className={"film-card__name"}>{filmRating ? `Рейтинг: ${filmRating}` : null}</p>
                {children}
            </div>
            <div className={"film-card__footer"}>
                <div className="film-card__buttons">
                    <Button className="check__button" onClick={() => onToggleIsWatched(id, isWatched)}>
                        <Check style={{height: "20px", width: "20px"}}/>
                    </Button>
                    <Button className="delete__button" onClick={() => onDeleteButtonClick(id)}>
                        <TrashAlt style={{height: "20px", width: "20px"}}/>
                    </Button>
                    <Button className="edit__button" onClick={() => onEditStart(props)}>
                        <PenAlt style={{height: "20px", width: "20px"}}/>
                    </Button>
                </div>
                <div className="film-card__details">
                    <Link to={`${id}`}>
                        <Button>
                            Подробнее
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FilmCard;