import React from 'react';
import './styles-client.scss';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import Hall from "@/components/Hall.jsx";
import Payment from "@/components/Payment.jsx";
import Ticket from "@/components/Ticket.jsx";
import Cabinet from "@/components/Cabinet.jsx";

function Client() {
    return (
        <>
            <header className="page-header">
                <h1 className="page-header__title">Идём<span>в</span>кино</h1>
            </header>
            <BrowserRouter>
                <Routes>
                    <Route path="/client/" element={<Cabinet/>}/>
                    <Route path="/hall/:id" element={<Hall/>}/>
                    <Route path="/payment/:id" element={<Payment/>}/>
                    <Route path="/ticket/:id" element={<Ticket/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Client;

if (document.getElementById('client')) {
    const Index = ReactDOM.createRoot(document.getElementById("client"));

    Index.render(
        <React.StrictMode>
            <Client/>
        </React.StrictMode>
    )
}
