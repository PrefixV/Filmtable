import Field from "../Field.jsx";
import Button from "../Button.jsx";
import Select from "../Select.jsx";
import { Plus } from "@boxicons/react"

const UtilsForm = (props) => {

    const {
        openModal,
        searchQuery,
        setSearchQuery,
        sortType,
        setSortType,
        watchFilter,
        setWatchFilter
    } = props;

    return (
        <form className="form utils-form" onSubmit={(e) => e.preventDefault()}>
            <Field type="search" id="search-field" placeholder="Найти фильм" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <Select className={"sort-field"} value={watchFilter} onChange={(e) => setWatchFilter(e.target.value)}>
                <option disabled={true}>
                    Выбор
                </option>
                <option value={"selectAll"}>
                    Все
                </option>
                <option value={"byDoWatch"}>
                    Просмотренные
                </option>
                <option value={"byNotWatch"}>
                    Не просмотренные
                </option>
            </Select>
            <Select className={"sort-field"} value={sortType} onChange={(e) => setSortType(e.target.value)}>
                <option disabled={true}>
                    Сортировка
                </option>
                <option value={"byName"}>
                    По имени
                </option>
                <option value={"byRating"}>
                    По рейтингу
                </option>
                <option value={"byType"}>
                   По типу
                </option>
            </Select>
            <Button className={`button__open-modal`} onClick={openModal}>
                <Plus style={{height: "16px", width: "16px"}}/>
            </Button>
        </form>
    )
}

export default UtilsForm;