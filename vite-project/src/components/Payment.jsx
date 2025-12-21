import { useLocation, useNavigate } from 'react-router'

export const Payment = () => {
    "6 ряд - 7,8; 7 ряд - 5, 6"
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
        params.set('ticketDate', state.day.toISOString().split('T')[0]);
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
            if (data.success) {
                navigate(
                    "/ticket",
                    {
                        state: {
                            film_name: state.film_name,
                            hall_name: state.hall_name,
                            seance_time: state.seance.seance_time,
                            places: data.result
                        }
                    }
                )
            }
            console.log(data.result);
            
        }).catch(error => {
            console.log(error)
        });
    };

    return (
        <div className="container">
            <header className="header">
                ИДЁМ В КИНО
            </header>
            <main>
                <div className="header">
                    ВЫ ВЫБРАЛИ БИЛЕТЫ:
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
                    Начало сеанса: <strong>{state.seance.seance_time}</strong>
                </div>
                <div>
                    Стоимость: {price}
                </div>
                <button className="col-lg-2 col-md-3 col-sm-4 offset-lg-4 offset-md-4 offset-sm-4" onClick={() => onClick()}>
                    Получить код бронирования
                </button>
                <div>
                    После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему котролёру у входа в зал. Приятного просмотра!
                </div>
            </main>
        </div>
    )
}