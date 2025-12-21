import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router'

export const Hall = () => {
    let [sessions, setSessions] = useState({});
    let [index, setIndex] = useState(0);

    const { state } = useLocation();
    let navigate = useNavigate();
    let [places, setPlaces] = useState([]);

    const onClickToPay = () => {
        navigate(
            "/payment",
            {
                state: {
                    film_name: state.film.film_name,
                    hall_name: state.hall.hall_name,
                    seance: state.seance,
                    places,
                    day: state.day
                }
            }
        )
    };

    // перепиши функцию, чтоб выбирала места (выбранные пользователем места)
    // [
    //     [1, [1,2], 200],
    //     [5, [1,2], 200],
    //     [1, [4,5], 200],
    // ]

    // [
    //     {row: 1, place: 1, coast: 200},
    //     {row: 1, place: 2, coast: 200},
    //     {row: 2, place: 5, coast: 200},
    //     {row: 2, place: 6, coast: 200},
    //     {row: 1, place: 7, coast: 200},
    // ]

    // [
    //     {row: 1, places: [1,2,4,5], price: 400},
    //     {row: 5, places: [1,2], price: 200}
    // ]

    // {
    //     1: {row: 1, places: [1,2,4,5], price: 400},
    //     5: {row: 5, places: [1,2], price: 200}
    // }

    // {
    //     1: [1,2,3],
    //     5: [4,5]
    // }
    const choosePlace = (row, place) => {
        let result = {row: row + 1}
        
        let ch_place = place;
        for (let i=0; i < place; i++) {
            if (state.hall.hall_config[row][i] == "disabled") {
                ch_place -= 1;
            }
        }

        result["place"] = ch_place + 1;

        let choosenPlaceType = state.hall.hall_config[row][place];
        let key = `hall_price_${choosenPlaceType}`;
        result["coast"] = state.hall[key];
        places.push(result);

        setPlaces(places);
    }

    return (
        state && <div className="container">
            <header className="header">
                ИДЁМ В КИНО
            </header>
            <main>
                <div className="main-header">
                    <span>
                        {state.film.film_name}
                    </span>
                    <span>
                        Начало сеанса: {state.seance.seance_time}
                    </span>
                    <span>
                        {state.hall.hall_name}
                    </span>
                    {/* вытащить из props название фильма, начало сеанса и зал */}
                </div>
                <div className="choice-of-location">
                    <div className="center">
                        <div className="screen">
                            экран
                        </div>
                        <div className="chairs">
                            {/* вставить сюда кофигурацию зала */}
                            {state.hall.hall_config.map((row, i) => (
                                <div key={i} className="row">
                                    {row.map((item, j) => (
                                        <div key={j} className={"chair" + ` chair-${item}`} onClick={() => choosePlace(i, j)}>    
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="legend">
                            <div className="chair chair-standart"></div>
                            <span>
                               Свободно 
                            </span>
                            {state.hall.hall_price_standart}
                            <div className="chair chair-vip"></div>
                            <span>
                                Свободно VIP
                            </span> 
                            {state.hall.hall_price_vip}
                            <div className="chair chair-disabled"></div>
                            <span>
                                Занято
                            </span>
                            {/* обрати внимание на имя класса! это занятые места, а не заблокированные */}
                            <div className="chair chair-selected"></div>
                            <span>Выбрано</span>
                        </div>
                    </div>
                </div>
                <div className="main-footer">
                    <button className="col-lg-2 col-md-3 col-sm-4 offset-lg-4 offset-md-4 offset-sm-4" onClick={() => onClickToPay()}>
                        ЗАБРОНИРОВАТЬ
                    </button>
                </div>
            </main>
        </div>
    )
}