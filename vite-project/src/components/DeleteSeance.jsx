import "./DeleteSeance.css"

export const DeleteSeance = (props) => {
    const onSubmit = (e) => {
        e.preventDefault();
        fetch( `https://shfe-diplom.neto-server.ru/seance/${props.data.seance_id}`, {
            method: 'DELETE',
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.success) {
                props.onDeleteSeanceCb(data.result)
            }
        }).catch(error => console.log(error));
    }

    return (
         <div className="delete-seance container container col-lg-12 col-md-12 col-sm-12">
            <div className="title">
                <span>УДАЛЕНИЕ СЕАНСА</span>
                <img onClick={() => props.onRequestClose()} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABT0lEQVR4nO2aQVIDIRBF2eqx1FMl7lI1m5zCmCuYg+RAPgvDIlZpgJkmI/R/69R8/m/ozAAhCCGEEEIIIYQQVQCPwCtwAt6B59AY4CVpRc0t8NBa85b5Mz/5BHahEfHZSeOa8yohcKn8X0wN9KYbeltrvSxpCnKPEDLmIycrrWLSOsyxN5r2Od6W6lQTG94v69F0JhRUnjSGp7AGlFVnVgiF5mnZdK1D2K/5zKZgOODuzFsOvFvzFga6N7/EyDDmZ3Twqea3oScor+o4lW8UQp/mjULo2/zCEMYwPzOEscwH7wHgeQnguQni+W8Qzy9CVLzbj/gdsKs1NEwIeP4cxvOGCJ63xPC8KYrnbXEup7R+D0aA4z86GjvYuKpAh6N8X05obr4whI21XpZ4KcH1BYmrEOJM+Ijr8B7NKJ1KH5LmZjXzQgghhBBCCCFCv3wBr4khWongxGUAAAAASUVORK5CYII=" alt="multiply" />
            </div>
            <form className="auth_form form modal-form" onSubmit={(e) => onSubmit(e)}>
                <div className="col-lg-10 offset-lg-1 col-md-12 col-sm-12">
                    <span>Вы действительно хотите снять с сеанса фильм <strong>"{props.data.film_name}"</strong> ?</span>
                </div>
                <div className="buttons-container col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2">
                    <button className="btn confirm-btn" type="submit">
                        УДАЛИТЬ
                    </button>
                    <button className="btn cancel-btn" onClick={() => props.onRequestClose()}>
                        ОТМЕНИТЬ
                    </button>
                </div>
            </form>
        </div>
    )
}