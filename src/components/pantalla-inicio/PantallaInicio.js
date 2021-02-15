import React from "react";
import "./PantallaInicio.css";

import { Link } from "react-router-dom";
function PantallaInicio() {
    return (
        <>
            <div className="main">
                <div className="container">
                    <Link to={{
                        pathname: '/escaneoCodigo',
                    }}> <input type='button' value="Escanear Código" className="buttonContainer" />
                    </Link>
                </div>
                <div className="container2">
                    <input type='button' value="TODO" className="buttonContainer" />
                </div>
                <div className="container">
                    <input type='button' value="TODO" className="buttonContainer" />
                </div>
                <div className="container2">
                    <input type='button' value="TODO" className="buttonContainer" />
                </div>
            </div>
        </>
    );

}

export default PantallaInicio;