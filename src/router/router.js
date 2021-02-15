import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "./router.css";
import SelectLang from '../components/select-languaje/SelectLang';
import PantallaInicio from '../components/pantalla-inicio/PantallaInicio';
import EscaneoCodigo from '../components/escaneo-codigo/EscaneoCodigo';

export default function BasicExample() {
    return (
        <Router>
            <>
                <div className="nav">
                    <div className="pais">
                        <Link to={{
                            pathname: '/',

                        }}> <input type="image" src="https://www.mayoralonline.com/LibComunes/Lib_img/ico/banderas/ES.png" alt="pais" className="atras" />
                        </Link>
                    </div>
                    <div className="divLogo">
                        <img className="logo" src="https://static.mayoralonline.com/lib_img/logo/png/logo_n_2020.png" alt="logo"></img>
                    </div>
                </div>
                <Switch>
                    <Route exact path="/">
                        <SelectLang />
                    </Route>
                    <Route path="/pantallaInicio">
                        <PantallaInicio />
                    </Route>
                    <Route path="/escaneoCodigo">
                        <EscaneoCodigo />
                    </Route>
                </Switch>
            </>
        </Router>
    );
}