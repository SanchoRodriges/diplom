import React, {useEffect, useState} from "react";
import useOpenHeader from "@/hooks/useOpenHeader.js";

const PriceConfiguration = ({cinemas, setCinemas}) => {
    const [changeOpen, classHeader] = useOpenHeader();
    const [checkedCinema, setCheckedCinema] = useState({});
    const [price, setPrice] = useState({
        priceTicket: 0,
        priceTicketVIP: 0,
    });

    const cinemaSelection = (cinema) => {
        setCheckedCinema(cinema);
        setPrice({priceTicket: cinema.priceTicket, priceTicketVIP: cinema.priceTicketVIP});
    }

    const updatePrice = event => {
        const {name, value} = event.target;
        setPrice(prevState => ({...prevState, [name]: +value}));
    }

    const resetPrice = () => {
        setPrice({
            priceTicket: checkedCinema.priceTicket,
            priceTicketVIP: checkedCinema.priceTicketVIP
        });
    }

    const savePrice = async () => {
        const response = await fetch(`/api/cinemas/${checkedCinema.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                ...checkedCinema,
                ...price
            }),
            headers: {'Content-Type': 'application/json',}
        });
        if (!response.ok)
            return console.error(response);

        const data = await response.json();
        setCinemas(cinemas.map(cinema =>
            cinema.id === data.id ? data : cinema
        ));
    }

    useEffect(() => {
        resetPrice();
    }, [checkedCinema]);

    return (
        <section className="conf-step">
            <header className={'conf-step__header ' + classHeader}
                    onClick={changeOpen}>
                <h2 className="conf-step__title">Конфигурация цен</h2>
            </header>
            <div className="conf-step__wrapper">
                <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
                <ul className="conf-step__selectors-box">
                    {
                        cinemas.map((cinema) => (
                            <li key={cinema.id}>
                                <input type="radio" className="conf-step__radio" name="chairs-hall"
                                       value={cinema.name}
                                       checked={cinema.name === checkedCinema.name}
                                       onChange={() => cinemaSelection(cinema)}/>
                                <span className="conf-step__selector">{cinema.name}</span>
                            </li>
                        ))
                    }
                </ul>

                <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
                <div className="conf-step__legend">
                    <label className="conf-step__label">Цена, рублей
                        <input type="number"
                               className="conf-step__input"
                               placeholder="0"
                               name="priceTicket"
                               value={price.priceTicket}
                               onChange={updatePrice}/>
                    </label>
                    за <span className="conf-step__chair conf-step__chair_standart"></span> обычные кресла
                </div>
                <div className="conf-step__legend">
                    <label className="conf-step__label">Цена, рублей
                        <input type="number"
                               className="conf-step__input"
                               placeholder="0"
                               name="priceTicketVIP"
                               value={price.priceTicketVIP}
                               onChange={updatePrice}/>
                    </label>
                    за <span className="conf-step__chair conf-step__chair_vip"></span> VIP кресла
                </div>
                `

                <fieldset className="conf-step__buttons text-center">
                    <button className="conf-step__button conf-step__button-regular"
                            onClick={resetPrice}>Отмена
                    </button>
                    <button className="conf-step__button conf-step__button-accent"
                            onClick={savePrice}
                            disabled={JSON.stringify(price) === JSON.stringify({
                                priceTicket: checkedCinema.priceTicket,
                                priceTicketVIP: checkedCinema.priceTicketVIP
                            })}
                    >Сохранить
                    </button>
                </fieldset>
            </div>
        </section>
    )
}

export default PriceConfiguration;
