import { useState, useEffect } from "react";
import Modal from 'react-modal'
import { AddHall } from "./AddHall"
import { AddFilm } from "./AddFilm"
import { AddSeans } from "./AddSeans"
import "./AdminPage.css"

export const AdminPage = () => {
    let [sessions, setSessions] = useState({});
    let [index, setIndex] = useState(0);
    let [indexForHalls, setIndexForHalls] = useState(0);
    let [indexForSales, setIndexForSales] = useState(0);
    const [addFilmIsOpen, setAddFilmIsOpen] = useState(false);
    const [addHallIsOpen, setAddHallIsOpen] = useState(false);
    const [addSeanceIsOpen, setAddSeanceIsOpen] = useState(false);

     useEffect(() => {
        fetch("https://shfe-diplom.neto-server.ru/alldata")
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.result);
                setSessions(data.result);
            })
            .catch(error => console.log(error));
    }, []);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    Modal.setAppElement('#root');

    function openModal(setIsOpenFunc) {
        setIsOpenFunc(true);
    }

    function closeModal(setIsOpenFunc) {
        setIsOpenFunc(false);
    }

    const onClick = (item, i, j) => {
        let newValue;
        if (item == "disabled") {
            newValue = "standart"
        } else if (item == "standart") {
            newValue = "vip"
        } else {
            newValue = "disabled"
        }
        sessions.halls[index].hall_config[i][j] = newValue;
        setSessions(sessions);
    }

    const getSeanses = (hall_id) => {
        const result = [];
        sessions.seances.forEach(seance => {
            if(seance.seance_hallid === hall_id) {
                const film = sessions.films.filter((f) => (f.id === seance.seance_filmid))[0];
                result.push({'id': seance.id,'film_name': film.film_name, 'seance_time': seance.seance_time})
            }
        });
        return result;
    }

    return (
        sessions.halls && <div className="container">
            <header className="header"> 
                Идёмвкино
                Администраторррская
            </header>
            <main className="main-container">
                <section>
                    <div className="section-header">
                        УПРАВЛЕНИЕ ЗАЛАМИ 
                    </div>
                    <div className="section-body">
                        <span>
                            Доступные залы:
                        </span>
                            <div>
                                {sessions.halls.map((item) => (
                                    <div key={item.id} >
                                        - {item.hall_name}
                                        <div className="cross">
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABjUlEQVR4nO3Tvy8EURDA8RcVBQUNPQ0FDT2NK/zYeZdtbcLde5fdmeMKFcmhcX8CDQ1/Ag0N/wIFDT0NxRXX3ImjFsnNzIa8b7L1zidvxphQKMSWB9rzljo/f9gwf3d40kP4Xw+j85kAsAHQUQWEQqGvfIRzeR1uGaqzptccbI3lBUjjdLRnQL1e7/OALXUAYOvz3z0Duq9g8VkfQE8sw3cBQLc5vMANG8ADnWsDnMUzPoDFRg4rdMgGcEBZDiuU8gEsLWsDKlG2xAYorW7O5PAC02yALMpGtAEbcW3YcOYtNRUBTdbhvwGPWgAH+MAPALzW23+6Ygc4oFPFFTphB3hLB4ortM8PiLCsB6ASO8ABFbQAFZstsgNKxXRK7QZimmQHrK9sD2oBqEBDRiIH+C4OAHozUnmge/EDtngnB7B0KQ4AvJADAB7LvwAdiQGcxV2FI96RAxSrifwR45oYoAK4oLBC82IAb6sT0oA0TsfFAEmS9HtLbUFAuxbXBoxk3uKr4P6/iA4fCv3DPgAENFk47dUBVAAAAABJRU5ErkJggg==" alt="filled-trash" />
                                        </div>
                                        {/* доработать кнопку удаления */}
                                    </div>
                                ))}
                            </div>
                        <button onClick={() => openModal(setAddHallIsOpen)} className="col-lg-2 col-md-3 col-sm-4 offset-lg-4 offset-md-4 offset-sm-4">
                            Создать зал
                        </button>
                        <Modal
                            isOpen={addHallIsOpen}
                            onRequestClose={() => closeModal(setAddHallIsOpen)}
                            style={customStyles}
                        >
                           <AddHall /> 
                        </Modal>
                    </div>
                </section>
                <section>
                    <div className="section-header">
                        КОНФИГУРАЦИЯ ЗАЛОВ 
                    </div>
                    <div className="section-body">
                        <div>
                            Выберите зал для конфигурации:
                            <div>
                                {sessions.halls.map((item) => (
                                    <div onClick={() => setIndexForHalls(indexForHalls)} key={item.id} >
                                        {item.hall_name} 
                                        {/* доработать кнопку  */}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span>
                                Укажите количество рядов и максимальное количество кресел в ряду:
                            </span>
                            <label htmlFor="floatingTract" className="form-label">
                                Рядов, шт
                                <input 
                                    type="text" value={sessions.halls[index].hall_rows} onChange={() => console.log('change')}
                                />
                            </label>
                             x 
                            <label>
                                Мест, шт
                                <input 
                                    type="text" value={sessions.halls[index].hall_places} onChange={() => console.log('change')}
                                />
                            </label>
                             
                        </div>
                        <div>
                            Теперь вы можете указать типы кресел на схеме зала:
                        </div>
                        <div className="legend">
                            <div className="chair chair-standart"></div>
                            <span>
                                - обычные кресла
                            </span>
                            <div className="chair chair-vip"></div>
                            <span>
                                - VIP кресла
                            </span>
                            <div className="chair chair-disabled"></div>
                            <span>
                                - заблокированные (нет кресел)
                            </span>
                            <span>
                            Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши
                            </span>
                        </div>
                        <div className="screen">
                            <span>
                                ЭКРАН
                            </span>
                            <div className="sreen container">
                                {sessions.halls[index].hall_config.map((row, i) => (
                                    <div key={i} className="row">
                                        {row.map((item, j) => (
                                            <div key={j} className={"chair" + ` chair-${item}`} onClick={() => onClick(item, i, j)}>    
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="buttons">
                            <button className="col-lg-2 col-md-3 col-sm-4 offset-lg-4 offset-md-4 offset-sm-4">
                                ОТМЕНА
                            </button>
                            <button className="col-lg-2 col-md-3 col-sm-4 offset-lg-4 offset-md-4 offset-sm-4">
                                СОХРАНИТЬ
                            </button>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="section-header">
                        КОНФИГУРАЦИЯ ЦЕН 
                    </div>
                    <div className="section-body">
                        <span>
                           Выберите зал для конфигурации: 
                        </span>
                            <div>
                                {sessions.halls.map((item, index) => (
                                    <div onClick={() => setIndex(index)} key={item.id} >
                                        {item.hall_name} 
                                        {/* доработать кнопку  */}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <span>
                                    Установите цены для типов кресел:
                                </span>
                                    <label>
                                        Цена, рублей
                                        <input 
                                            type="number" defaultValue={sessions.halls[index].hall_price_standart}
                                        />
                                        за <div className="chair chair-standart"></div>
                                        <span>
                                            обычные кресла
                                        </span>
                                                 
                                    </label>
                                    <label>
                                        Цена, рублей
                                        <input 
                                            type="number" defaultValue={sessions.halls[index].hall_price_vip}
                                        />
                                        за <div className="chair chair-vip"></div>
                                                 VIP кресла
                                    </label>
                            </div>
                            <div className="buttons">
                                <button className="col-lg-2 col-md-3 col-sm-4 offset-lg-4 offset-md-4 offset-sm-4">
                                    ОТМЕНА
                                </button>
                                <button className="col-lg-2 col-md-3 col-sm-4 offset-lg-4 offset-md-4 offset-sm-4">
                                    СОХРАНИТЬ
                                </button>
                            </div>
                    </div>
                </section>
                <section>
                    <div className="section-header">
                        СЕТКА СЕАНСОВ
                    </div>
                    <div className="section-body">
                        <button onClick={() => openModal(setAddFilmIsOpen)} className="col-lg-2 col-md-3 col-sm-4 offset-lg-4 offset-md-4 offset-sm-4">
                            ДОБАВИТЬ ФИЛЬМ
                        </button>
                        <Modal
                            isOpen={addFilmIsOpen}
                            onRequestClose={() => closeModal(setAddFilmIsOpen)}
                            style={customStyles}
                        >
                           <AddFilm /> 
                        </Modal>
                        <div className="available-movies">
                            {sessions.films.map((item) => (
                                <div key={item.id} >
                                    <img src={item.film_poster} className="poster"></img>
                                    {item.film_name}
                                    {item.film_duration}
                                    <div className="cross"> 
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABjUlEQVR4nO3Tvy8EURDA8RcVBQUNPQ0FDT2NK/zYeZdtbcLde5fdmeMKFcmhcX8CDQ1/Ag0N/wIFDT0NxRXX3ImjFsnNzIa8b7L1zidvxphQKMSWB9rzljo/f9gwf3d40kP4Xw+j85kAsAHQUQWEQqGvfIRzeR1uGaqzptccbI3lBUjjdLRnQL1e7/OALXUAYOvz3z0Duq9g8VkfQE8sw3cBQLc5vMANG8ADnWsDnMUzPoDFRg4rdMgGcEBZDiuU8gEsLWsDKlG2xAYorW7O5PAC02yALMpGtAEbcW3YcOYtNRUBTdbhvwGPWgAH+MAPALzW23+6Ygc4oFPFFTphB3hLB4ortM8PiLCsB6ASO8ABFbQAFZstsgNKxXRK7QZimmQHrK9sD2oBqEBDRiIH+C4OAHozUnmge/EDtngnB7B0KQ4AvJADAB7LvwAdiQGcxV2FI96RAxSrifwR45oYoAK4oLBC82IAb6sT0oA0TsfFAEmS9HtLbUFAuxbXBoxk3uKr4P6/iA4fCv3DPgAENFk47dUBVAAAAABJRU5ErkJggg==" alt="filled-trash" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => openModal(setAddSeanceIsOpen)} className="col-lg-2 col-md-3 col-sm-4 offset-lg-4 offset-md-4 offset-sm-4">
                            ДОБАВИТЬ СЕАНС
                        </button>
                        <Modal
                            isOpen={addSeanceIsOpen}
                            onRequestClose={() => closeModal(setAddSeanceIsOpen)}
                            style={customStyles}
                        >
                           <AddSeans /> 
                        </Modal>
                        <div className="session-grid">
                            {sessions.halls.map((hall) => (
                                <div>
                                    <span>{hall.hall_name}</span>
                                    <div key={hall.id} className="row">
                                        {getSeanses(hall.id).map((item) => (
                                            /// напиши функцию
                                            <div key={item.id} className="col-lg-1">
                                                {item.film_name} 
                                                {/* доработать кнопку  */}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="buttons">
                            <button className="col-lg-2 col-md-3 col-sm-4 offset-lg-4 offset-md-4 offset-sm-4">
                                ОТМЕНА
                            </button>
                            <button className="col-lg-2 col-md-3 col-sm-4 offset-lg-4 offset-md-4 offset-sm-4">
                                СОХРАНИТЬ
                            </button>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="section-header">
                        ОТКРЫТЬ ПРОДАЖИ 
                        <button className="toggle-btn">
                            ˅
                        </button>
                    </div>
                    <div className="section-body">
                        Выберите зал для открытия/закрытия продаж:
                            <div>
                                {sessions.halls.map((item) => (
                                    <div onClick={() => setIndexForSales(indexForSales)} key={item.id} className="halls">
                                        {item.hall_name} 
                                        {/* доработать кнопку  */}
                                    </div>
                                ))}
                            </div>
                            <div className="buttons">
                                Всё готово к открытию
                                <button className="col-lg-2 col-md-3 col-sm-4 offset-lg-4 offset-md-4 offset-sm-4">
                                    ОТКРЫТЬ ПРОДАЖУ БИЛЕТОВ
                                </button>
                            </div>
                    </div>
                </section>
            </main>
        </div>
    )
}