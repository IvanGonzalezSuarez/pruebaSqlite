/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import MockTiendas from '../../mock/mockTiendas.json'
import { Link } from "react-router-dom";
import "./ImpresionFactura.css";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

function PantallaInicio() {
    let item = {"articulo:":1079,"color":58,"talla":"18","descart":"T-Shirt k","desccol":"Rosa","pvp":14.99,"moneda":"EUR.","imgpath":"https://media.mayoral.com/wcsstore/mayoral/images/catalog/mayoral/","imagenes":["21-01079-058-140-4.JPG"]}
    let selected = null;
    const [printers, setPrinters] = useState(null)

    async function takePrinters(){
      window.api.testSend()
      await window.api.darCosas((args, data) => setPrinters(data));
    }

    function printDevices(){
      if(printers && document.getElementById("list_printers").innerHTML === ""){
        printers.map((item, index) => {
          document.getElementById("list_printers").innerHTML += '<div class="radio"><input type="radio" name="printer" value="' + item.name + '"><label for="printer_' + index + '"><span>' + item.name + "</span></label></div>";
        });
      }
    }

    async function print(){
      selected = document.getElementsByName("printer")
      for (var x = 0; x < selected.length; x ++) {
        if (selected[x].checked) {
          selected = selected[x]
        }
      }
      if(typeof selected.value === "string"){
        await window.api.printPosPint({item:item, printer:selected.value})
      }else{
        console.error("Necesitas seleccionar una impresora para poder imprimir la factura.");
      }
    }

    return (
      <div className="mt-5 pt-5">
        <Container>
          <Row>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={item.imgpath + item.imagenes[0]} />
                <Card.Body>
                  <Card.Title>{item.descart}</Card.Title>
                  <Card.Text>{item.descart}</Card.Text>
                  <Card.Text>Color {item.desccol}</Card.Text>
                  <Card.Text>{item.pvp + item.moneda}</Card.Text>
                  <Button variant="dark" onClick={print}>Imprimir</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="info" onClick={takePrinters}>Buscar immpresoras</Button>
              <Button variant="info" onClick={printDevices}>Seleccionar impresora</Button>
              <div id='list_printers'></div>
            </Col>
          </Row>
        </Container>
      </div>
    );
}

export default PantallaInicio;
