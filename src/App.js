import React, { Suspense } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom";

import RegistrarDispositivo from './components/registrar-dispositivo/RegistrarDispositivo';
import ModalRegistroOculto from './components/modal-registro-oculto/ModalRegistroOculto';
import SelectLang from './components/select-languaje/SelectLang';
import PantallaInicio from './components/pantalla-inicio/PantallaInicio';
import EscaneoCodigo from './components/escaneo-codigo/EscaneoCodigo';
import ImpresionFactura from './components/impresion-factura/ImpresionFactura';
import Nav from './components/nav/Nav';
import MockTiendas from './mock/mockTiendas.json';
import i18n from './i18n';
import "./App.css";


const langStorage = window.localStorage.getItem("i18nextLng");
const registro = true;
const inserto = window.api.inserto;
const borro = window.api.borro;
const consulto = window.api.consulto;
let time;
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.seleccionaBandera = this.seleccionaBandera.bind(this);
        this.cambiarIdioma = this.cambiarIdioma.bind(this);
        this.habilitaLang = this.habilitaLang.bind(this);
        this.consultar = this.consultar.bind(this);
        this.insertar = this.insertar.bind(this);
        this.postData = this.postData.bind(this);
        this.insertarRegistro = this.insertarRegistro.bind(this);
        this.apagaModalRegistro = this.apagaModalRegistro.bind(this);
        
        this.state = {
            lenguajes: null,
            bandera: "",
            lang: "",
            habilitaLang: false,
            habilitaRegistroOculto: false
        };
    }

    componentDidMount() {
        //this.borrar();
        this.postData("CONSPGMO2")
            .then(data => {
                this.setState({
                    lenguajes: data.datos.idiomas,
                    bandera: this.seleccionaBandera(data.datos.idiomas, langStorage)
                });
            });

        this.setState({ registro: this.consultar() })
    }
    async consultar() {
        const response = await consulto({ num: "mensaje" });
        if (response.lenght > 0) {
            return true
        } else {
            return false;
        }
    }
    async insertar(data) {
        await inserto(data)
    }

    async borrar() {
        var mensaje = 5;
        await borro({ num: mensaje })
    }
    seleccionaBandera(arrayBanderas, lang) {
        let bandera = "";
        arrayBanderas.map((elemento, key) => {
            if (elemento.idiomajs === lang) {
                bandera = elemento.bandera
            }
        });
        return bandera;
    }
    cambiarIdioma(lang) {
        i18n.changeLanguage(lang)

        this.setState({
            bandera: this.seleccionaBandera(this.state.lenguajes, lang),
            habilitaLang: false
        });
    }
    habilitaLang() {
        var habilitaLang;
        this.state.habilitaLang ? habilitaLang = false : habilitaLang = true;

        this.setState({
            habilitaLang: habilitaLang
        });
    }
    insertarRegistro(body, uid) {
        body.uid = uid;
        this.insertar(body)
    }
    async postData(id, body) {
        let url = "";
        let data = [];
        MockTiendas.contenido.forEach(element => {
            if (element.name === id) {
                url = MockTiendas.URL + element.name;
                if (body !== undefined) element.datos.body = body;

                data.push(element);
            }
        });
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data[0])
        });
        return response.json();
    }
    registro(limpiarTimeOut) {
        if (!limpiarTimeOut) {
            time = setTimeout(() => {
                this.setState({ habilitaRegistroOculto: true })

                return true
            }, 5000)
        } else {
            clearTimeout(time);
        }
    }
    apagaModalRegistro() {
        this.setState({ habilitaRegistroOculto: false })
    }
    render() {

        return (
            <Router >
                <>
                    <Nav registro={(limpiar) => this.registro(limpiar)} bandera={this.state.bandera} habilitaLang={this.habilitaLang} />
                    <Redirect
                        from="/"
                        to={!registro ? "/registrarDispositivo" : "/pantallaInicio"} />
                    <ModalRegistroOculto habilitaRegistroOculto={this.state.habilitaRegistroOculto} apagaModalRegistro={() => this.apagaModalRegistro()} />
                    <SelectLang idiomas={this.state.lenguajes} habilitaLang={this.state.habilitaLang} changeLanguage={(data) => this.cambiarIdioma(data)} />
                    <Switch>
                        <Route path="/registrarDispositivo">
                            <RegistrarDispositivo insertarRegistro={(body, uid) => this.insertarRegistro(body, uid)} postData={(url, data) => this.postData(url, data)} />
                        </Route>
                        <Route path="/pantallaInicio">
                            <PantallaInicio />
                        </Route>
                        <Route path="/escaneoCodigo">
                            <EscaneoCodigo />
                        </Route>
                        <Route path="/ImpresionFactura">
                            <ImpresionFactura />
                        </Route>
                    </Switch>
                </>
            </Router >
        );
    }
}

const Loader = () => (
    <div className="App">
        <div>loading...</div>
    </div>
);