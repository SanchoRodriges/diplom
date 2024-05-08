import React, {useEffect, useState} from "react";
import useOpenHeader from "@/hooks/useOpenHeader.js";
import useFetching from "@/hooks/useFetching.js";

const typeSeat = {
    standart: 'conf-step__chair_standart',
    vip: 'conf-step__chair_vip',
    disabled: 'conf-step__chair_disabled',
}

const statuses = ['disabled', 'standart', 'vip'];
const ConfigCinema = ({cinemas, setCinemas}) => {
    const [changeOpen, classHeader] = useOpenHeader();
    const [checkedCinema, setCheckedCinema] = useState({});
    const [seats, setSeats] = useState([]);
    const [rowsAndSeats, setRowsAndSeats] = useState({
        numberOfRows: 0,
        numberOfSeat: 0,
    });

    const initSeats = async () => {
        const response = await fetch(`/api/seats/${checkedCinema.id}`);
        if (!response.ok)
            throw new Error('Error fetching');

        const result = await response.json();
        if (!result.length)
            return setSeats([]);

        const arr = [];
        for (const seat of result) {
            if (!arr[seat.row - 1])
                arr[seat.row - 1] = [];
            arr[seat.row - 1][seat.seat - 1] = seat;
        }
        setSeats(arr);
    }

    const seatElement = (row, seat) => {
        return {
            row,
            seat,
            cinemaId: checkedCinema.id,
            status: 'standart',
            isEmploy: false,
        }
    }

    const changeStatusSeat = ({row, seat, status}) => {
        const indexStatus = statuses.indexOf(status);
        const newStatus = statuses[indexStatus + 1] || statuses[0];
        setSeats((prevState) => {
            const newState = [...prevState];
            newState[row - 1][seat - 1].status = newStatus;
            return newState
        })
    }

    const resetRowsAndSeats = () => {
        for (const name in rowsAndSeats) {
            updateRowsAndSeats({
                target: {name, value: checkedCinema[name]}
            });
        }
    };

    const updateRowsAndSeats = ({target}) => {
        const {name, value} = target;
        const result = [];
        if (name === 'numberOfRows') {
            for (let i = 0; i < +value; i++) {
                if (seats[i]) {
                    result.push(seats[i]);
                    continue;
                }
                const newRow = [];
                for (let j = 0; j < rowsAndSeats.numberOfSeat; j++) {
                    newRow.push(seatElement(+i + 1, j + 1));
                }
                result.push(newRow);
            }
        } else {
            for (let i = 0; i < rowsAndSeats.numberOfRows; i++) {
                const newRow = [];
                for (let j = 0; j < +value; j++) {
                    seats[i]?.[j]
                        ? newRow.push(seats[i][j])
                        : newRow.push(seatElement(i + 1, j + 1));
                }
                result.push(newRow);
            }
        }
        setSeats(result);
        setRowsAndSeats(prev => ({...prev, [name]: value}));
    };

    const updateCinema = async () => {
        const response = await fetch(`/api/cinemas/${checkedCinema.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                ...checkedCinema,
                ...rowsAndSeats
            }),
            headers: {'Content-Type': 'application/json'}
        });
        if (!response.ok)
            return console.error(response);

        const data = await response.json();
        console.log(data)
        setCinemas(cinemas.map(cinema =>
            cinema.id === data.id ? data : cinema
        ));
    }

    const changeSeats = async (url, method, seat) => {
        try {
            const response = await fetch(url, {
                method,
                body: JSON.stringify(seat),
                headers: {'Content-Type': 'application/json'}
            });
            if (!response.ok)
                throw new Error(response.statusText);

            const data = await response.json();
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    }

    const update = async () => {
        try {
            await changeSeats(`/api/seats/cinema/${checkedCinema.id}`, 'DELETE', {});
            await changeSeats(`/api/seats/store/cinema`, 'POST', seats.flat());
            await updateCinema();
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        resetRowsAndSeats();
        initSeats();
    }, [checkedCinema]);

    return (
        <section className="conf-step">
            <header className={'conf-step__header ' + classHeader}
                    onClick={changeOpen}>
                <h2 className="conf-step__title">Конфигурация залов</h2>
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
                                       onChange={() => setCheckedCinema(cinema)}/>
                                <span className="conf-step__selector">{cinema.name}</span>
                            </li>
                        ))
                    }
                </ul>
                <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в
                    ряду:</p>
                <div className="conf-step__legend">
                    <label className="conf-step__label">
                        Рядов, шт
                        <input type="number"
                               className="conf-step__input"
                               placeholder="10"
                               name="numberOfRows"
                               value={rowsAndSeats.numberOfRows}
                               onChange={updateRowsAndSeats}
                        />
                    </label>
                    <span className="multiplier">x</span>
                    <label className="conf-step__label">
                        Мест, шт
                        <input type="number"
                               className="conf-step__input"
                               placeholder="8"
                               name="numberOfSeat"
                               value={rowsAndSeats.numberOfSeat}
                               onChange={updateRowsAndSeats}
                        />
                    </label>
                </div>
                <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
                <div className="conf-step__legend">
                    <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
                    <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
                    <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет
                    кресла)
                    <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой
                        мыши</p>
                </div>

                <div className="conf-step__hall">
                    <div className="conf-step__hall-wrapper">
                        {seats.map((row, i) =>
                            <div key={i} className="conf-step__row">
                                {row?.map((item) =>
                                    <span key={`${item.row}-${item.seat}-${Date.now()}`}
                                          className={`conf-step__chair ${typeSeat[item.status]}`}
                                          onClick={() => changeStatusSeat(item)}></span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <fieldset className="conf-step__buttons text-center">
                    <button className="conf-step__button conf-step__button-regular"
                            onClick={resetRowsAndSeats}>Отмена
                    </button>
                    <button className="conf-step__button conf-step__button-accent"
                            onClick={update}>Сохранить
                    </button>
                </fieldset>
            </div>
        </section>
    )
}

export default ConfigCinema;
