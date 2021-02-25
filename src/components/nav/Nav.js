import React, { useState } from "react";

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bandera: this.props.bandera
        }
    }

    render() {
        return (
            <>
                <div className="nav">
                    <div className="pais">
                        <input type="image" src={this.props.bandera} onClick={this.props.habilitaLang} alt="pais" className="atras" />
                    </div>
                    <div className="divLogo">
                        
                        <img className="logo" onMouseUp={() => this.props.registro(true)} onMouseDown={() => this.props.registro(false)} src="https://static.mayoralonline.com/lib_img/logo/png/logo_n_2020.png" alt="logo"></img>
                    </div>
                </div>
            </>
        );
    }
}