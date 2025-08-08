import React from "react";
import Header from "../componentes/Header";
import EventoSide from "../componentes/EventoSide";

const Ceremonias = () => {
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

export default  Ceremonias;