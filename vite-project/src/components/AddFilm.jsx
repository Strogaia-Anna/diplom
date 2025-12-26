import "./AddFilm.css"

export const AddFilm = (props) => {

    const onSubmit = (e) => {
        e.preventDefault();
        const { target } = e;

        const params = new FormData(target);
        const filePoster = Object.fromEntries(params.entries()).filePoster;
        if (filePoster.size > 3145728) {
            alert("Размер постера не более 3 Mb");
            return
        }

        fetch(
            "https://shfe-diplom.neto-server.ru/film",
            {
                method: 'POST',
                body: params
            }
        ).then(response => {
            return response.json();
        }).then(data => {
            if (data.success) {
               console.log(data);
               props.onRequestClose(data.result.films, 'films')
            }
            console.log(data);
        }).catch(error => console.log(error));
    }

    return (
        <div className="container col-lg-12 col-md-12 col-sm-12">
            <div className="title">
                <span>ДОБАВЛЕНИЕ ФИЛЬМА</span>
                <img onClick={() => props.onRequestClose()} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABT0lEQVR4nO2aQVIDIRBF2eqx1FMl7lI1m5zCmCuYg+RAPgvDIlZpgJkmI/R/69R8/m/ozAAhCCGEEEIIIYQQVQCPwCtwAt6B59AY4CVpRc0t8NBa85b5Mz/5BHahEfHZSeOa8yohcKn8X0wN9KYbeltrvSxpCnKPEDLmIycrrWLSOsyxN5r2Od6W6lQTG94v69F0JhRUnjSGp7AGlFVnVgiF5mnZdK1D2K/5zKZgOODuzFsOvFvzFga6N7/EyDDmZ3Twqea3oScor+o4lW8UQp/mjULo2/zCEMYwPzOEscwH7wHgeQnguQni+W8Qzy9CVLzbj/gdsKs1NEwIeP4cxvOGCJ63xPC8KYrnbXEup7R+D0aA4z86GjvYuKpAh6N8X05obr4whI21XpZ4KcH1BYmrEOJM+Ijr8B7NKJ1KH5LmZjXzQgghhBBCCCFCv3wBr4khWongxGUAAAAASUVORK5CYII=" alt="multiply" />
            </div>
            <form className="auth_form form modal-form" onSubmit={(e) => onSubmit(e)}>
                <div className="col-lg-10 offset-lg-1 col-md-12 col-sm-12">
                    <label htmlFor="floatingTract" className="form-label">
                        Название фильма
                    </label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="floatingTract" 
                        placeholder="Например, «Гражданин Кейн»"
                        name="filmName"
                        required
                    />
                </div>
                <div className="col-lg-10 offset-lg-1 col-md-12 col-sm-12">
                    <label htmlFor="floatingTract" className="form-label">
                        Продолжительность фильма (мин.)
                    </label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="floatingTract"
                        name="filmDuration"
                        required
                    />
                </div>
                <div className="col-lg-10 offset-lg-1 col-md-12 col-sm-12">
                    <label htmlFor="floatingTract" className="form-label">
                        Описание фильма
                    </label>
                    <textarea 
                        className="form-control" 
                        id="floatingTract"
                        name="filmDescription"
                        required
                    />
                </div>
                <div className="col-lg-10 offset-lg-1 col-md-12 col-sm-12">
                    <label htmlFor="floatingTract" className="form-label">
                        Страна
                    </label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="floatingTract"
                        name="filmOrigin"
                        required
                    />
                </div>
                <div className="buttons-container col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-8 offset-sm-2">
                    <button className="btn confirm-btn" type="submit">
                        ДОБАВИТЬ ФИЛЬМ
                    </button>
                    <label className="file-input-btn btn confirm-btn">
                        <input type="file" name="filePoster" accept="image/png" className="file-input" required />
                        <span>ЗАГРУЗИТЬ ПОСТЕР</span>
                    </label>
                    <button className="btn cancel-btn"  onClick={() => props.onRequestClose()}>
                        ОТМЕНИТЬ
                    </button>
                </div>
            </form>
        </div>
    )
}