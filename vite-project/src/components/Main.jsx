import {
    Outlet
} from "react-router-dom";
// import S from "./Main.module.css"

export const Main = () => {
    return (
        // <main className={S.main}>
        <main>
            <Outlet/>
        </main>
    )
}