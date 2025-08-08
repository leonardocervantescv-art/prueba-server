import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventoSide from '../componentes/EventoSide';
import Header from '../componentes/Header';
import Banner from '../componentes/Banner';

const AcercaEP = () => {
    return(
                <>
            <Header />
            <div>
                <aside className="col-md-3 mb-3">
                    <EventoSide />
                </aside>
            </div>
            
        </>
    )
}
export default AcercaEP;