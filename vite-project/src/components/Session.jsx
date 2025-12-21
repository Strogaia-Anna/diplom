import { useNavigate } from "react-router";
import S from "./Session.module.css"

export const Session = (props) => {
    let navigate = useNavigate();

    const getEnd = (data) => {
        const ost = data % 10;
        if(ost >= 5 || ost == 0) {
            return "";
        } else if (ost == 1) {  
            return "а"
        } else {
            return "ы"
        }
    };

    const onClick = (hall, seance) => {
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
        <div>
            <div className="row">
                <div className="col-1">
                    <img src={props.film.film_poster} className={S.img}></img>
                </div>
                <div className="col-11">
                    <h4>{props.film.film_name}</h4>
                    <span className={S.text}>{props.film.film_description}</span>
                    <span className={S.text}>{props.film.film_duration} минут{getEnd(props.film.film_duration)} {props.film.film_origin}</span>
                </div>
            </div>
            <div>
                {props.all_data.halls.map((item) => (
                    <div  key={item.id} className="row">
                        <span>
                            {item.hall_name}
                        </span>
                        <div className="row">
                            {/* добавить проверку какой фильм в каком зале */}
                            {getSeances(item.id).map((seance) => (
                                <span key={seance.id} onClick={() => onClick(item, seance)}>
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