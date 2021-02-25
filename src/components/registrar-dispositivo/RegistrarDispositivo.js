import React, { useState, useEffect } from "react";
import "./RegistrarDispositivo.css";
import Traductor from '../translation/Traductor';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export default function RegistrarDispositivo(props) {

    const [validated, setValidated] = useState(false);
    const [datos, setDatos] = useState({
        tienda: 0,
        tip_dev: "P",
        cod_dev: 1,
        forzarc: "S",
        dev_modelo: "PPC3100"
    });

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            setValidated(true);
            compruebaRegistroDispositivo(datos)

        }
    };
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.name === "cod_dev" || event.target.name === "tienda"
                ? parseInt(event.target.value) : event.target.value
        })
    }
    async function compruebaRegistroDispositivo() {
        await props.postData("REGPGM00", datos).then(async data =>  {
            if (data.errorCode === 0) {
                await props.insertarRegistro(datos, data.datos.uid_dev);
                console.log()
            }else{
                console.log(data)
            }
        });

        //   await insertar(datos)
    }
    return (
        <>
            <div className="main">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <h1><Traductor text={"REGISTRAR"} /></h1>
                    <Form.Row>
                        <Form.Group as={Col} md="2" controlId="validationCustom01">
                            <Form.Label><Traductor text={"TIENDA"} /></Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="..."
                                onChange={handleInputChange}
                                name="tienda"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                            <Form.Label><Traductor text={"NUMERO DIS"} /></Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="..."
                                onChange={handleInputChange}
                                name="cod_dev"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="validationCustom03">
                            <Form.Label><Traductor text={"TIPO DIS"} /></Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="..."
                                onChange={handleInputChange}
                                name="tip_dev"
                            />
                        </Form.Group>
                    </Form.Row>
                    <Button type="submit"><Traductor text={"ACEPTAR"} /></Button>
                </Form>
            </div>
        </>
    );
}
