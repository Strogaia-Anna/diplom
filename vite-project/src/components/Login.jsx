import { useState, useEffect } from 'react';
import "./Login.css"
import { useNavigate } from "react-router";

export const Login = () => {
    let navigate = useNavigate();
    
    const onSubmit = (e) => {
        e.preventDefault();
        const { target } = e;

        const formData = new FormData(target);
        const entries = formData.entries();

        const data = Object.fromEntries(entries);

        fetch(
            'https://shfe-diplom.neto-server.ru/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({login: data.login, password: data.password})
            }
        ).then(response => {
            return response.json();
        }).then(data => {
            if (data.success) {
                navigate("/admin")
            }
            console.log(data.result);
            setSessions(data.result);
        }).catch(error => console.log(error));
    }
    
    return (
        <div className="container-lg">
            <div className="d-flex flex-column min-vh-100 ">
                <header className="header"> 
                    <div className="header-container">
                        <div className="row">
                            <div className="col">
                                Идёмвкино
                                Администраторррская
                            </div>
                        </div>
                    </div>
                </header>

                <main className="col-lg-6 col-md-8 col-sm-12 section offset-lg-3">
                            <div className="authorization">
                                Авторизация
                            </div>
                            <form className="form" onSubmit={(e) => onSubmit(e)}>
                                <div className="col-lg-6 col-md-8 col-sm-8 email offset-lg-3">
                                    <label htmlFor="floatingTract" className="form-label">
                                        E-mail
                                    </label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="floatingTract" 
                                        placeholder="example@email.svg"
                                        name="login"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-8 col-sm-8 password offset-lg-3">
                                    <label htmlFor="floatingPassword" className="form-label">
                                        Пароль
                                    </label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="floatingPassword"
                                        name="password"
                                    />
                                </div>
                                <button className="btn auth_btn col-lg-4 col-md-8 col-sm-8 offset-lg-4" type="submit">
                                    Авторизоваться
                                </button>
                            </form>
                </main>

            {/* <form className="col-lg-6 col-md-8 col-sm-12"> 
                <div className="form">
                    <label htmlFor="floatingInput">Адрес эл. почты</label>
                    <input type="email" className="form-control" id="floatingInput" placeholder="example@domain.xyz" />
                </div>
                <div className="form">
                    <label htmlFor="floatingPassword">Пароль</label>
                    <input type="password" className="form-control" id="floatingPassword" />
                </div>

                <div className="checkbox mb-3">
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Авторизоваться</button>
            </form> */}
            </div>
        </div>
        

        
    )
}