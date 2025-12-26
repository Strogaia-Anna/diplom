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
        const result = [];
        props.seances.forEach(seance => {
        // [{id: 1, seance_hallid: 5438, seance_filmid: 1686, seance_time: '00-00'}].forEach(seance => {
            if(seance.seance_hallid === hall_id) {
                const film = props.films.filter((f) => (f.id === seance.seance_filmid))[0];
                result.push({id: seance.id, film_name: film.film_name, seance_time: seance.seance_time, color: film.color, poster: film.film_poster})
            }
        });

        const res = result.sort((a, b) => {
            if (a.seance_time > b.seance_time) {
                return 1;
            }
            if (a.seance_time < b.seance_time) {
                return -1;
            }
            // a должно быть равным b
            return 0;
        });

        return result.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            // a должно быть равным b
            return 0;
        });
    }

    return (
        <div key={props.hall.id}>
            <span>{props.hall.hall_name}</span>
            <div className="row hall-drop" role={'Dustbin'} ref={drop}>
                {getSeanses(props.hall.id).map((item, index) => (
                    // <Seance key={index} data={item} onDeleteSeanceCb={() => {}} />
                    <Seance key={index} data={item} deleteSeance={props.deleteSeance}/>
                ))}
            </div>
        </div>
    )
}