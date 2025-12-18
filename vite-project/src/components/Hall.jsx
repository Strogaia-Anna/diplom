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
                    seance_time: state.seance.seance_time,
                    places
                }
            }
        )
    };

    // перепиши функцию, чтоб выбирала места (выбранные пользователем места)
    const choosePlace = (row, place) => {
        const placeObj = [row + 1];
        let result = place;
        for (let i=0; i < place; i++) {
            if (state.hall.hall_config[row][i] == "disabled") {
                result = result - 1;
            }
        }
        placeObj.push(result + 1);
        let choosenPlace = state.hall.hall_config[row][place];
        let key = `hall_price_${choosenPlace}`;
        placeObj.push(state.hall[key])
        places.push(placeObj);
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