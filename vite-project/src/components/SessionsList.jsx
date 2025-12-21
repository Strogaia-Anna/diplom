import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { Session } from "./Session"
import { Navigation } from "./Navigation"
import {Login} from "./Login"
// import S from "./Posts.module.css"

export const SessionsList = () => {
    let [sessions, setSessions] = useState([]);
    let navigate = useNavigate();
    let [day, setDay] = useState(new Date());

    useEffect(() => {
        fetch('https://shfe-diplom.neto-server.ru/alldata')
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.result);
                setSessions(data.result);
            })
            .catch(error => console.log(error));
    }, []);

    const currentDate = (date) => {
        setDay(date);
        console.log(date)
    }

        
    return (
        <div>
            <header className="header">
                 <div className="header-container">
                    <div className="header-row">
                        Идёмвкино
                        <button className="button" type="button" onClick={() => navigate("/login")}>ВОЙТИ</button>
                    </div>
                 </div>
            </header>
            <div>
                <Navigation currentDate={currentDate} />
            </div>
            <div>
                {sessions.films && sessions.films.map((item) => (
                    <div key={item.id} onClick={() => console.log(item)}>
                        <Session film={item} all_data={sessions} day={day}/>
                    </div>
                ))}
            </div>
        </div>
        
    )
}

