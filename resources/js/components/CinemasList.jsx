import {useState} from "react";
import useOpenHeader from "@/hooks/useOpenHeader.js";

const CinemasList = ({cinemas, setCinemas}) => {
    const [changeOpen, classHeader] = useOpenHeader();
    const cinemaDestroy = async (id) => {
        const response = await fetch(`/api/cinemas/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            console.error(response);
            return
        }
        setCinemas(cinemas.filter(cinema => cinema.id !== id));
    }

    const [addCinemaVisible, setAddCinemaVisible] = useState(false);
    const [cinemaName, setCinemaName] = useState('');
    const addCinema = async () => {
        const response = await fetch(`/api/cinemas/store`, {
            method: 'POST',
            body: JSON.stringify({
                name: cinemaName,
                numberOfRows: 0,
                numberOfSeat: 0,
                isActive: false,
                priceTicket: 0,
                priceTicketVIP: 0,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            console.error(response);
            return
        }
        const data = await response.json();
        setCinemas([...cinemas, data]);
        resetCinema();
    }

    const resetCinema = () => {
        setCinemaName('');
        setAddCinemaVisible(false);
    }

    return (
        <section className="conf-step">
            <header className={'conf-step__header ' + classHeader}
                    onClick={changeOpen}>
                <h2 className="conf-step__title">Управление залами</h2>
            </header>
            <div className="conf-step__wrapper">
                {cinemas.length > 0 &&
                    <p className="conf-step__paragraph">Доступные залы:</p>
                }
                <ul className="conf-step__list">
                    {cinemas.map((cinema) => (
                        <li key={cinema.id}>{cinema.name + ' - '}
                            <button className="conf-step__button conf-step__button-trash"
                                    onClick={() => cinemaDestroy(cinema.id)}/>
                        </li>
                    ))}
                </ul>
                {!addCinemaVisible
                    ? <button className="conf-step__button conf-step__button-accent"
                              onClick={() => setAddCinemaVisible(!addCinemaVisible)}>
                        Создать зал
                    </button>
                    : <>
                        <input type="text"
                               className="conf-step__input"
                               style={{width: 300 + 'px'}}
                               placeholder="Название зала"
                               value={cinemaName}
                               onChange={(e) => setCinemaName(e.target.value)}/>
                        <button className="conf-step__button conf-step__button-accent"
                                onClick={resetCinema}>
                            Отмена
                        </button>
                        <button className="conf-step__button conf-step__button-accent"
                                onClick={addCinema}>
                            Сохранить
                        </button>
                    </>
                }
            </div>
        </section>
    )
}

export default CinemasList;
