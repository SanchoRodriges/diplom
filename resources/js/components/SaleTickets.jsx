import React from "react";
import useOpenHeader from "@/hooks/useOpenHeader.js";

const SaleTickets = ({cinemas, setCinemas}) => {
    const [changeOpen, classHeader] = useOpenHeader();

    const openSaleTickets = async () => {
        for await (const cinema of cinemas) {
            try {
                const response = await fetch(`/api/cinemas/${cinema.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        ...cinema, isActive: true
                    }),
                    headers: {'Content-Type': 'application/json'}
                });
                if (!response.ok)
                    throw new Error('Error fetching, status:' + response.status);

                setCinemas(cinemas.map(item => item.id === cinema.id ? {...cinema, isActive: true} : item));
            } catch (e) {
                console.error(e);
            }
        }
    }
    return (
        <section className="conf-step">
            <header className={'conf-step__header ' + classHeader}
                    onClick={changeOpen}>
                <h2 className="conf-step__title">Открыть продажи</h2>
            </header>
            <div className="conf-step__wrapper text-center">
                <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
                <button onClick={openSaleTickets}
                        className="conf-step__button conf-step__button-accent">
                    Открыть продажу билетов
                </button>
            </div>
        </section>
    )
}

export default SaleTickets;
