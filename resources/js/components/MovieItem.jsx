import {useEffect, useState} from "react";

const MovieItem = ({movie, cinemas}) => {
    const cinemasWithSession = () => {
        const result = [];
        cinemas.forEach(cinema => {
            const sessions = movie.sessions.filter(({cinemaId}) => cinemaId == cinema.id)
            if (sessions.length) {
                result.push({cinema, sessions});
            }
        })
        return result;
    }

    return (
        <section className="movie">
            <div className="movie__info">
                <div className="movie__poster">
                    {
                        movie.avatar &&
                        <img className="movie__poster-image"
                             alt="Звёздные войны постер"
                             src={`/storage/${movie.avatar}`}/>
                    }
                </div>
                <div className="movie__description">
                    <h2 className="movie__title">{movie.name}</h2>
                    <p className="movie__synopsis">{movie.description}</p>
                    <p className="movie__data">
                        <span className="movie__data-duration">{movie.length} минут</span>
                        <span className="movie__data-origin"> {movie.country || 'США'}</span>
                    </p>
                </div>
            </div>
            {cinemasWithSession().map(({cinema, sessions}) =>
                <div key={cinema.id} className="movie-seances__hall">
                    <h3 className="movie-seances__hall-title">{cinema.name}</h3>
                    <ul className="movie-seances__list">
                        {sessions.map(session =>
                            <li key={session.id} className="movie-seances__time-block">
                                <a className="movie-seances__time"
                                   href={`../hall/${session.id}`}>
                                    {new Date(session.timeStart).toLocaleTimeString('ru', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </section>
    )
}

export default MovieItem;
