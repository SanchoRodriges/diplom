import ReactDOM from 'react-dom/client';
import './styles-admin.scss';
import React, {useEffect, useState} from "react";
import CinemasList from "@/components/CinemasList.jsx";
import ConfigCinema from "@/components/ConfigCinema.jsx";
import PriceConfiguration from "@/components/PriceConfiguration.jsx";
import SessionsList from "@/components/SessionsList.jsx";
import SaleTickets from "@/components/SaleTickets.jsx";

const Admin = () => {
    const [cinemas, setCinemas] = useState([]);
    useEffect( () => {
        fetch('/api/cinemas')
            .then(response => response.json())
            .then(data => setCinemas(data))
    }, []);
    return (
        <>
            <header className="page-header">
                <h1 className="page-header__title">Идём<span>в</span>кино</h1>
                <span className="page-header__subtitle">Администраторррская</span>
            </header>

            <main className="conf-steps">
                <CinemasList cinemas={cinemas} setCinemas={setCinemas}/>
                <ConfigCinema cinemas={cinemas} setCinemas={setCinemas}/>
                <PriceConfiguration cinemas={cinemas} setCinemas={setCinemas}/>
                <SessionsList cinemas={cinemas} setCinemas={setCinemas}/>
                <SaleTickets cinemas={cinemas} setCinemas={setCinemas}/>
            </main>
        </>
    )
}

if (document.getElementById('admin')) {
    ReactDOM.createRoot(document.getElementById('admin')).render(
        <React.StrictMode>
            <Admin/>
        </React.StrictMode>,
    )
}
