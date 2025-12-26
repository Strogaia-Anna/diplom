import {
    Outlet
} from "react-router-dom";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
// import S from "./Main.module.css"

export const Main = () => {
    return (
        // <main className={S.main}>
        <DndProvider backend={HTML5Backend} context={window}>
            <main>
                <Outlet/>
            </main>
        </DndProvider>
    )
}