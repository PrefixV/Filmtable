const API_URL = "http://localhost:3003/films";

export const getFilms = async () => {
    const response = await fetch(API_URL);
    if(!response.ok) {
        throw new Error("Ошибка получения фильмов");
    }

    const data = await response.json();
    return data;
}

export const createFilm = async (film) => {
    const response = await fetch(API_URL, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(film)
    })

    if(!response.ok) {
        throw new Error("Ошибка доавления фильма");
    }

    const data = await response.json();
    return data;

}

export const deleteFilm = async (filmId) => {
    const response = await fetch(`${API_URL}/${filmId}`, {
        method: "DELETE"
    })

    if(!response.ok) {
        throw new Error("Ошибка удаления фильма")
    }
}

export const toggleFilmWatch = async (filmId, isWatched) => {
    const response = await fetch(`${API_URL}/${filmId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({isWatched})
    })

    if(!response.ok) {
        throw new Error("Ошибка переключения просмотра")
    }

    const data = await response.json();
    return data;
}

export const editFilm = async (filmId,film) => {
    const response = await fetch(`${API_URL}/${filmId}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(film)
    })

    if(!response.ok) {
        throw new Error("Ошибка изменения данных фильма")
    }

    const data = await response.json();
    return data;
}

export const getFilmById = async (filmId) => {
    const response = await fetch(`${API_URL}/${filmId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({filmId})
    })

    if(!response.ok) {
        throw new Error("Ошибка получения фильма");
    }

    const data = await response.json();
    return data;
}