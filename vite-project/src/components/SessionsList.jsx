import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { Session } from "./Session"
import { Navigation } from "./Navigation"
import "./SessionsList.css"

export const SessionsList = () => {
    const body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'url("/guest.jpg")';

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
        <div className="container guest">
            <header className="header"> 
                <div className="row header-top">
                    <div className="home" onClick={() => navigate('/sessions')}>
                        <span>ИДЁМ</span><span className="letterV">B</span><span>КИНО</span>
                    </div>
                    <button className="home confirm-btn" onClick={() => navigate("/login")}>ВОЙТИ</button>
                </div>
            </header>
            <div className="navigation">
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

