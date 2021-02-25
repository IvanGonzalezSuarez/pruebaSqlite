import React, { Component } from "react";
import "./SelectLang.css";
import Traductor from '../translation/Traductor';
import Modal from 'react-bootstrap/Modal';


export default class SelectLanguaje extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            response: null,
            lenguajes: this.props.idiomas
        }
    
    }
    render() {
        return (
            <>
                {this.props.habilitaLang === true ?
                    <Modal
                        show={true}
                        backdrop="static"
                        keyboard={false}
                        centered
                    >
                        <Modal.Body>
                            <div>
                                <div id='title'>
                                    <h1><Traductor text={"SELECT"} /></h1>
                                </div>
                                <div id='main'>
                                    {this.props.idiomas !== null
                                        ?
                                        this.props.idiomas.map((elemento, key) => {
                                            return <div className="divButton" key={key}>
                                                <input type="image" src={elemento.bandera} onClick={() => this.props.changeLanguage(elemento.idiomajs)} alt={elemento.descri} />
                                            </div>
                                        })
                                        : ""
                                    }
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>

                    : ""}
            </>
        );
    }
}

