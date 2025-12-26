import { useState } from 'react'
import "./Navigation.css"

export const Navigation = (props) => {
    const [carInd, setCarInd] = useState(0);
    let [day, setDay] = useState(new Date());
    
    function getWeekDay(date) {
        let days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        return days[date.getDay()];
    }

    function getDayDetails(count, split=true) {
        const newDay = new Date(new Date().setDate(day.getDate() + count));
        return <span>{getWeekDay(newDay)}, {split ? <br/> : ' '}{newDay.getDate()}</span>
    }
    const selected = (ind) => {
        if (ind === carInd) {
            return '-selected';
        }
        return '';
    }

    return (
        <div className="row car">
            {!!carInd && <div className={'car-item' + selected(0)} onClick={() => {
                const new_day = new Date(new Date().setDate(day.getDate() - 1));
                setDay(new_day);
                setCarInd(carInd - 1);
                props.currentDate(new_day);
            }}>{"<"}</div>}
            {!carInd && <div className={'car-item' + selected(0)}>Сегодня<br/>{getDayDetails(0, false)}</div>}
            <div className={'car-item' + selected(1)}>{getDayDetails(1)}</div>
            <div className={'car-item' + selected(2)}>{getDayDetails(2)}</div>
            <div className={'car-item' + selected(3)}>{getDayDetails(3)}</div>
            <div className={'car-item' + selected(4)}>{getDayDetails(4)}</div>
            <div className={'car-item' + selected(5)}>{getDayDetails(5)}</div>
            <div className="car-item" onClick={() => {
                const new_day = new Date(new Date().setDate(day.getDate() + 1));
                setDay(new_day);
                setCarInd(carInd + 1);
                props.currentDate(new_day);
            }}>{">"}</div>
        </div>
    )
}

//tomorrow.setDate(tomorrow.getDate() + 1);