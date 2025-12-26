import { QRCode } from "react-qr-code";
import { useLocation, useNavigate } from 'react-router'
import "./Ticket.css"

export const Ticket = () => {
    const body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'url("/guest.jpg")';
    
    const { state } = useLocation();
    let navigate = useNavigate();

    let places = "";
    const pl = {};
    for (let place of state.places) {
        if (!pl[place.ticket_row]) {
            pl[place.ticket_row] = []
        }
        pl[place.ticket_row].push(place.ticket_place)
    }

    for(let [key, value] of Object.entries(pl)) {
        places += `${key} ряд - ${value.sort().join(",")}; `;
    }

    return (
        <div className="ticket container col-lg-12 col-md-12 col-sm-12">
            <header className="header"> 
                <div className="row header-top">
                    <div className="home" onClick={() => navigate('/sessions')}>
                        <span>ИДЁМ</span><span className="letterV">B</span><span>КИНО</span>
                    </div>
                </div>
            </header>
            <div>
                <div className="top-border"></div>
                <div className="main-header main-back">
                    ЭЛЕКТРОННЫЙ БИЛЕТ
                </div>
                <div className="bottom-border"></div>
                <div className="top-border"></div>
                <div className="main-back">
                    <div>
                        На фильм: <strong>{state.film_name}</strong>
                    </div>
                    <div>
                        Места: <strong>{places}</strong>
                    </div>
                    <div>
                        В зале: <strong>{state.hall_name}</strong>
                    </div>
                    <div>
                        Начало сеанса: <strong>{state.seance_time}</strong>
                    </div>
                    <div className="qr_code">
                        <div className="qr_code_border">
                            <QRCode value={`${state.day}, ${state.seance_time}, ${state.film_name}, ${state.hall_name}, ${places}, Билет действителен строго на свой сеанс`}/>
                        </div>
                    </div>
                    <div>
                        <span>Покажите QR-код нашему котролёру для подтверждения бронирования.</span>
                        <br/>
                        <span>Приятного просмотра!</span>
                    </div>
                </div>
                <div className="bottom-border"></div>
            </div>
        </div>
    )
}