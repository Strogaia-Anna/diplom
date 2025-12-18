export const Ticket = () => {
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
                    На фильм:
                </div>
                <div>
                    Места:
                </div>
                <div>
                    В зале:
                </div>
                <div>
                    Начало сеанса:
                </div>
                {/* всттавить QR-код */}
                <div>
                    Покажите QR-код нашему котролёру для подтверждения бронирования. 
                    Приятного просмотра!
                </div>
            </main>
        </div>
    )
}