import { QRCode } from "react-qr-code";
import { useLocation } from 'react-router'

export const Ticket = () => {
    const { state } = useLocation();

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
        <div className="container">
            <header className="header">
                ИДЁМ В КИНО
            </header>
            <main>
                <div className="header">
                    ЭЛЕКТРОННЫЙ БИЛЕТ
                </div>
                <div>
                    На фильм: {state.film_name}
                </div>
                <div>
                    Места: {places}
                </div>
                <div>
                    В зале: {state.hall_name}
                </div>
                <div>
                    Начало сеанса: {state.seance_time}
                </div>
                <div className="qr_code">
                    <QRCode value={state.film_name + state.hall_name + state.seance_time + places}/>
                </div>
                <div>
                    Покажите QR-код нашему котролёру для подтверждения бронирования. 
                    Приятного просмотра!
                </div>
            </main>
        </div>
    )
}