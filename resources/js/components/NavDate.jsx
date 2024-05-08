import {useState} from "react";
import {start} from "@popperjs/core";

const NavDate = ({choseData, setChoseData}) => {
    const [startDay, setStartDay] = useState(new Date());
    const dateList = () => {
        const newDate = (i) =>
            new Date(new Date(startDay).setDate(startDay.getDate() + i));

        const list = [];
        for (let i = 0; i < 7; i++) {
            const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
            const item = {
                date: newDate(i),
                dayNumber: newDate(i).getDate(),
                dayWeek: days[newDate(i).getDay()],
                isToday: newDate(i).getDate() === new Date().getDate() ? 'page-nav__day_today' : '',
                isChosen: newDate(i).getDate() === choseData.getDate() ? 'page-nav__day_chosen' : '',
                isWeekend: [0, 6].includes(newDate(i).getDay()) ? 'page-nav__day_weekend' : '',
            };
            list.push({...item});
        }
        return list;
    }

    return (
        <nav className="page-nav">
            {
                startDay > new Date() &&
                <a className="page-nav__day page-nav__day_ago"
                   onClick={() => setStartDay(() => new Date(new Date(startDay).setDate(startDay.getDate() - 7)))}
                   href="#"/>
            }
            {
                dateList().map((item) => {
                    return (
                        <a className={`page-nav__day ${item.isToday} ${item.isChosen} ${item.isWeekend}`}
                           key={item.date}
                           onClick={() => setChoseData(() => item.date)}
                           href="#">
                            <span className="page-nav__day-week">{item.dayWeek}</span>
                            <span className="page-nav__day-number">{item.dayNumber}</span>
                        </a>
                    )
                })
            }
            {
                (startDay.getDate() > new Date().getDate()
                    ? startDay.getDate() - new Date().getDate() < 14
                    : startDay.getDate() + 30 - new Date().getDate()) &&
                <a className="page-nav__day page-nav__day_next"
                   onClick={() => setStartDay(() => new Date(new Date(startDay).setDate(startDay.getDate() + 7)))}
                   href="#"/>
            }
        </nav>
    )
}

export default NavDate;
