import { useDrag, DragPreviewImage } from 'react-dnd';
import "./Seance.css";

export const Seance = (props) => {
     const [{ isDragging }, drag, preview] = useDrag(() => ({	
        type: 'SEANCE',
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                props.deleteSeance({
                    seance_id: props.data.id,
                    film_name: props.data.film_name
                })
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))
    
    return (
        <>
            <DragPreviewImage connect={preview} src={props.data.poster} />
            <div ref={drag} className="col-1 seance" style={{background: props.data.color, left: `${props.data.offset}%`}}>
                {props.data.film_name} 
            </div>
        </>
)
}