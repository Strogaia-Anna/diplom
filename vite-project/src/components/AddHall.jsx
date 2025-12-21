export const AddHall = (props) => {
    const onSubmit = (e) => {
        e.preventDefault();
        const { target } = e;

        const formData = new FormData(target);
        const entries = formData.entries();

        const data = Object.fromEntries(entries);

        fetch(
            'https://shfe-diplom.neto-server.ru/hall',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({hallName: data.hallName})
            }
        ).then(response => {
            return response.json();
        }).then(data => {
            if (data.success) {
               props.onRequestClose(data.result.halls)
            }
            console.log(data);
        }).catch(error => console.log(error));
    }

    return (
        <div className="container">
            <div className="authorization">
                ДОБАВЛЕНИЕ ЗАЛА
                <img onClick={() => props.onRequestClose()} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABT0lEQVR4nO2aQVIDIRBF2eqx1FMl7lI1m5zCmCuYg+RAPgvDIlZpgJkmI/R/69R8/m/ozAAhCCGEEEIIIYQQVQCPwCtwAt6B59AY4CVpRc0t8NBa85b5Mz/5BHahEfHZSeOa8yohcKn8X0wN9KYbeltrvSxpCnKPEDLmIycrrWLSOsyxN5r2Od6W6lQTG94v69F0JhRUnjSGp7AGlFVnVgiF5mnZdK1D2K/5zKZgOODuzFsOvFvzFga6N7/EyDDmZ3Twqea3oScor+o4lW8UQp/mjULo2/zCEMYwPzOEscwH7wHgeQnguQni+W8Qzy9CVLzbj/gdsKs1NEwIeP4cxvOGCJ63xPC8KYrnbXEup7R+D0aA4z86GjvYuKpAh6N8X05obr4whI21XpZ4KcH1BYmrEOJM+Ijr8B7NKJ1KH5LmZjXzQgghhBBCCCFCv3wBr4khWongxGUAAAAASUVORK5CYII=" alt="multiply" />
            </div>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <label htmlFor="floatingTract" className="form-label">
                    Название зала
                </label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingTract" 
                    placeholder="Например, «Зал 1»"
                    name="hallName"
                />
                <div>
                    <button className="btn auth_btn " type="submit">
                        ДОБАВИТЬ ЗАЛ
                    </button>
                    <button className="btn" onClick={() => props.onRequestClose()}>
                        ОТМЕНИТЬ
                    </button>
                </div>
            </form>
        </div>
    )
}