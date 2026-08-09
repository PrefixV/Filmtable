import Button from "../Button.jsx";
import {X} from "@boxicons/react"
import Field from "../Field.jsx";
import Select from "../Select.jsx";

const AddFilmForm = (props) => {
    const {
    isModalOpen,
    closeModal,
        filmType,
        filmName,
        filmSeason,
        filmRating,
        filmSeries,
        setFilmName,
        setFilmRating,
        setFilmSeason,
        setFilmSeries,
        setFilmType,
        onSaveFilm,
        editingFilm,
        onEditFilm,
        enableSeries,
        setEnableSeries,
        enableRating,
        setEnableRating,
    } = props;


    return (
        <div className={`modal-overlay ${isModalOpen ? "modal-overlay--open" : ""}`}>
            <form className="add-film" onSubmit={editingFilm ? () => onEditFilm(editingFilm) : onSaveFilm}>
                <div className="add-film__header">
                    <p className="add-film__title">{editingFilm ? "Изменить фильм" : "Добавить фильм"}</p>
                    <Button onClick={closeModal} className="close-modal__button">
                        <X size={"16"} />
                    </Button>
                </div>
                <div className="add-film__body">
                    <label htmlFor="film-name">
                        Название:
                    </label>
                    <Field placeholder="Название" value={filmName} onChange={(e) => setFilmName(e.target.value)} required id="film-name"/>
                    <label htmlFor="film-type">
                        Тип:
                    </label>
                    <Select value={filmType} onChange={(e) => setFilmType(e.target.value)} required id="film-type">
                        <option disabled={true}>
                            Тип
                        </option>
                        <option value="movie">
                            Movie
                        </option>
                        <option value="cartoon">
                            Cartoon
                        </option>
                        <option value="anime">
                            Anime
                        </option>
                        <option value="serial">
                            Serial
                        </option>
                    </Select>
                    {enableSeries ? (
                        <>
                            <label htmlFor="film-season">
                                Сезон:
                            </label>
                            <Field type="number" placeholder="Сезон" value={filmSeason} onChange={(e) => setFilmSeason(e.target.value)} id="film-season"/>
                            <label htmlFor="film-series">
                                Серия:
                            </label>
                            <Field type="number" placeholder="Серия" value={filmSeries} onChange={(e) => setFilmSeries(e.target.value)} id="film-series"/>
                        </>
                    ) : null}
                    {enableRating ? (
                        <>
                            <label htmlFor="film-rating">
                                Рейтинг:
                            </label>
                            <Field type="number" placeholder="Рейтинг" value={filmRating} onChange={(e) => setFilmRating(e.target.value)} max="10" min="0" id="film-rating" step="0.01"/>
                        </>
                    ) : null}
                    <label htmlFor="series-enable" className="checkbox">
                        <Field type="checkbox" id="series-enable" checked={enableSeries} onChange={(e) => setEnableSeries(e.target.checked)}/>
                        <span>
                            Включить серии
                        </span>
                    </label>
                    <label htmlFor="rating-enable" className="checkbox">
                        <Field type="checkbox" id="rating-enable" checked={enableRating} onChange={(e) => setEnableRating(e.target.checked)}/>
                        <span>
                            Включить рейтинг
                        </span>
                    </label>
                </div>
                <div className="add-film__footer">
                    <Button className="add-film__button" type="submit">
                        {editingFilm ? "Сохранить" : "Добавить"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddFilmForm;