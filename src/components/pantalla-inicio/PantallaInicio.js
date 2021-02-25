import React, { Suspense } from "react";
import Traductor, { Translation } from '../translation/Traductor';
import "./PantallaInicio.css";

import { Link } from "react-router-dom";

const Loader = () => (
    <div className="App">
        <div>loading...</div>
    </div>
);

function PantallaInicio() {
    return (
        <>
            <div className="main">
                <div className="container">
                    <Link to={{
                        pathname: '/escaneoCodigo',
                    }}> <h1 className="buttonContainer"><Traductor text={"ESCANEAR"} /></h1>

                    </Link>
                </div>
                <div className="container2">
                    <Link to={{
                        pathname: '/ImpresionFactura',
                    }}> <h1 className="buttonContainer"><Traductor text={"IMPRIMIR"} /></h1>
                    </Link>
                </div>
                <div className="container">
                    <h1 className="buttonContainer"><Traductor text={"TODO"} /></h1>
                </div>
                <div className="container2">
                    <h1 className="buttonContainer"><Traductor text={"TODO"} /></h1>
                </div>
            </div>
        </>
    );

}

export default PantallaInicio;
