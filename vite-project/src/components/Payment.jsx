import { useLocation, useNavigate } from 'react-router'

export const Payment = () => {
    let navigate = useNavigate();
    const { state } = useLocation();
    const onClick = (film, hall, seance) => {
        navigate(
            "/ticket",
            {
                state: {
                    film,
                    hall,
                    seance
                }
            }
        )
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
                    Ряд:
                </div>
                <div>
                    Места:
                </div>
                <div>
                    В зале: {state.hall_name}
                </div>
                <div>
                    Начало сеанса: <strong>{state.seance_time}</strong>
                </div>
                <div>
                    Стоимость: {}
                </div>
                <button className="col-lg-2 col-md-3 col-sm-4 offset-lg-4 offset-md-4 offset-sm-4" onClick={() => onClick(state.film.film_name, state.hall.hall_name, state.seance.seance_time)}>
                    Получить код бронирования
                </button>
                <div>
                    После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему котролёру у входа в зал. Приятного просмотра!
                </div>
            </main>
        </div>
    )
}