import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router'
import "./Hall.css"
import screen from '../assets/screen.png';


export const Hall = () => {
    const body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'url("/guest.jpg")';
    
    const { state } = useLocation();
    let [hall, setHall] = useState(structuredClone(state.hall));
    let navigate = useNavigate();
    let [places, setPlaces] = useState([]);

    useEffect(() => {
        fetch(`https://shfe-diplom.neto-server.ru/hallconfig?seanceId=${state.seance.id}&date=${state.day.toISOString().split('T')[0]}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.result);
                hall.hall_config = data.result
                setHall({...hall});
            })
            .catch(error => console.log(error));
    }, []);

    const onClickToPay = () => {
        if (places.length === 0) {
            return
        }
        navigate(
            "/payment",
            {
                state: {
                    film_name: state.film.film_name,
                    hall_name: hall.hall_name,
                    seance: state.seance,
                    places,
                    day: state.day.toISOString().split('T')[0]
                }
            }
        )
    };

    const choosePlace = (row, place) => {
        let choosenPlaceType = hall.hall_config[row][place];
        if (choosenPlaceType == 'disabled' || choosenPlaceType == 'taken') {
            return;
        }

        if (choosenPlaceType == 'selected') {
            const origPlaceType = state.hall.hall_config[row][place];
            hall.hall_config[row][place] = origPlaceType;
            const price = state.hall[`hall_price_${origPlaceType}`];
            const origRow = row + 1;
            const origPlace = place + 1;
            const ind = places.findIndex(item => item.row === origRow && item.place == origPlace && item.coast === price)
            places.splice(ind, 1);
        } else {
            let result = {row: row + 1}
            
            let ch_place = place;
            for (let i=0; i < place; i++) {
                if (hall.hall_config[row][i] == "disabled") {
                    ch_place -= 1;
                }
            }

            result["place"] = ch_place + 1;

            
            let key = `hall_price_${choosenPlaceType}`;
            result["coast"] = hall[key];
            places.push(result);

            hall.hall_config[row][place] = 'selected';
        }

        setHall({...hall});
        setPlaces(places);
    }

    return (
        state && <div className="booking container col-lg-12 col-md-12 col-sm-12">
            <header className="header"> 
                <div className="row header-top">
                    <div className="home" onClick={() => navigate('/sessions')}>
                        <span>ИДЁМ</span><span className="letterV">B</span><span>КИНО</span>
                    </div>
                </div>
            </header>
            <div className="main-back">
                <div className="main-header row">
                    <div className="col-lg-12 col-md-10 col-sm-8 col-xs-6">
                        <div className="film-name">
                            {state.film.film_name}
                        </div>
                        <div className="">
                            Начало сеанса: {state.seance.seance_time}
                        </div>
                        <div className="hall-name">
                            {hall.hall_name}
                        </div>
                    </div>
                    {/* <div className="col-lg-12 col-md-11 col-sm-8 film-name">
                        {state.film.film_name}
                    </div>
                    <div className="col-lg-12 col-md-11 col-sm-8">
                        Начало сеанса: {state.seance.seance_time}
                    </div>
                    <div className="col-lg-12 col-md-11 col-sm-8 hall-name">
                        {hall.hall_name}
                    </div> */}
                    <div className="tap d-none d-lg-none d-md-flex d-sm-flex d-xs-flex col-md-2 col-sm-4 col-xs-6">
                        <img src="tap.png" />
                        <div className="tap-text">
                            Тапните<br/>
                            дважды,<br/>
                            чтобы<br/>
                            увеличить<br/>
                        </div>
                    </div>
                </div>
                <div className="choice-of-location">
                    <div className="center">
                        <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-12">
                            <img className="screen-img" src={screen} />
                        </div>
                        <div className="hall-and-legend">
                            <div className="chairs">
                                {hall.hall_config && hall.hall_config.map((row, i) => (
                                    <div key={i} className="row">
                                        {row.map((item, j) => (
                                            <div key={j} className={"chair" + ` chair-${item}`} onClick={() => choosePlace(i, j)}></div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div className="legend col-lg-4 col-md-6 col-sm-12">
                                <div className="row">
                                    <div className="col-7 legend-item">
                                        <div className="chair chair-standart"></div>
                                        <span>Свободно ({hall.hall_price_standart}руб)</span>
                                    </div>
                                    <div className="col-5 legend-item">
                                        <div className="chair chair-taken"></div>
                                        <span>Занято</span>
                                    </div>
                                </div>
                                
                                
                                <div className="row">
                                    <div className="col-7 legend-item">
                                        <div className="chair chair-vip"></div>
                                        <span>Свободно VIP ({hall.hall_price_vip}руб)</span> 
                                    </div>
                                    <div className="col-5 legend-item">
                                        <div className="chair chair-selected"></div>
                                        <span>Выбрано</span>
                                    </div>
                                </div>
                                
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="main-footer">
                    <button className="btn confirm-btn" onClick={() => onClickToPay()}>
                        ЗАБРОНИРОВАТЬ
                    </button>
                </div>
            </div>
        </div>
    )
}