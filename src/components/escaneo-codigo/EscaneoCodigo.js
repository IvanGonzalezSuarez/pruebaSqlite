/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./EscaneoCodigo.css";
import Carousel from 'react-bootstrap/Carousel';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MockTiendas from '../../mock/mockTiendas.json'
import { Link } from "react-router-dom";
import Traductor, { Translation } from '../translation/Traductor';

function PantallaInicio() {

    const [datosEscaneo, setDatosEscaneo] = useState(null);

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function envioCodigo() {
        var codigo = document.getElementById("codigo").value;

        async function postData(url = '', data = {}) {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return response.json();
        }
        MockTiendas.CONSPGM03.datos.body.codbar = codigo;
        console.log(MockTiendas.CONSPGM03.datos)
        postData(MockTiendas.URL + 'CONSPGM03', MockTiendas.CONSPGM03)
            .then(data => {
                setDatosEscaneo(data.datos);
                console.log(data.datos)
                setShow(false);
            })
            .catch(error => {
                setDatosEscaneo(null);
                setShow(false);
                console.error(error)
            });

    }
    function getImages1600(arrayImages) {
        var finalImages = [];
        arrayImages.imagenes.forEach(element => {
            let tamaño = element.split("-");
            if (tamaño[3] === "1600") {
                finalImages.push(element)
            }
        });
        return finalImages;
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title><h3><Traductor text={"ESCANEAR"} /></h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" id="codigo" alt="introduce el código"></input>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        <Traductor text={"CERRAR"} />
                    </Button>
                    <Button variant="primary" onClick={envioCodigo}><Traductor text={"ACEPTAR"} /></Button>
                </Modal.Footer>
            </Modal>
            <div className="main">
                <div className="modalContainer">
                    <Button variant="primary" onClick={handleShow}>
                        <Traductor text={"ESCANEAR"} />
                    </Button>
                </div>
                <Link className="link" to={{
                    pathname: '/pantallaInicio',

                }}> <input type="button" value="<" className="atrass" />
                </Link>
                <div className="bannerImagenesContainer">
                    <div className="bannerImagenes">
                        <Carousel>
                            {(datosEscaneo !== null && datosEscaneo !== undefined)
                                ?
                                getImages1600(datosEscaneo).map((elemento) => {
                                    return <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={datosEscaneo.imgpath + elemento}
                                            alt="First slide"
                                        />
                                    </Carousel.Item>
                                })
                                : ""
                            }
                        </Carousel>
                    </div>
                </div>
                <div className="descripcion">
                    <Accordion className="acordeon" defaultActiveKey="0">
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <Traductor text={"DESCRIPCION"} />
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    {(datosEscaneo !== null && datosEscaneo !== undefined)
                                        ?
                                        datosEscaneo.composicion.map((elemento) => {
                                            return <div dangerouslySetInnerHTML={{ __html: elemento.html }} />
                                        })
                                        :
                                        ""
                                    }
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
            </div>
        </>
    );

}

export default PantallaInicio;