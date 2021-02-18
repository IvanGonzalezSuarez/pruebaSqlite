import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SelectLang.css";
import MockTiendas from '../../mock/mockTiendas.json'

const inserto = window.api.inserto
const borro = window.api.borro
const consulto = window.api.consulto

function SelectLang() {

    const [lenguajes, setLenguajes] = useState([]);
    const [count] = useState(0);
    const [response, setResponse] = useState([]);

    //const [hola, setHola] = useState(null);
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

    async function insertar() {
        var mensaje = 5;
        await inserto({ num: mensaje })
    }
    async function borrar() {
        var mensaje = 5;
        await borro({ num: mensaje })
    }
    async function consultar() {
        var mensaje = 5;

        const response = await consulto({ num: mensaje });
        console.log(response);
        response !== null && response !== undefined ? setResponse(response) : setResponse([]);

    }

    return (
        <>
            <div id='title'>
                <h1> Select a language </h1>
            </div>
            <div id='main'>
                {lenguajes.length > 0
                    ?
                    lenguajes.map((elemento, key) => {
                        return <div className="divButton" key={key}>
                            <Link to={{
                                pathname: '/pantallaInicio',
                                state: { detail: elemento }
                            }}>
                                <input type="image" src={elemento.bandera} alt={elemento.descri} />
                            </Link>
                            <input type="button" value="insertar" onClick={insertar} />
                            <input type="button" value="borrar" onClick={borrar} />
                            <input type="button" value="consultar" onClick={consultar} />
                        </div>
                    })
                    : ""
                }
                {response.length > 0
                    ?
                    response.map((elemento) => {
                        return <div className="divButton">

                                <p>{elemento.info} </p>

                        </div>
                    })
                    : ""
                }
            </div>
        </>
    );

}

export default SelectLang;
