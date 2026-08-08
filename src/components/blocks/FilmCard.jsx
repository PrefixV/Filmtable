import Button from "../Button.jsx";
import {Check, TrashAlt, PenAlt} from '@boxicons/react';

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
        onDeleteFilm,
        onToggleIsWatched,
        onEditStart,
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
                <p className={"film-card__name"}>{`Рейтинг: ${filmRating}`}</p>
                {children}
            </div>
            <div className={"film-card__footer"}>
                <Button className="check__button" onClick={() => onToggleIsWatched(id, isWatched)}>
                    <Check style={{height: "20px", width: "20px"}}/>
                </Button>
                <Button className="delete__button" onClick={() => onDeleteFilm(id)}>
                    <TrashAlt style={{height: "20px", width: "20px"}}/>
                </Button>
                <Button className="edit__button" onClick={() => onEditStart(props)}>
                    <PenAlt style={{height: "20px", width: "20px"}}/>
                </Button>
            </div>
        </div>
    )
}

export default FilmCard;