import { useState, useEffect } from "react";
import Modal from 'react-modal'
import { AddHall } from "./AddHall"
import { AddFilm } from "./AddFilm"
import { AddSeance } from "./AddSeance"
import { Film } from "./Film"
import { HallSeances } from "./HallSeances"
import { DeleteSeance } from "./DeleteSeance"
import { Header } from "./Header"
import { useDrop } from 'react-dnd';
import { useNavigate } from "react-router";
import { getColor } from "../utils";
import "./AdminPage.css"

export const AdminPage = () => {
    const body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'url("/admin.jpg")';
    let [sessions, setSessions] = useState({});
    let [index, setIndex] = useState(0);
    let [indexForHalls, setIndexForHalls] = useState(0);
    let [indexForSales, setIndexForSales] = useState(0);
    const [addFilmIsOpen, setAddFilmIsOpen] = useState(false);
    const [addHallIsOpen, setAddHallIsOpen] = useState(false);
    const [addSeanceIsOpen, setAddSeanceIsOpen] = useState(false);
    const [deleteSeanceIsOpen, setDeleteSeanceIsOpen] = useState(false);
    const [addSeanceData, setAddSeanceData] = useState({});
    const [deleteSeanceData, setDeleteSeanceData] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        fetch("https://shfe-diplom.neto-server.ru/alldata")
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.result);

                for (let i = 0; i < data.result.films.length; i++) {
                    data.result.films[i].color = getColor(i);
                }
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
            width: '100%',
            position: 'relative',
            transform: 'translate(-50%, -50%)',
            outline: null,
            border: null,
            background: null
        },
    };
    Modal.setAppElement('#root');

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'SEANCE',
        drop: () => ({ data: "data" }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }))

    function openModal(setIsOpenFunc) {
        setIsOpenFunc(true);
    }

    function closeModal(setIsOpenFunc, data=null, key=null) {
        if (data) {
            for (let i = 0; i < data.length; i++) {
                if (!data[i].color) {
                    data[i].color = getColor(i);
                }
            }
            sessions[key] = data;
            

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
        const value = parseInt(target.value);
        if (value <= 0) {
            return;
        }
        
        if (value > sessions.halls[indexForHalls].hall_places) {
            sessions.halls[indexForHalls].hall_config.push(Array.from({length: sessions.halls[indexForHalls].hall_places}, () => 'standart'));
        } else {
             sessions.halls[indexForHalls].hall_config.pop();
        }
        sessions.halls[indexForHalls].hall_rows = value;
        
        setSessions({...sessions});
    }

    const onChangePlaces = (e) => {
        e.preventDefault();
        const { target } = e;
        const value = parseInt(target.value);
        if (value <= 0) {
            return;
        }
        
            
        for (let row of sessions.halls[indexForHalls].hall_config) {
            if (value > sessions.halls[indexForHalls].hall_places) {
                row.push('disabled');
            } else {
                row.pop()
            }
        }

        sessions.halls[indexForHalls].hall_places = value;
        
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
            console.log(data);
            if (data.success) {
               sessions.halls[index] = data.result;
               setSessions({...sessions});
            } else {
                alert(data.error)
            }
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
        params.set('hallOpen', 1 - sessions.halls[indexForSales].hall_open);

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

    const onDeleteCb = (data) => {
        sessions.films = data.films;
        sessions.seances = data.seances;
        setSessions({...sessions});
    }

    const onAddSeanceCb = (data) => {
        setAddSeanceData(data)
        openModal(setAddSeanceIsOpen)
    }

    const onDeleteSeanceCb = (data) => {
        sessions.seances = data.seances;
        setSessions({...sessions});
        closeModal(setDeleteSeanceIsOpen)
    }

    const deleteSeance = (data) => {
        setDeleteSeanceData(data)
        openModal(setDeleteSeanceIsOpen)
    }

    return (
        Object.keys(sessions).length && <div className="container admin">
            <header className="header"> 
                <div className="row header-top">
                    <div className="home" onClick={() => navigate('/sessions')}>
                        <span>ИДЁМ</span><span className="letterV">B</span><span>КИНО</span>
                    </div>
                </div>
                <span className="row header-bottom">
                    АДМИНИСТРАТОРРРСКАЯ
                </span>
            </header>
            <main className="main-container">
                <Header text="УПРАВЛЕНИЕ ЗАЛАМИ" start={false} end={true}>
                    <span>
                        Доступные залы:
                    </span>
                    <div>
                        {sessions.halls.map((item) => (
                            <div key={item.id} >
                                <strong>- {item.hall_name}</strong>
                                <div className="cross" onClick={() => deleteHall(item.id)}>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABjUlEQVR4nO3Tvy8EURDA8RcVBQUNPQ0FDT2NK/zYeZdtbcLde5fdmeMKFcmhcX8CDQ1/Ag0N/wIFDT0NxRXX3ImjFsnNzIa8b7L1zidvxphQKMSWB9rzljo/f9gwf3d40kP4Xw+j85kAsAHQUQWEQqGvfIRzeR1uGaqzptccbI3lBUjjdLRnQL1e7/OALXUAYOvz3z0Duq9g8VkfQE8sw3cBQLc5vMANG8ADnWsDnMUzPoDFRg4rdMgGcEBZDiuU8gEsLWsDKlG2xAYorW7O5PAC02yALMpGtAEbcW3YcOYtNRUBTdbhvwGPWgAH+MAPALzW23+6Ygc4oFPFFTphB3hLB4ortM8PiLCsB6ASO8ABFbQAFZstsgNKxXRK7QZimmQHrK9sD2oBqEBDRiIH+C4OAHozUnmge/EDtngnB7B0KQ4AvJADAB7LvwAdiQGcxV2FI96RAxSrifwR45oYoAK4oLBC82IAb6sT0oA0TsfFAEmS9HtLbUFAuxbXBoxk3uKr4P6/iA4fCv3DPgAENFk47dUBVAAAAABJRU5ErkJggg==" alt="filled-trash" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => openModal(setAddHallIsOpen)} className="btn confirm-btn">
                        СОЗДАТЬ ЗАЛ
                    </button>
                    <Modal
                        isOpen={addHallIsOpen}
                        onRequestClose={() => closeModal(setAddHallIsOpen)}
                        style={customStyles}
                    >
                        <AddHall onRequestClose={(data, key) => closeModal(setAddHallIsOpen, data, key)} /> 
                    </Modal>
                </Header>
                <Header text="КОНФИГУРАЦИЯ ЗАЛОВ" start={true} end={true}>
                    <div>
                        <span>Выберите зал для конфигурации:</span>
                        <div className="halls">
                            {sessions.halls.map((item, ind) => (
                                <div className={"hall-back" + (sessions.halls[indexForHalls].id === item.id ? ' big' : '')} onClick={() => setIndexForHalls(ind)} key={item.id} >
                                    {item.hall_name} 
                                </div>
                            ))}
                        </div>
                    </div>
                    <span>
                        Укажите количество рядов и максимальное количество кресел в ряду:
                    </span>
                    {sessions.halls.length && <form className="form" onSubmit={(e) => onSubmitHall(e)}>
                        <div>
                            <div className="params">
                                <label htmlFor="rowCount">Рядов, шт</label>
                                <input type="number" id="rowCount" name="rowCount" className="form-control" value={sessions.halls[indexForHalls].hall_rows} onChange={(e) => onChangeRows(e)} />
                            </div>
                            <span className="sep">x</span>
                            <div className="params">
                                <label htmlFor="placeCount">Мест, шт</label>
                                <input type="number" id="placeCount" name="placeCount" className="form-control" value={sessions.halls[indexForHalls].hall_places} onChange={(e) => onChangePlaces(e)} />
                            </div>
                        </div>
                        <br/>
                        <div>
                            Теперь вы можете указать типы кресел на схеме зала:
                        </div>
                        <div className="legend">
                            <div className="types">
                                <div className="chair chair-standart"></div>
                                <span> — обычные кресла</span>
                                <div className="chair chair-vip"></div>
                                <span> — VIP кресла</span>
                                <div className="chair chair-disabled"></div>
                                <span> — заблокированные (нет кресел)</span>
                            </div>
                            
                            <span>
                            Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши
                            </span>
                        </div>
                        <div className="screen">
                            <span>
                                ЭКРАН
                            </span>
                            <div className="screen-container">
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
                            <button className="btn cancel-btn">
                                ОТМЕНА
                            </button>
                            <button className="btn confirm-btn"  type="submit">
                                СОХРАНИТЬ
                            </button>
                        </div>
                    </form>}
                </Header>
                {sessions.halls.length && <Header text="КОНФИГУРАЦИЯ ЦЕН" start={true} end={true}>
                    <span>Выберите зал для конфигурации:</span>
                    <div className="halls">
                        {sessions.halls.map((item, ind) => (
                            <div className={"hall-back" + (sessions.halls[index].id === item.id ? ' big' : '')} onClick={() => setIndex(ind)} key={item.id} >
                                {item.hall_name} 
                            </div>
                        ))}
                    </div>
                    <form className="form" onSubmit={(e) => onSubmitPrice(e)}>
                        <div>
                            <span>
                                Установите цены для типов кресел:
                            </span>
                            <div className="price-types">
                                <div className="price-type">
                                    <div className="price-type-price">
                                        <label htmlFor="priceStandart">Цена, рублей</label>
                                        <input id="priceStandart" type="number" name="priceStandart" className="form-control" value={sessions.halls[index].hall_price_standart} onChange={(e) => onChangePrice(e, 'standart')}/>
                                    </div>
                                    <span>за</span>
                                    <div className="chair chair-standart"></div>
                                    <span>обычные кресла</span>
                                </div> 
                                <div className="price-type">
                                    <div className="price-type-price">
                                        <label htmlFor="priceVip">Цена, рублей</label>
                                        <input id="priceVip" type="number" name="priceVip" className="form-control" value={sessions.halls[index].hall_price_vip} onChange={(e) => onChangePrice(e, 'vip')}/> 
                                    </div>
                                    
                                    <span>за</span>
                                    <div className="chair chair-vip"></div>
                                    <span>VIP кресла</span>
                                </div> 
                            </div>
                        </div>
                        <div className="buttons">
                            <button className="btn cancel-btn">ОТМЕНА</button>
                            <button className="btn confirm-btn" type="submit">СОХРАНИТЬ</button>
                        </div>
                    </form>
                </Header>}
                <Header text="СЕТКА СЕАНСОВ" start={true} end={true}>
                    <button onClick={() => openModal(setAddFilmIsOpen)} className="btn confirm-btn">
                        ДОБАВИТЬ ФИЛЬМ
                    </button>
                    <Modal
                        isOpen={addFilmIsOpen}
                        onRequestClose={() => closeModal(setAddFilmIsOpen)}
                        style={customStyles}
                    >
                        <AddFilm onRequestClose={(data, key) => closeModal(setAddFilmIsOpen, data, key)} /> 
                    </Modal>
                    <div className="available-movies">
                        {sessions.films.map((item) => (
                            <Film key={item.id} item={item} onDeleteCb={(data) => onDeleteCb(data)}  onAddSeanceCb={(data) => onAddSeanceCb(data)}/>
                        ))}
                    </div>
                    <Modal
                        isOpen={addSeanceIsOpen}
                        onRequestClose={() => closeModal(setAddSeanceIsOpen)}
                        style={customStyles}
                    >
                        <AddSeance onRequestClose={(data, key) => closeModal(setAddSeanceIsOpen, data, key)} data={addSeanceData} films={sessions.films} halls={sessions.halls} /> 
                    </Modal>

                    <div className="sessions">
                        <div className="trash" ref={drop}>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACQ0lEQVR4nNXWW4iNURgG4AcZplFyMblQjiVJIue4IKYco5wlocyNXGlyuBnJ6YILCpEp3CgXDhdGcphSaKRwgchIJkqOSTM51NZf38VuN4e99/9T3lrt1r/XWu+7vu9d61v8hxiFzViHnv+SuD/uIJfXjmMvLuAenuAxruEYBmcpYGUBeVftE85hRBbE/bAFLd2QPsQ+zIg5dWjGd7TiEhaiV7HEfVCPz50QfovQb8IgTMTk2PVTNGAcKjAwItiENcWQT8WzDkiTb4cwOxbOx3rcwmuslQJL0B6EbWgM1w/vZt6wPJHb0whowFHMR2WkIgnrNMzBUqzC8hgzC2NRjVpsw8ZyyYdgK07hLt7jB17iPq7jYjj8PK7iNh7hQ0TueRhuP5aVKqA+L98/cQM7YqEpca4HhJOrYtejwxO1EbnWAt+UhF0lnPViW0nYmTF5EsWSUIm5kYoreFsiYXtcSCfDiCOVgeo4RvPjgqmKC2VxFKAt4fS6yPvyOAmDYwMTgnyFMjGwYFcf8SCcfQIHcSBaYrozcQG9wK+8eUkxKgsVGeV/jxRoy0BAkqKy8S5voZs4jK/R/xL9W12MyYU/ysbTWKQlTJkYckN8S4rOgvj+qpMxuTQmFNdwLsrnzLzfXEG/qZMxSauRAo0ZCJiURsDpDAQMTSNgd0oBv9E7jYBNKQW8kRI1KQUkb4RUqE4p4IgM0JxCwLwsBIyJZ1epAsouQh2hL8bjchECzsb4v4Ie8RZM3vvJG2F11P9FmB7//5/4A7IZSMOzM5tpAAAAAElFTkSuQmCC" alt="external-Trash-basic-ui-solidglyph-m-oki-orlando-2" />
                        </div>
                        <div className="session-grid">
                            {sessions.halls.map((hall) => (
                                <HallSeances key={hall.id} hall={hall} films={sessions.films} seances={sessions.seances} deleteSeance={(data)=> deleteSeance(data)}/>
                            ))}
                        </div>
                    </div>
                    <Modal className="col-lg-12"
                        isOpen={deleteSeanceIsOpen}
                        onRequestClose={() => closeModal(setDeleteSeanceIsOpen)}
                        style={customStyles}
                    >
                        <DeleteSeance data={deleteSeanceData} onDeleteSeanceCb={(data) => onDeleteSeanceCb(data)} onRequestClose={(data, key) => closeModal(setDeleteSeanceIsOpen, data, key)} /> 
                    </Modal>
                </Header>
                <Header text="ОТКРЫТЬ ПРОДАЖИ" start={true} end={false}>
                    <span>Выберите зал для открытия/закрытия продаж:</span>
                    <div className="halls">
                        {sessions.halls.map((item, ind) => (
                            <div className={"hall-back" + (sessions.halls[indexForSales].id === item.id ? ' big' : '')} onClick={() => setIndexForSales(ind)} key={item.id} >
                                {item.hall_name} 
                            </div>
                        ))}
                    </div>
                    <form className="form" onSubmit={(e) => onSubmiOpen(e)}>
                        <div className="open">Всё готово к {sessions.halls[indexForSales].hall_open ? 'закрытию' : 'открытию'}</div>
                        <div className="buttons">
                            <button className="btn confirm-btn" type="submit">
                                {sessions.halls[indexForSales].hall_open ? 'ЗАКРЫТЬ' : 'ОТКРЫТЬ'} ПРОДАЖУ БИЛЕТОВ
                            </button>
                        </div>
                    </form>
                </Header>
            </main>
        </div>
    )
}