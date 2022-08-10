import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from "react-redux";
// import { appRoutes } from "../App";
// import { ItemList } from "./ItemList";
// import { Link } from "react-router-dom";
// import AmountInvestment from "./AmountInvestment";

import './makeTransaccion.css'





const MakeTransaction = ({monedas, name}) => {

    const [formInputs, setFormInputs] = useState({});

    const handleSend = () => {
        makeTrans();     
    }


    const handleFormInputs = (event) => {

        const { target } = event
        setFormInputs(p => ({ ...p, [target.name]: target.value }))
        console.log(formInputs);
    }


    const makeTrans = () => {

        let va = monedas.find(m => m.id == formInputs.moneda)
        formInputs.valorActual = va.cotizacion;
        formInputs.idUsuario = localStorage.getItem("idUsuario");

       
        if (formInputs.cantidad <= 0) {
            alert("La cantidad de unidades deben ser mayores a 0 !");
        } else {

            fetch("https://crypto.develotion.com/transacciones.php", {
                headers: {
                    "Content-Type": "application/json",
                    "apikey": localStorage.getItem("apikey")
                },
                method: "POST",

                body: JSON.stringify(formInputs),
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.codigo === 200) {
                        alert(data.mensaje);                                          
                        window.location.reload();
                    } else {
                        alert(data.mensaje);
                    }
                })
        }

    }






    return (
        <div>
        <h2>{name}</h2>        
        <div className="inputWrapper">
            
            <hr/>
            <label> Operacion
                <select name="tipoOperacion" onChange={handleFormInputs}>
                    <option value={1}>Compra </option>
                    <option value={2}>Venta </option>
                </select>
            </label>
            <br />
            <label>Unidades
                <input type="number" name="cantidad" onChange={handleFormInputs} />
            </label>
            <br />
            <label>Moneda
                <select name="moneda" onChange={handleFormInputs}>
                    {monedas.map(m => <option key={m.id} value={m.id} >{m.nombre}</option>)}
                </select>
            </label>
            <br />
            <input type="button" value="Enviar" onClick={handleSend} />
                   
        </div>
        </div>





    )
}

export default MakeTransaction
