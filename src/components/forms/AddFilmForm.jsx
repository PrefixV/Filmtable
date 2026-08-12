import Button from "../Button.jsx";
import {X} from "@boxicons/react"
import Field from "../Field.jsx";
import Select from "../Select.jsx";
import TextArea from "../TextArea.jsx";

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
        filmDetails,
        setFilmDetails,
        acting,
        ambience,
        audioEffects,
        character,
        setActing,
        setAmbience,
        setAudioEffects,
        setCharacter,
        setFilmPlot,
        setOriginality,
        setRewatchable,
        setPersonalOpinion,
        setVfxEffects,
        setVoiceOver,
        vfxEffects,
        personalOpinion,
        voiceOver,
        originality,
        rewatchable,
        filmPlot,
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
                    <label htmlFor={"textArea"}>
                        Описание:
                    </label>
                    <TextArea id="textArea" placeholder="Описание" value={filmDetails} onChange={(e) => setFilmDetails(e.target.value)}/>
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
                        <div className="film-rating__wrapper">
                            <label htmlFor="film-plot">
                                Сюжет фильма

                            <Field id="film-plot" placeholder="Рейтинг сюжета фильма" value={filmPlot} onChange={(e) => setFilmPlot(e.target.value)}/>
                            </label>
                            <label htmlFor="film-acting">
                                Актерская игра
                            <Field id="film-acting" placeholder="Рейтинг актерской игры" value={acting} onChange={(e) => setActing(e.target.value)}/>
                            </label>
                            <label htmlFor="film-vfx">
                                VFX Эффекты
                            <Field id="film-vfx" placeholder="Рейтинг VFX эффектов" value={vfxEffects} onChange={(e) => setVfxEffects(e.target.value)}/>
                            </label>
                            <label htmlFor="film-audio">
                                Звуковое сопровождение
                            <Field id="film-audio" placeholder="Рейтинг звукового сопровождения" value={audioEffects} onChange={(e) => setAudioEffects(e.target.value)}/>
                            </label>
                            <label htmlFor="film-originality">
                                Оригинальность
                            <Field id="film-originality" placeholder="Рейтинг оригинальности" value={originality} onChange={(e) => setOriginality(e.target.value)}/>
                            </label>
                            <label htmlFor="film-rewatchable">
                                Пересматриваемость
                            <Field id="film-rewatchable" placeholder="Рейтинг пересматриваемости" value={rewatchable} onChange={(e) => setRewatchable(e.target.value)}/>
                            </label>
                            <label htmlFor="film-ambience">
                                Создание атмосферы
                            <Field id="film-ambience" placeholder="Рейтинг атмосферы" value={ambience} onChange={(e) => setAmbience(e.target.value)}/>
                            </label>
                            <label htmlFor="film-character">
                                Развитие персонажей
                            <Field id="film-character" placeholder="Рейтинг развития персонажей" value={character} onChange={(e) => setCharacter(e.target.value)}/>
                            </label>
                            <label htmlFor="film-voiceover">
                                Озвучка
                            <Field id="film-voiceover" placeholder="Рейтинг озвучки" value={voiceOver} onChange={(e) => setVoiceOver(e.target.value)}/>
                            </label>
                            <label htmlFor="film-opinion">
                                Личная оценка
                            <Field id="film-opinion" placeholder="Рейтинг личной оценки" value={personalOpinion} onChange={(e) => setPersonalOpinion(e.target.value)}/>
                            </label>
                        </div>
                    ) : null}
                    <label htmlFor="series-enable" className="checkbox">
                        <Field type="checkbox" id="series-enable" checked={enableSeries} onChange={(e) => setEnableSeries(e.target.checked)} className="enable-button"/>
                        <span>
                            Включить серии
                        </span>
                    </label>
                    <label htmlFor="rating-enable" className="checkbox">
                        <Field type="checkbox" id="rating-enable" checked={enableRating} onChange={(e) => setEnableRating(e.target.checked)} className="enable-button"/>
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