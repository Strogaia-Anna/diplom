// import { useRef } from 'react'
// import { useDrag, useDrop, DragPreviewImage } from 'react-dnd'
import { useDrag, DragPreviewImage } from 'react-dnd'
import { getEnd } from '../utils'
import "./Film.css"

export const Film = (props) => {
    // const ref = useRef(null);

    const [{ isDragging }, drag, preview] = useDrag(() => ({	
        type: 'FILM',
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                props.onAddSeanceCb({
                    hall_name: dropResult.hall_name,
                    hall_id: dropResult.id,
                    film_name: props.item.film_name,
                    film_id: props.item.id,
                    color: props.item.color
                })
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    // const [, drop] = useDrop({
    //     accept: 'FILM',
    //     hover(item) {
    //         console.log(item)
    //     }
    // });

    // drag(ref);
    
    const deleteFilm = (filmId) => {
        fetch( `https://shfe-diplom.neto-server.ru/film/${filmId}`, {
            method: 'DELETE',
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.success) {
                props.onDeleteCb(data.result)
            }
        }).catch(error => console.log(error));
            
    }

    return (
        <>
            <DragPreviewImage connect={preview} src={props.item.film_poster} />
            <div ref={drag} role="Handle" className="film" style={{background: props.item.color}}>
                <img src={props.item.film_poster} className="poster" />
                <span>
                    <div><strong>{props.item.film_name}</strong></div>
                    <div>{props.item.film_duration} минут{getEnd(props.item.film_duration)}</div>
                </span>
                
                <div className="cross" onClick={() => deleteFilm(props.item.id)}> 
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABjUlEQVR4nO3Tvy8EURDA8RcVBQUNPQ0FDT2NK/zYeZdtbcLde5fdmeMKFcmhcX8CDQ1/Ag0N/wIFDT0NxRXX3ImjFsnNzIa8b7L1zidvxphQKMSWB9rzljo/f9gwf3d40kP4Xw+j85kAsAHQUQWEQqGvfIRzeR1uGaqzptccbI3lBUjjdLRnQL1e7/OALXUAYOvz3z0Duq9g8VkfQE8sw3cBQLc5vMANG8ADnWsDnMUzPoDFRg4rdMgGcEBZDiuU8gEsLWsDKlG2xAYorW7O5PAC02yALMpGtAEbcW3YcOYtNRUBTdbhvwGPWgAH+MAPALzW23+6Ygc4oFPFFTphB3hLB4ortM8PiLCsB6ASO8ABFbQAFZstsgNKxXRK7QZimmQHrK9sD2oBqEBDRiIH+C4OAHozUnmge/EDtngnB7B0KQ4AvJADAB7LvwAdiQGcxV2FI96RAxSrifwR45oYoAK4oLBC82IAb6sT0oA0TsfFAEmS9HtLbUFAuxbXBoxk3uKr4P6/iA4fCv3DPgAENFk47dUBVAAAAABJRU5ErkJggg==" alt="filled-trash" />
                </div>
            </div>
        </>
    )
}
