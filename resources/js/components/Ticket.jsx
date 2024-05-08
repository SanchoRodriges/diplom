import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useFetching from "@/hooks/useFetching.js";
import {QRCodeSVG} from 'qrcode.react';

const Ticket = () => {
    const params = useParams();
    const ticketsId = params.id;
    const {data: tickets} = useFetching(`/api/tickets/${ticketsId}`);
    const QR = `${location.host}/ticket/${ticketsId}`

    return (
        <section className="ticket">
            <header className="tichet__check">
                <h2 className="ticket__check-title">Электронный билет</h2>
            </header>

            {tickets?.length &&
                <div className="ticket__info-wrapper">
                    <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">
                    {tickets?.[0].movie?.name}
                </span></p>
                    <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">
                    {tickets?.reduce((res, {seat}) => res += `${seat.row}-${seat.seat} `, '')}
                </span></p>
                    <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">
                    {tickets?.[0].cinema?.name}
                </span></p>
                    <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">
                    {new Date(tickets?.[0].session?.timeStart).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </span></p>
                    <QRCodeSVG value={QR} className="ticket__info-qr"/>

                    <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
                    <p className="ticket__hint">Приятного просмотра!</p>
                </div>
            }
        </section>
    )
}

export default Ticket;
