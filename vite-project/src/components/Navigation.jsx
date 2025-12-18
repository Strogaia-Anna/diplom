import React, { useState } from 'react'

export const Navigation = (props) => {
    const [carInd, setCarInd] = useState(0);
    let [day, setDay] = useState(new Date());
    
    function getWeekDay(date) {
        let days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        return days[date.getDay()];
    }

    function getDayDetails(count) {
        const newDay = new Date(new Date().setDate(day.getDate() + count));
        return `${getWeekDay(newDay)}, ${newDay.getDate()}`
    }
    return (
        <div>
            {!!carInd && <div onClick={() => {
                setDay(new Date(new Date().setDate(day.getDate() - 1)));
                setCarInd(carInd - 1)}}>{"<"}</div>}
            {!carInd && <div>Сегодня {getDayDetails(0)}</div>}
            <div>{getDayDetails(1)}</div>
            <div>{getDayDetails(2)}</div>
            <div>{getDayDetails(3)}</div>
            <div>{getDayDetails(4)}</div>
            <div>{getDayDetails(5)}</div>
            <div onClick={() => {
                setDay(new Date(new Date().setDate(day.getDate() + 1)));
                setCarInd(carInd + 1)
            }}>{">"}</div>
        </div>
    )
}

//tomorrow.setDate(tomorrow.getDate() + 1);