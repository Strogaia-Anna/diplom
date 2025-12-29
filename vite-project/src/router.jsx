import {
    createBrowserRouter
} from "react-router-dom";

import { Main } from "./components/Main";
import { SessionsList } from "./components/SessionsList";
import {Login} from "./components/Login";
import {AdminPage} from "./components/AdminPage";
import {Hall} from "./components/Hall";
import {Payment} from "./components/Payment";
import {Ticket} from "./components/Ticket";


export const router = createBrowserRouter([
    {
        path: "/",
        exact: true,
        element: <Main/>,
        children: [
            {
                index: true,
                exact: true,
                element: <SessionsList/>,
            },
            {
                path: "/login",
                exact: true,
                element: <Login/>,
            },
            {
                path: "/admin",
                exact: true,
                element: <AdminPage/>,
            },
            {
                path: "/hall",
                exact: true,
                element: <Hall/>,
            },
            {
                path: "/payment",
                exact: true,
                element: <Payment/>,
            },
            {
                path: "/ticket",
                exact: true,
                element: <Ticket/>,
            },
        ]
    },
]);