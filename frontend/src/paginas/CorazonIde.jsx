import React from "react";
import Header from "../componentes/Header";
import EventoSide from "../componentes/EventoSide";

const CorazonIdeologico = () =>  {
    return(
        <>
            <Header />
            <div className="col-md-3 mb-3"> {/* para responsividad */}
                <aside>
                    <EventoSide />
                </aside>
            </div>
        </>
    )
}

export default CorazonIdeologico;