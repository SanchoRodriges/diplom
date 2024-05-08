import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useFetching from "@/hooks/useFetching.js";

const Hall = () => {
    const params = useParams();
    const {data: session} = useFetching(`/api/sessions/${params.id}`);
    const {data: seats} = useFetching(`/api/seats/${session?.cinema.id || 0}`);
    const [choseSeats, setChoseSeats] = useState([]);
    const occupiedSeat = session?.tickets?.map(t => Number(t)) || [];

    const viewSeats = () => {
        if (!seats?.length) return;
        const arr = [];
        for (const seat of seats) {
            if (!arr[seat.row - 1])
                arr[seat.row - 1] = [];
            arr[seat.row - 1][seat.seat - 1] = seat;
        }
        return arr;
    }

    const getClassSeat = (seat) => {
        if (choseSeats.includes(seat.id))
            return 'buying-scheme__chair_selected';
        if (seat.status === 'disabled')
            return 'buying-scheme__chair_disabled';
        if (occupiedSeat.includes(seat.id))
            return 'buying-scheme__chair_taken';
        if (seat.status === 'vip')
            return 'buying-scheme__chair_vip';
        return 'buying-scheme__chair_standart';
    }

    const selectSeat = (seat) => {
        if (seat.status === 'disabled') return;
        choseSeats.includes(seat.id)
            ? setChoseSeats(choseSeats.filter(id => id !== seat.id))
            : setChoseSeats([...choseSeats, seat.id]);
    }

    return (
        <div>
            {session && seats &&
                <main>
                    <section className="buying">
                        <div className="buying__info">
                            <div className="buying__info-description">
                                <h2 className="buying__info-title">{session.movie.name}</h2>
                                <p className="buying__info-start">Начало
                                    сеанса: {new Date(session.timeStart).toLocaleTimeString('ru', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}</p>
                                <p className="buying__info-hall">{session.cinema.name}</p>
                            </div>
                            <div className="buying__info-hint">
                                <p>Тапните дважды,<br/>чтобы увеличить</p>
                            </div>
                        </div>
                        <div className="buying-scheme">
                            <div className="buying-scheme__wrapper">
                                {viewSeats()?.map((row, index) => (
                                    <div key={index} className="buying-scheme__row">
                                        {row.map(seat =>
                                            <span key={seat.id}
                                                  className={`buying-scheme__chair ${getClassSeat(seat)}`}
                                                  onClick={() => selectSeat(seat)}></span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="buying-scheme__legend">
                                <div className="col">
                                    <p className="buying-scheme__legend-price"><span
                                        className="buying-scheme__chair buying-scheme__chair_standart"></span> Свободно
                                        (<span
                                            className="buying-scheme__legend-value">{session.cinema.priceTicket}</span>
                                        руб)
                                    </p>
                                    <p className="buying-scheme__legend-price"><span
                                        className="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP
                                        (<span
                                            className="buying-scheme__legend-value">{session.cinema.priceTicketVIP}</span>руб)
                                    </p>
                                </div>
                                <div className="col">
                                    <p className="buying-scheme__legend-price"><span
                                        className="buying-scheme__chair buying-scheme__chair_taken"></span> Занято</p>
                                    <p className="buying-scheme__legend-price"><span
                                        className="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button className="acceptin-button"
                                onClick={() => location.href = `../payment/${session.id}-${choseSeats.join(',')}`}>Забронировать
                        </button>
                    </section>
                </main>
            }
        </div>
    )
}

export default Hall;
