import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import "./router.css";
import SelectLang from '../components/select-languaje/SelectLang';
import PantallaInicio from '../components/pantalla-inicio/PantallaInicio';
import EscaneoCodigo from '../components/escaneo-codigo/EscaneoCodigo';
import ImpresionFactura from '../components/impresion-factura/ImpresionFactura';

export default function BasicExample() {
    return (
        <Router>
            <>
                <div className="nav">
                    <div className="pais">
                        <Link to={{
                            pathname: '/selectLanguaje',

                        }}> <input type="image" src="https://www.mayoralonline.com/LibComunes/Lib_img/ico/banderas/ES.png" alt="pais" className="atras" />
                        </Link>
                    </div>
                    <div className="divLogo">
                        <img className="logo" src="https://static.mayoralonline.com/lib_img/logo/png/logo_n_2020.png" alt="logo"></img>
                    </div>
                </div>
                <Redirect
                    from="/"
                    to="/selectLanguaje" />
                <Switch>
                    <Route exact path="/selectLanguaje">
                        <SelectLang />
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
        </Router>
    );
}
