import { useDrop } from 'react-dnd';
import { Seance } from "./Seance"
import "./HallSeances.css"


export const HallSeances = (props) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'FILM',
        drop: () => ({ hall_name: props.hall.hall_name, id: props.hall.id}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }))


    const getSeanses = (hall_id) => {
        const sortFunc = (a, b) => {
            if (a.seance_time > b.seance_time) {
                return 1;
            }
            if (a.seance_time < b.seance_time) {
                return -1;
            }
            return 0;
        }

        const filterFunc = (item) => item.seance_hallid === hall_id;

        const result = [];
        props.seances.filter(filterFunc).sort(sortFunc).forEach((seance, ind, arr) => {
            if(seance.seance_hallid === hall_id) {
                const film = props.films.filter((f) => (f.id === seance.seance_filmid))[0];

                const calcOffsetMinutes = (time) => {
                    const parts = time.split(':');
                    const hours = parseInt(parts[0]);
                    const minutes = parseInt(parts[1]);
                    return hours * 60 + minutes - (ind ? 2 * 60 : 0);
                }
                
                // const start_pos = ind ? calcOffsetMinutes(arr[ind - 1].seance_time) + 2 * 60 : 0;
                result.push({
                    id: seance.id,
                    film_name: film.film_name,
                    seance_time: seance.seance_time,
                    color: film.color,
                    poster: film.film_poster,
                    offset: calcOffsetMinutes(seance.seance_time) * (100 / (24 * 60)),
                })
            }
        });

        return result;
    }

    return (
        <div key={props.hall.id}>
            <span>{props.hall.hall_name}</span>
            <div className="row hall-drop" role={'Dustbin'} ref={drop}>
                {getSeanses(props.hall.id).map((item, index) => (
                    <Seance key={index} data={item} deleteSeance={props.deleteSeance}/>
                ))}
            </div>
            <div className="time-line row">
                {getSeanses(props.hall.id).map((item, index) => (
                    // <Seance key={index} data={item} deleteSeance={props.deleteSeance}/>
                    <div key={index} className="seance-time col-1" style={{left: `${item.offset}%`}}>
                        <div className="time-mark"></div>
                        <span>{item.seance_time}</span>
                    </div>
                    
                ))}
            </div>
        </div>
    )
}