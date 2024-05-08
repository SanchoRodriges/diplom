import React, {useEffect, useRef, useState} from "react";
import useOpenHeader from "@/hooks/useOpenHeader.js";
import {Button} from "react-bootstrap";
import AddMovieForm from "@/components/AddMovieForm.jsx";
import SessionForm from "@/components/SessionForm.jsx";

const SessionsList = ({cinemas, setCinemas}) => {
    const [changeOpen, classHeader] = useOpenHeader();
    const [addMovieVisible, setAddMovieVisible] = useState(false);
    const [movies, setMovies] = useState([]);
    const [checkedMovie, setCheckedMovie] = useState({});
    const [showSession, setShowSession] = useState(false);
    const [sessions, setSessions] = useState([]);
    const row = useRef(null);
    const [rowWidth, setRowWidth] = useState(720);

    const removeMovie = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await fetch(`/api/movies/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok)
                throw new Error(response.statusText);

            const sessions = await response.json();
            setMovies(prev => prev.filter(movie => movie.id !== id));
            setSessions(sessions);
        } catch (e) {
            console.error(e);
        }
    }

    const addSession = (movie) => {
        setCheckedMovie(movie);
        setShowSession(true);
    }

    const saveSessions = async () => {
        try {
            for await (const session of sessions) {
                if (session.id) continue;

                const request = await fetch('/api/sessions/store', {
                    method: 'POST',
                    body: JSON.stringify(session),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!request.ok)
                    throw new Error(request.statusText);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const resetSession = () => {
        setSessions(pre => pre.filter(session => session.id));
    }

    const widthElement = (start, end) => {
        const lengthMin = (new Date(end) - new Date(start)) / 1000 / 60;
        const procent = lengthMin / (24 * 60);
        return (procent * rowWidth) + 'px';
    }

    const startElement = (start) => {
        const startObj = new Date(start);
        const startDay = new Date(startObj.toLocaleDateString('en-US'));
        const lengthMin = (startObj - startDay) / 1000 / 60
        const procent = lengthMin / (24 * 60);
        return (procent * rowWidth) + 'px';
    }

    useEffect(() => {
        (async () => {
            try {
                const movies = await fetch('/api/movies');
                if (!movies.ok)
                    throw new Error(`Error movies: ${movies.status} ${movies.statusText}` || movies.statusText);

                const moviesData = await movies.json();
                setMovies(moviesData);

                const sessions = await fetch('/api/sessions');
                if (!sessions.ok)
                    throw new Error(`Error sessions: ${sessions.status} ${sessions.statusText}` || sessions.statusText);

                const sessionsData = await sessions.json();
                setSessions(sessionsData);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (row.current)
                setRowWidth(row.current.offsetWidth);
        }

        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize);
    }, [row]);

    return (
        <section className="conf-step">
            <header className={'conf-step__header ' + classHeader}
                    onClick={changeOpen}>
                <h2 className="conf-step__title">Сетка сеансов</h2>
            </header>
            <div className="conf-step__wrapper">
                {!addMovieVisible &&
                    <p className="conf-step__paragraph">
                        <button className="conf-step__button conf-step__button-accent"
                                onClick={() => setAddMovieVisible(true)}>Добавить фильм
                        </button>
                    </p>
                }
                <AddMovieForm isShow={addMovieVisible}
                              setAddMovieVisible={setAddMovieVisible}
                              setMovies={setMovies}/>
                <div className="conf-step__movies">
                    {
                        movies.length > 0 && movies.map((movie) => (
                            <div className="conf-step__movie"
                                 key={movie.id}
                                 onClick={() => addSession(movie)}>
                                {movie.avatar &&
                                    <img className="conf-step__movie-poster" alt="poster"
                                         src={`/storage/${movie.avatar}`}/>
                                }
                                <Button variant="outline-danger"
                                        size="sm"
                                        onClick={(e) => removeMovie(e, movie.id)}
                                        style={{position: 'absolute', top: 5, right: 5}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-trash" viewBox="0 0 16 16">
                                        <path
                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>
                                </Button>
                                <h3 className="conf-step__movie-title">
                                    {movie.name}
                                </h3>
                                <p className="conf-step__movie-duration">{movie.length} минут</p>
                            </div>
                        ))
                    }
                </div>

                <SessionForm show={showSession}
                             setShow={setShowSession}
                             cinemas={cinemas}
                             movie={checkedMovie}
                             sessions={sessions}
                             setSessions={setSessions}/>

                <div className="conf-step__seances">
                    {
                        cinemas.length > 0 && cinemas.map((cinema) => (
                            <div className="conf-step__seances-hall"
                                 key={cinema.id}>
                                <h3 className="conf-step__seances-title">{cinema.name}</h3>
                                <div className="conf-step__seances-timeline"
                                     ref={row}>
                                    {sessions.filter(({cinemaId}) => cinemaId == cinema.id)
                                        .map((session) => (
                                            <div className="conf-step__seances-movie"
                                                 style={{
                                                     width: widthElement(session.timeStart, session.timeEnd),
                                                     backgroundColor: 'rgb(133, 255, 137)',
                                                     left: startElement(session.timeStart)
                                                 }}
                                                 key={session.id + session.timeStart}>
                                                <p className="conf-step__seances-movie-title">
                                                    {movies.find(({id}) => id == session.movieId)?.name || 'Неизвестное имя фильма'}
                                                </p>
                                                <p className="conf-step__seances-movie-start">
                                                    {new Date(session.timeStart)
                                                        .toLocaleTimeString('ru-RU', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
                <fieldset className="conf-step__buttons text-center">
                    <button
                        className="conf-step__button conf-step__button-regular"
                        onClick={resetSession}
                    >Отмена
                    </button>
                    <input type="submit"
                           value="Сохранить"
                           className="conf-step__button conf-step__button-accent"
                           onClick={saveSessions}
                    />
                </fieldset>
            </div>
        </section>
    )
}

export default SessionsList;
