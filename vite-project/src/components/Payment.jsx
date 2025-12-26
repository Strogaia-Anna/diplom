import { useLocation, useNavigate } from 'react-router'
import "./Payment.css"

export const Payment = () => {
    const body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'url("/guest.jpg")';

    let navigate = useNavigate();
    const { state } = useLocation();

    let places = "";
    let price = 0;
    const pl = {};
    for (let place of state.places) {
        if (!pl[place.row]) {
            pl[place.row] = []
        }
        pl[place.row].push(place.place)
        price +=  place.coast;
    }

    for(let [key, value] of Object.entries(pl)) {
        places += `${key} ряд - ${value.sort().join(",")}; `;
    }

    const onClick = () => {
        const params = new FormData();
        params.set('seanceId', state.seance.id);
        params.set('ticketDate', state.day);
        params.set('tickets', JSON.stringify(state.places));

        fetch(
            'https://shfe-diplom.neto-server.ru/ticket',
            {
                method: 'POST',
                body: params
            }
        ).then(response => {
            return response.json();
        }).then(data => {
            console.log(data.result);
            if (data.success) {
                navigate(
                    "/ticket",
                    {
                        state: {
                            film_name: state.film_name,
                            hall_name: state.hall_name,
                            seance_time: state.seance.seance_time,
                            places: data.result,
                            day: state.day
                        }
                    }
                )
            } else {
                alert(data.error);
            }
            
            
        }).catch(error => {
            console.log(error)
        });
    };

    return (
        <div className="payment container col-lg-12 col-md-12 col-sm-12">
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
                    ВЫ ВЫБРАЛИ БИЛЕТЫ:
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
                        Начало сеанса: <strong>{state.seance.seance_time}</strong>
                    </div>
                    <div>
                        Стоимость: <strong>{price}</strong> рублей
                    </div>
                    <div className="buttons">
                        <button className="btn confirm-btn" onClick={() => onClick()}>ПОЛУЧИТЬ КОД БРОНИРОВАНИЯ</button>
                    </div>
                    <div>
                        <span>После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему котролёру у входа в зал.</span>
                        <br/>
                        <span>Приятного просмотра!</span>
                    </div>
                </div>
                <div className="bottom-border"></div>
            </div>
        </div>
    )
}