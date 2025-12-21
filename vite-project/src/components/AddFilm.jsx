export const AddFilm = () => {

    // document.forms[0].addEventListener('submit', (event) => {
    // event.preventDefault();

    // const xhr = new XMLHttpRequest();

    // // xhr.addEventListener('readystatechange', () => {
    // //         if (xhr.readyState === xhr.DONE) {
    // //             let json = JSON.parse(xhr.responseText);
    // //             if (json.success) {
    // //                 localStorage.setItem('user', json.user_id);
    // //                 signin.classList.remove('signin_active');
    // //                 user_id.innerText = json.user_id;
    // //                 welcome.classList.add('welcome_active');
    // //             } else {
    // //                 alert('Неверный логин/пароль');
    // //             }
    // //         }
    // //     });




    // //  добавить отправку файла с сайта https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects
    //     xhr.open('POST', 'https://shfe-diplom.neto-server.ru/film');

    //     const formData = new FormData(document.forms[0]);

    //     xhr.send(formData);
    // });

    return (
        <div className="container">
            <div className="authorization">
                ДОБАВЛЕНИЕ ФИЛЬМА
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABT0lEQVR4nO2aQVIDIRBF2eqx1FMl7lI1m5zCmCuYg+RAPgvDIlZpgJkmI/R/69R8/m/ozAAhCCGEEEIIIYQQVQCPwCtwAt6B59AY4CVpRc0t8NBa85b5Mz/5BHahEfHZSeOa8yohcKn8X0wN9KYbeltrvSxpCnKPEDLmIycrrWLSOsyxN5r2Od6W6lQTG94v69F0JhRUnjSGp7AGlFVnVgiF5mnZdK1D2K/5zKZgOODuzFsOvFvzFga6N7/EyDDmZ3Twqea3oScor+o4lW8UQp/mjULo2/zCEMYwPzOEscwH7wHgeQnguQni+W8Qzy9CVLzbj/gdsKs1NEwIeP4cxvOGCJ63xPC8KYrnbXEup7R+D0aA4z86GjvYuKpAh6N8X05obr4whI21XpZ4KcH1BYmrEOJM+Ijr8B7NKJ1KH5LmZjXzQgghhBBCCCFCv3wBr4khWongxGUAAAAASUVORK5CYII=" alt="multiply" />
            </div>
            <form className="form">
                <label htmlFor="floatingTract" className="form-label">
                    Название фильма
                </label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingTract" 
                    placeholder="Например, «Гражданин Кейн»"
                    name="movie title"
                />
                <label htmlFor="floatingTract" className="form-label">
                    Продолжительность фильма (мин.)
                </label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingTract"
                    name="duration"
                />
                <label htmlFor="floatingTract" className="form-label">
                    Описание фильма
                </label>
                <textarea 
                    className="form-control" 
                    id="floatingTract"
                    name="description" 
                />
                <label htmlFor="floatingTract" className="form-label">
                    Страна
                </label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingTract"
                    name="country"
                />
                <div>
                    <button className="btn auth_btn " type="submit"  onClick={() => navigate("/login")}>
                        {/* Измени функию */}
                        ДОБАВИТЬ ФИЛЬМ
                    </button>
                    <input type="file" name="file" accept="image/png" required />
                        ЗАГРУЗИТЬ ПОСТЕР
                        {/* {if (file.size > 3 Mb) { alert('Слишком большой файл!'); }} */}
                    <button className="btn " type="submit"  onClick={() => navigate("/login")}>
                        {/* Измени функию и тип кнопки */}
                        ОТМЕНИТЬ
                    </button>
                </div>
            </form>
        </div>
    )
}