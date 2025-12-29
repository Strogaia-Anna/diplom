import { useState } from 'react'
import "./Navigation.css"

export const Navigation = (props) => {
    let [carInd, setCarInd] = useState(0);
    let [origDay, setOrigDay] = useState(new Date());
    let [day, setDay] = useState(new Date());
    
    function getWeekDay(date) {
        let days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        return days[date.getDay()];
    }

    function getDayDetails(count, split=true) {
        if (carInd) {
            count -= 1;
        }
        const newDay = new Date(new Date().setDate(origDay.getDate() + count + carInd));
        return <span>{getWeekDay(newDay)}, {split ? <br/> : ' '}{newDay.getDate()}</span>
    }

    const isWeekend = (count) => {
        if (carInd) {
            count -= 1;
        }
        const newDay = new Date(new Date().setDate(origDay.getDate() + count + carInd));
        const weekDay = getWeekDay(newDay);
        if (weekDay === 'Сб' || weekDay === 'Вс') {
            return ' red-day';
        }

        return '';
    }

    const isSelected = (count) => {
        if (carInd) {
            count -= 1;
        }
        const newDay = new Date(new Date().setDate(origDay.getDate() + count + carInd));
        if (newDay.getDate() === day.getDate()) {
            return '-selected';
        }
        return '';
    }

    const clickDay = (count) => {
        const newDay = new Date(new Date().setDate(origDay.getDate() + count + carInd));
        setDay(newDay);
        props.currentDate(newDay);
    }

    return (
        <div className="row car">
            {carInd >= 1 && <div className="car-item" onClick={() => {
                carInd -= 1;
                setCarInd(carInd);

                const newDay = new Date(new Date().setDate(origDay.getDate() + carInd));
                const newDayValue = new Date(new Date().setDate(origDay.getDate() + carInd + 4));
                if (day.getDate() - newDay.getDate() > 4) {
                    if (newDayValue.getMonth() === day.getMonth() && newDayValue.getFullYear() === day.getFullYear()) {
                        setDay(newDayValue);
                        props.currentDate(newDayValue);
                    }
                } else if (newDayValue.getDate() === 4) {
                    if (newDayValue.getFullYear() <= day.getFullYear()) {
                        if (day.getMonth() === 0 || day.getMonth() > newDayValue.getMonth()) {
                            setDay(newDayValue);
                            props.currentDate(newDayValue);
                        }
                    }
                }
            }}>
                <span className="chevron chevron-left"></span>
            </div>}
            {carInd < 1 && <div onClick={() => clickDay(0)} className={`car-item${isSelected(0)}`}>Сегодня<br/>{getDayDetails(0, false)}</div>}
            <div onClick={() => clickDay(1)} className={`car-item${isSelected(1)}${isWeekend(1)}`}>{getDayDetails(1)}</div>
            <div onClick={() => clickDay(2)} className={`car-item${isSelected(2)}${isWeekend(2)}`}>{getDayDetails(2)}</div>
            <div onClick={() => clickDay(3)} className={`car-item${isSelected(3)}${isWeekend(3)}`}>{getDayDetails(3)}</div>
            <div onClick={() => clickDay(4)} className={`car-item${isSelected(4)}${isWeekend(4)}`}>{getDayDetails(4)}</div>
            <div onClick={() => clickDay(5)} className={`car-item${isSelected(5)}${isWeekend(5)}`}>{getDayDetails(5)}</div>
            <div className="car-item" onClick={() => {
                carInd += 1;
                setCarInd(carInd);

                const newDay = new Date(new Date().setDate(origDay.getDate() + carInd));
                if (newDay.getDate() - day.getDate() > 0) {
                    if (newDay.getMonth() === day.getMonth() && newDay.getFullYear() === day.getFullYear()) {
                        setDay(newDay);
                        props.currentDate(newDay);
                    }
                } else if (newDay.getDate() === 1) {
                    if (newDay.getFullYear() >= day.getFullYear()) {
                        if (newDay.getMonth() === 0 || newDay.getMonth() > day.getMonth()) {
                            setDay(newDay);
                            props.currentDate(newDay);
                        }
                    }
                }
            }}>
                <div className="chevron chevron-right"></div>
            </div>
        </div>
    )
}
