import {Form, Modal} from "react-bootstrap";
import {useState} from "react";

const SessionForm = ({show, setShow, cinemas, movie, sessions, setSessions}) => {
    const [session, setSession] = useState({});
    const [freeTimes, setFreeTimes] = useState(
        new Array(24).fill(0)
            .map((_, index) =>
                (index < 10 ? '0' + index : index) + ':00')
    );
    const handleClose = () => setShow(false);
    const handleSession = async (e) => {
        e.preventDefault();
        if (!session.timeStart || !session.cinemaId) {
            console.log("Недостаточно данных");
            return;
        }
        const newSession = {
            ...session,
            movieId: movie.id,
            avatar: movie.avatar,
            timeStart: new Date(session.timeStart),
            timeEnd: new Date(session.timeStart + (movie.length * 60 * 1000)),
        };

        setSessions([...sessions, newSession]);
    }

    const updateSession = (e) => {
        const {name, value} = e.target;
        if (!name) return;
        setSession(prev => ({
            ...prev,
            [name]: name === 'timeStart'
                ? new Date().setHours(...value.split(':'))
                : +value
        }));
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Новый сеанс</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSession}
                      className="fs-5 mb-5">
                    <div className="mb-3 col-5">
                        <label className="form-label">
                            Выбрать зал
                            <Form.Select size="lg"
                                         name="cinemaId"
                                         onChange={updateSession}>
                                <option>Залы</option>
                                {
                                    cinemas.map((cinema) => (
                                        <option key={cinema.id}
                                                value={cinema.id}>
                                            {cinema.name}
                                        </option>
                                    ))
                                }
                            </Form.Select>
                        </label>
                    </div>
                    <div className="mb-3 col-5">
                        <label className="form-label">
                            Начало сеанса
                            <Form.Select size="lg"
                                         name="timeStart"
                                         onChange={updateSession}>
                                {
                                    freeTimes.map(time => (
                                        <option key={time}
                                                value={time}>
                                            {time}
                                        </option>
                                    ))
                                }
                            </Form.Select>
                        </label>
                    </div>
                    <button className="conf-step__button conf-step__button-accent"
                            type="reset"
                            onClick={handleClose}>
                        Отмена
                    </button>
                    <button className="conf-step__button conf-step__button-accent"
                            type="submit">
                        Сохранить
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default SessionForm;
