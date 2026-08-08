import Field from "../Field.jsx";
import Button from "../Button.jsx";
import Select from "../Select.jsx";

const UtilsForm = (props) => {

    const {
        openModal,
        searchQuery,
        setSearchQuery,
        sortType,
        setSortType,
    } = props;

    return (
        <form className="form utils-form" onSubmit={(e) => e.preventDefault()}>
            <Field type="search" id="search-field" placeholder="Найти фильм" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
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
                +
            </Button>
        </form>
    )
}

export default UtilsForm;