// прокинь в props  данные с сервера

export const AddSeans = (props) => {
    return (
        <div className="container">
            <div className="authorization">
                ДОБАВЛЕНИЕ СЕАНСА
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABT0lEQVR4nO2aQVIDIRBF2eqx1FMl7lI1m5zCmCuYg+RAPgvDIlZpgJkmI/R/69R8/m/ozAAhCCGEEEIIIYQQVQCPwCtwAt6B59AY4CVpRc0t8NBa85b5Mz/5BHahEfHZSeOa8yohcKn8X0wN9KYbeltrvSxpCnKPEDLmIycrrWLSOsyxN5r2Od6W6lQTG94v69F0JhRUnjSGp7AGlFVnVgiF5mnZdK1D2K/5zKZgOODuzFsOvFvzFga6N7/EyDDmZ3Twqea3oScor+o4lW8UQp/mjULo2/zCEMYwPzOEscwH7wHgeQnguQni+W8Qzy9CVLzbj/gdsKs1NEwIeP4cxvOGCJ63xPC8KYrnbXEup7R+D0aA4z86GjvYuKpAh6N8X05obr4whI21XpZ4KcH1BYmrEOJM+Ijr8B7NKJ1KH5LmZjXzQgghhBBCCCFCv3wBr4khWongxGUAAAAASUVORK5CYII=" alt="multiply" />
            </div>
            <form className="form">
                <label htmlFor="floatingTract" className="form-label">
                    Название зала
                </label>
                <select name="halls" id="halls">
                    {/* нужна функция, которая создаст нужное количество option, исходя из данных с сервера сколько у нас всего залов*/}
                    {/* <option value="apple">Apple</option>
                    <option value="banana">Banana</option>
                    <option value="cherry">Cherry</option>
                    <option value="date">Date</option> */}
                </select>
                <label htmlFor="floatingTract" className="form-label">
                    Название фильма
                </label>
                <select name="halls" id="halls">
                    {/* нужна функция, которая создаст нужное количество option, исходя из данных с сервера сколько у нас всего фильмов*/}
                    {/* <option value="apple">Apple</option>
                    <option value="banana">Banana</option>
                    <option value="cherry">Cherry</option>
                    <option value="date">Date</option> */}
                </select>
                <label htmlFor="floatingTract" className="form-label">
                    Время начала
                </label>
                <input
                type="time"
                id="appointment"
                name="appointment"
                // min="09:00"
                // max="18:00"
                required />
                
                <div>
                    <button className="btn auth_btn " type="submit"  onClick={() => navigate("/login")}>
                        {/* Измени функию */}
                        ДОБАВИТЬ СЕАНС
                    </button>
                    <button className="btn " type="submit"  onClick={() => navigate("/login")}>
                        {/* Измени функию */}
                        ОТМЕНИТЬ
                    </button>
                </div>
            </form>
        </div>
    )
}