import React, { Component } from "react";
import Traductor from '../translation/Traductor';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";

export default class ModalRegistroOculto extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                {this.props.habilitaRegistroOculto === true ?
                    <Modal
                        show={true}
                        backdrop="static"
                        keyboard={false}
                        centered
                    >
                        <Modal.Body>
                            <div id='main'>
                                <h3>Habilitar el Registro?</h3>
                                <Link to={{ pathname: '/registrarDispositivo', }}>
                                    <input type="button" className="buttonContainer" value="ACEPTAR" onClick={() => this.props.apagaModalRegistro()} />
                                </Link>
                                <br/>
                                <input type="button" className="buttonContainer" value="CANCELAR" onClick={() => this.props.apagaModalRegistro()} />
                            </div>
                        </Modal.Body>
                    </Modal>

                    : ""}
            </>
        );
    }
}

