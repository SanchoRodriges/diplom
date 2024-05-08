import React, {useState} from "react";
import {Modal} from "react-bootstrap";

const AddMovieForm = ({isShow, handleClose, setAddMovieVisible, setMovies}) => {
    const defaultMovie = {
        name: '',
        length: 0,
        description: '',
        avatar: '',
    }
    const [newMovie, setNewMovie] = useState({...defaultMovie});

    const addMovie = async (e) => {
        e.preventDefault();
        let form = new FormData();
        for (const key in newMovie) {
            form.append(key, newMovie[key]);
        }
        const response = await fetch(`/api/movies/store`, {
            method: 'POST',
            body: form
        });
        if (!response.ok) {
            console.error(response);
            return
        }
        const data = await response.json();
        setMovies(prev => [...prev, data]);
        resetMovie();
    }

    const updateNewMovie = (event) => {
        const {name, value} = event.target;
        setNewMovie(prevState => {
            if (name === 'avatar') {
                return {
                    ...prevState,
                    [name]: event.target.files[0]
                }
            }
            return {
                ...prevState,
                [name]: name === 'length' ? +value : value
            }
        });
    }

    const resetMovie = () => {
        setAddMovieVisible(false);
        setNewMovie({...defaultMovie})
    }

    return (
        <Modal show={isShow} onHide={resetMovie}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить фильм</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={addMovie}
                      className="fs-5 mb-5">
                    <div className="mb-3 col-5">
                        <label className="form-label">
                            Введите название фильма
                            <input className="form-control"
                                   type="text"
                                   placeholder="Название фильма"
                                   aria-describedby="emailHelp"
                                   name="name"
                                   value={newMovie.name}
                                   onChange={updateNewMovie}/>
                        </label>
                    </div>
                    <div className="mb-3 col-5">
                        <label className="form-label">
                            Введите описание фильма
                            <textarea className="form-control"
                                      name="description"
                                      placeholder="Описание фильма"
                                      onChange={updateNewMovie}
                                      value={newMovie.description}/>
                        </label>
                    </div>
                    <div className="mb-3 col-5">
                        <label className="form-label">
                            Укажите длительность фильма
                            <input className="form-control"
                                   type="number"
                                   placeholder="Длительность фильма"
                                   name="length"
                                   value={newMovie.length}
                                   onChange={updateNewMovie}/>
                        </label>
                    </div>
                    <div className="mb-3 col-5">
                        <label className="form-label">
                            Добавьте картинку
                            <input className="form-control"
                                   type="file"
                                   placeholder="Длительность фильма"
                                   name="avatar"
                                   onChange={updateNewMovie}/>
                        </label>
                    </div>
                    {newMovie.avatar &&
                        <div className="mb-3 col-5">
                            <img src={URL.createObjectURL(newMovie.avatar)} height={150}/>
                        </div>
                    }
                    <button className="conf-step__button conf-step__button-accent"
                            type="reset"
                            onClick={resetMovie}>
                        Отмена
                    </button>
                    <button className="conf-step__button conf-step__button-accent"
                            type="submit">
                        Сохранить
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default AddMovieForm;
