import { useState } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "./AddSeance.css"

export const AddSeance = (props) => {
    let [selectedTime, setselectedTime] = useState("00:00");
    const halls = [];
    props.halls.forEach((hall) => {
        halls.push({ value: hall.id, label: hall.hall_name })
    });
    let selectedHall = { value: props.data.hall_id, label: props.data.hall_name }

    const films = [];
    props.films.forEach((film) => {
        films.push({ value: film.id, label: film.film_name })
    });
    let selectedFilm = { value: props.data.film_id, label: props.data.film_name }


    const onSubmit = (e) => {
        e.preventDefault();
        const { target } = e;

        const params = new FormData(target);
        params.set('seanceHallid', selectedHall.value);
        params.set('seanceFilmid', selectedFilm.value);

        fetch(
            "https://shfe-diplom.neto-server.ru/seance",
            {
                method: 'POST',
                body: params
            }
        ).then(response => {
            return response.json();
        }).then(data => {
            if (data.success) {
               console.log(data);
               props.onRequestClose(data.result.seances, 'seances')
            }
            console.log(data);
        }).catch(error => console.log(error));
    }

    const onChangeHall = (hall) => {
        selectedHall = hall;
    }

    const onChangeFilm = (film) => {
        selectedFilm = film;
    }

    return (
        <div className="container col-lg-12 col-md-12 col-sm-12">
            <div className="title">
                <span>ДОБАВЛЕНИЕ СЕАНСА</span>
                <img onClick={() => props.onRequestClose()} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABT0lEQVR4nO2aQVIDIRBF2eqx1FMl7lI1m5zCmCuYg+RAPgvDIlZpgJkmI/R/69R8/m/ozAAhCCGEEEIIIYQQVQCPwCtwAt6B59AY4CVpRc0t8NBa85b5Mz/5BHahEfHZSeOa8yohcKn8X0wN9KYbeltrvSxpCnKPEDLmIycrrWLSOsyxN5r2Od6W6lQTG94v69F0JhRUnjSGp7AGlFVnVgiF5mnZdK1D2K/5zKZgOODuzFsOvFvzFga6N7/EyDDmZ3Twqea3oScor+o4lW8UQp/mjULo2/zCEMYwPzOEscwH7wHgeQnguQni+W8Qzy9CVLzbj/gdsKs1NEwIeP4cxvOGCJ63xPC8KYrnbXEup7R+D0aA4z86GjvYuKpAh6N8X05obr4whI21XpZ4KcH1BYmrEOJM+Ijr8B7NKJ1KH5LmZjXzQgghhBBCCCFCv3wBr4khWongxGUAAAAASUVORK5CYII=" alt="multiply" />
            </div>
            <form className="auth_form form modal-form" onSubmit={(e) => onSubmit(e)}>
                <div className="col-lg-10 offset-lg-1 col-md-12 col-sm-12">
                    <label htmlFor="floatingTract" className="form-label">
                        Название зала
                    </label>
                    <Dropdown options={halls} onChange={(hall) => onChangeHall(hall)} value={selectedHall} />
                </div>
                <div className="col-lg-10 offset-lg-1 col-md-12 col-sm-12">
                    <label htmlFor="floatingTract" className="form-label">
                        Название фильма
                    </label>
                    <Dropdown options={films} onChange={(film) => onChangeFilm(film)} value={selectedFilm} />
                </div>
                <div className="col-lg-10 offset-lg-1 col-md-12 col-sm-12">
                    <label htmlFor="floatingTract" className="form-label">
                        Время начала
                    </label>
                    <div className="seanceTime-container form-control">
                        <input
                            onChange={(e) => setselectedTime(e.target.value)}
                            value={selectedTime}
                            className="seanceTime"
                            type="time"
                            id="appointment"
                            name="seanceTime"
                            min="00:00"
                            max="23:59"
                            required 
                        />
                    </div>
                </div>
                
                <div className="buttons-container col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2">
                    <button className="btn confirm-btn" type="submit">
                        ДОБАВИТЬ СЕАНС
                    </button>
                    <button className="btn cancel-btn" type="submit"  onClick={() => props.onRequestClose()}>
                        ОТМЕНИТЬ
                    </button>
                </div>
            </form>
        </div>
    )
}