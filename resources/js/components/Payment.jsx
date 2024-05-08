import {useParams} from "react-router-dom";
import useFetching from "@/hooks/useFetching.js";
import {useEffect, useState} from "react";

const Payment = () => {
    const params = useParams();
    const [sessionId, seatsArr] = params.id.split('-');
    const [seats, setSeats] = useState([]);

    const seatsId = seatsArr.split(',');

    const {data: session} = useFetching(`/api/sessions/${sessionId}`);
    const cost = () => {
        let sum = 0;
        seats.forEach(({status}) =>
            sum += status === 'vip'
                ? session.cinema.priceTicketVIP
                : session.cinema.priceTicket
        );
        return sum;
    }

    useEffect(() => {
        (async () => {
            for await (const id of seatsId) {
                const response = await fetch(`/api/seats/one/${id}`);
                if (!response.ok) continue;
                const data = await response.json();
                setSeats(prev => prev?.every(({id}) => id !== data.id) ? [...prev, data] : prev);
            }
        })();
    }, []);

    const saveTickets = async () => {
        let ticketsId = '';
        for await (const seat of seats) {
            const body = JSON.stringify({
                sessionId: session.id,
                seatId: seat.id,
                QR: 'qrCode',
                price: seat.status === 'vip' ? session.cinema.priceTicketVIP : session.cinema.priceTicket,
            });

            const response = await fetch('/api/tickets/store', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body
            });
            if (response.ok) {
                const data = await response.json();
                const QR = `${data.id}-${data.sessionId}-${data.seatId}`
                const update = await fetch(`/api/tickets/${data.id}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({QR})
                });
                if (update.ok) {
                    const data = await update.json();
                    console.log(QR, 'updated', data)
                    if (data.QR !== QR)
                        throw new Error('Не удалось обновить билет');
                }
                ticketsId += data.id + '-';
            }
        }
        location.href = `../ticket/${ticketsId.slice(0, -1)}`
    }

    return (
        <main>
            <section className="ticket">
                <header className="tichet__check">
                    <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
                </header>
                {
                    session && seats.length &&
                    <div className="ticket__info-wrapper">
                        <p className="ticket__info">На фильм:
                            <span className="ticket__details ticket__title"> {session.movie.name}</span>
                        </p>
                        <p className="ticket__info">Места:
                            <span className="ticket__details ticket__chairs">
                                 {seats.map(({row, seat}) => ` ${row}-${seat}`)?.join(', ')}
                            </span>
                        </p>
                        <p className="ticket__info">В зале:
                            <span className="ticket__details ticket__hall"> {session.cinema.name}</span>
                        </p>
                        <p className="ticket__info">Начало сеанса:
                            <span className="ticket__details ticket__start"> {
                                new Date(session.timeStart)
                                    .toLocaleTimeString('ru-RU', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })
                            }</span>
                        </p>
                        <p className="ticket__info">Стоимость: <span
                            className="ticket__details ticket__cost">{cost()}</span> рублей</p>
                        <button className="acceptin-button"
                                onClick={saveTickets}>
                            Получить код бронирования
                        </button>

                        <p className="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на
                            почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
                        <p className="ticket__hint">Приятного просмотра!</p>
                    </div>
                }
            </section>
        </main>
    );
}

export default Payment;
