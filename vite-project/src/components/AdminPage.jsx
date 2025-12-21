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

    function closeModal(setIsOpenFunc, data=null) {
        if (data) {
            sessions.halls = data;
            setSessions({...sessions})
        }
        setIsOpenFunc(false);
    }

    const onClick = (row_index, place_index) => {
        const item = getChairType(row_index, place_index);
        let newValue;
        if (item == "disabled") {
            newValue = "standart"
        } else if (item == "standart") {
            newValue = "vip"
        } else {
            newValue = "disabled"
        }
        sessions.halls[indexForHalls].hall_config[row_index][place_index] = newValue;
        setSessions({...sessions});
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

    const deleteHall = (hallId) => {
        fetch( `https://shfe-diplom.neto-server.ru/hall/${hallId}`, {
            method: 'DELETE',
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.success) {
                sessions.halls = data.result.halls;
                sessions.seances = data.result.seances;
                setSessions({...sessions});
            }
        }).catch(error => console.log(error));
            
    }
    const onSubmitHall = (e) => {
        e.preventDefault();
        const { target } = e;

        const params = new FormData(target);
        params.set('config', JSON.stringify(sessions.halls[indexForHalls].hall_config));

        fetch(
            `https://shfe-diplom.neto-server.ru/hall/${sessions.halls[indexForHalls].id}`,
            {
                method: 'POST',
                body: params
            }
        ).then(response => {
            return response.json();
        }).then(data => {
            if (data.success) {
                sessions.halls[indexForHalls] = data.result;
                setSessions({...sessions});
            }
            console.log(data);
        }).catch(error => console.log(error));
    }

    const getChairType = (row_index, place_index) => {
        if (row_index >= sessions.halls[indexForHalls].hall_config.length) {
            return 'disabled';
        }

        if (place_index >= sessions.halls[indexForHalls].hall_config[row_index].length) {
            return 'disabled';
        }

        return sessions.halls[indexForHalls].hall_config[row_index][place_index];
    }
    const onChangeRows = (e) => {
        e.preventDefault();
        const { target } = e;
        const hall_rows = parseInt(target.value);
        sessions.halls[indexForHalls].hall_rows = hall_rows;
        sessions.halls[indexForHalls].hall_config.push(Array.from({length: hall_rows}, () => 'disabled'));
        setSessions({...sessions});
    }

    const onChangePlaces = (e) => {
        e.preventDefault();
        const { target } = e;
        sessions.halls[indexForHalls].hall_places = parseInt(target.value);
        for (let row of sessions.halls[indexForHalls].hall_config) {
            row.push('disabled');
        }
        setSessions({...sessions});
    }

    const onSubmitPrice = (e) => {
        e.preventDefault();
        const { target } = e;

        const params = new FormData(target);

        fetch(
            `https://shfe-diplom.neto-server.ru/price/${sessions.halls[index].id}`,
            {
                method: 'POST',
                body: params
            }
        ).then(response => {
            return response.json();
        }).then(data => {
            if (data.success) {
               console.log(data);
            }
            console.log(data);
        }).catch(error => console.log(error));
    }

    const onChangePrice = (e, itemType) => {
        e.preventDefault();
        const { target } = e;
        sessions.halls[index][`hall_price_${itemType}`] = parseInt(target.value);
        setSessions({...sessions});
    }

    const onSubmiOpen = (e) => {
        e.preventDefault();

        const params = new FormData();
        params.set('hallOpen', '1');

        fetch(
            `https://shfe-diplom.neto-server.ru/open/${sessions.halls[indexForSales].id}`,
            {
                method: 'POST',
                body: params
            }
        ).then(response => {
            return response.json();
        }).then(data => {
            if (data.success) {
               sessions.halls = data.result.halls;
                setSessions({...sessions})
            }
            console.log(data);
        }).catch(error => console.log(error));
    }

    return (
        Object.keys(sessions).length && <div className="container">
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
                                        <div className="cross" onClick={() => deleteHall(item.id)}>
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
                           <AddHall onRequestClose={(data) => closeModal(setAddHallIsOpen, data)} /> 
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
                                {sessions.halls.map((item, ind) => (
                                    <div onClick={() => setIndexForHalls(ind)} key={item.id} >
                                        {item.hall_name} 
                                        {/* доработать кнопку  */}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {sessions.halls.length && <form className="form" onSubmit={(e) => onSubmitHall(e)}>
                            <div>
                                <span>
                                    Укажите количество рядов и максимальное количество кресел в ряду:
                                </span>
                                <label htmlFor="floatingTract" className="form-label">
                                    Рядов, шт
                                    <input 
                                        type="number" name="rowCount" defaultValue={sessions.halls[indexForHalls].hall_rows} onChange={(e) => onChangeRows(e)}
                                    />
                                </label>
                                x 
                                <label>
                                    Мест, шт
                                    <input 
                                        type="number" name="placeCount" defaultValue={sessions.halls[indexForHalls].hall_places} onChange={(e) => onChangePlaces(e)}
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
                                    {Array.from({length: sessions.halls[indexForHalls].hall_rows}, (row_item, row_index) => {
                                        return <div key={row_index} className="row">
                                            {Array.from({length: sessions.halls[indexForHalls].hall_places}, (place_item, place_index) => {
                                                return <div key={place_index} className={"chair" + ` chair-${getChairType(row_index, place_index)}`} onClick={() => onClick(row_index, place_index)}>    </div>
                                            })}
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className="buttons">
                                <button className="col-lg-2 col-md-3 col-sm-4 offset-lg-4 offset-md-4 offset-sm-4">
                                    ОТМЕНА
                                </button>
                                <button className="col-lg-2 col-md-3 col-sm-4 offset-lg-4 offset-md-4 offset-sm-4"  type="submit">
                                    СОХРАНИТЬ
                                </button>
                            </div>
                        </form>}    
                    </div>
                </section>
                {sessions.halls.length && <section>
                    <div className="section-header">
                        КОНФИГУРАЦИЯ ЦЕН 
                    </div>
                    <div className="section-body">
                        <form className="form" onSubmit={(e) => onSubmitPrice(e)}>
                            <span>Выберите зал для конфигурации:</span>
                            <div>
                                {sessions.halls.map((item, ind) => (
                                    <div onClick={() => setIndex(ind)} key={item.id} >
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
                                    <span>Цена, рублей</span>
                                    <input type="number" name="priceStandart" defaultValue={sessions.halls[index].hall_price_standart} onChange={(e) => onChangePrice(e, 'standart')}/>
                                    <span>за</span>
                                    <div className="chair chair-standart"></div>
                                    <span>обычные кресла</span>  
                                </label>
                                <label>
                                    <span>Цена, рублей</span>
                                    <input type="number" name="priceVip" defaultValue={sessions.halls[index].hall_price_vip} onChange={(e) => onChangePrice(e, 'vip')}/>
                                    <span>за</span>
                                    <div className="chair chair-vip"></div>
                                    <span>VIP кресла</span>
                                </label>
                            </div>
                            <div className="buttons">
                                <button className="col-lg-2 col-md-3 col-sm-4 offset-lg-4 offset-md-4 offset-sm-4">ОТМЕНА</button>
                                <button className="col-lg-2 col-md-3 col-sm-4 offset-lg-4 offset-md-4 offset-sm-4" type="submit">СОХРАНИТЬ</button>
                            </div>
                        </form>
                    </div>
                </section>}
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
                                <div key={hall.id}>
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
                    <form className="form" onSubmit={(e) => onSubmiOpen(e)}>
                        <div className="section-body">
                            <span>Выберите зал для открытия/закрытия продаж:</span>
                            <div>
                                {sessions.halls.map((item, ind) => (
                                    <div onClick={() => setIndexForSales(ind)} key={item.id} className="halls">
                                        {item.hall_name} 
                                        {/* доработать кнопку  */}
                                    </div>
                                ))}
                            </div>
                            <div className="buttons">
                                <span>Всё готово к открытию</span>
                                <button className="col-lg-2 col-md-3 col-sm-4 offset-lg-4 offset-md-4 offset-sm-4" type="submit">
                                    ОТКРЫТЬ ПРОДАЖУ БИЛЕТОВ
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    )
}