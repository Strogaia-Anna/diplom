import { useNavigate } from "react-router";
import { getEnd } from '../utils'
import "./Session.css"

export const Session = (props) => {
    let navigate = useNavigate();

    const isDisabled = (seance) => {
        const day = new Date;
        let time = day.toLocaleTimeString();
        time = time.slice(0, time.length - 3)

        if (props.day.toISOString().split('T')[0] !== day.toISOString().split('T')[0]) {
            return '';
        }

        if(seance.seance_time < `${time}`) {
            return ' seance-disabled';
        }
        return '';
    }

    const onClick = (hall, seance) => {
        

        if(isDisabled(seance)) {
            return;
        }

        navigate(
            "/hall",
            {
                state: {
                    film: props.film,
                    hall,
                    seance,
                    day: props.day
                }
            }
        )
    };

    const getSeances = (hall_id) => {
        return props.all_data.seances.filter(seance => seance.seance_filmid === props.film.id && seance.seance_hallid === hall_id);  
    };
    
    return (
        <div className="session">
            <div className="row">
                <div className="col-1">
                    <img src={props.film.film_poster} className="img"></img>
                    
                </div>
                <div className="col-11 filx-text">
                    <div className="black-item"></div><span className="film-name">{props.film.film_name}</span>
                    <span className="text">{props.film.film_description}</span>
                    <span className="text">{props.film.film_duration} минут{getEnd(props.film.film_duration)} {props.film.film_origin}</span>
                </div>
            </div>
            <div>
                {props.all_data.halls.map((item) => (
                    <div key={item.id} className="row" hidden={!item.hall_open}>
                        <span className="hall-name">
                            {item.hall_name}
                        </span>
                        <div className="row seances-container">
                            {getSeances(item.id).map((seance) => (
                                <span className={`session-seance${isDisabled(seance)}`} key={seance.id} onClick={() => onClick(item, seance)}>
                                    {seance.seance_time}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    )
}