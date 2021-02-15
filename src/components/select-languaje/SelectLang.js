import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SelectLang.css";
import MockTiendas from '../../mock/mockTiendas.json'

function SelectLang() {

    const [lenguajes, setLenguajes] = useState([]);
    const [count] = useState(0);

    useEffect(() => {
        async function postData(url = '', data = {}) {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return response.json();
        }

        postData(MockTiendas.URL + 'CONSPGM02', MockTiendas.CONSPGMO2)
            .then(data => {
                setLenguajes(data.datos.idiomas);
            });
    }, [count]);

    return (
        <>
            <div id='title'>
                <h1> Select a language </h1>
            </div>
            <div id='main'>
                {lenguajes.length > 0
                    ?
                    lenguajes.map((elemento) => {
                        return <div className="divButton">
                            <Link to={{
                                pathname: '/pantallaInicio',
                                state: { detail: elemento }
                            }}>
                                <input type="image" src={elemento.bandera} alt={elemento.descri} />
                            </Link>
                        </div>
                    })
                    : ""
                }
            </div>
        </>
    );

}

export default SelectLang;