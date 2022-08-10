import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { appRoutes } from "../App";
import { ItemList } from "./ItemList";
import { Link } from "react-router-dom";
import AmountInvestment from "./AmountInvestment";
import MakeTransaction from "./MakeTransaction";
import Graphics from "./Graphics";

import './dashboard.css'

const Dashboard = () => {


    const [listItems, setListItems] = useState([]);
    const [finalMount, setFinalMount] = useState(0);
    const [transacUser, setTransacUser] = useState([]);
    const [monedas, setMonedas] = useState([]);
    const exit = useSelector(state => state.exit.exit);
    const navigate = useNavigate()



    useEffect(() => {
        //Este use effect me trae todas las monedas con sus datos actuales
        let obtenerMonedas = async () => {
            const data = await fetch("https://crypto.develotion.com/monedas.php", {
                headers: {
                    "Content-Type": "application/json",
                    "apikey": localStorage.getItem("apikey")
                }
            })

            const dataJson = await data.json()
            setMonedas(dataJson.monedas);
            //return dataJson.monedas;
        }

        obtenerMonedas();

    }, [])

    useEffect(() => {
        //Este use effect me trae todas las transacciones del usuario logeado
        let idUser = localStorage.getItem("idUsuario");

        fetch(`https://crypto.develotion.com/transacciones.php?idUsuario=${idUser}`, {
            headers: {
                "Content-Type": "application/json",
                "apikey": localStorage.getItem("apikey")
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setTransacUser(data.transacciones);
            })



    }, [])


    useEffect(() => {
        //Este use effect arma los objetos transacciones para mostrar en la lista de transacciones

        let allTransactions = [];
        let montoFinal = 0;


        transacUser.forEach(t => {

            if (t.tipo_operacion === 1) {
                montoFinal += t.valor_actual * t.cantidad
            } else {
                montoFinal -= t.valor_actual * t.cantidad
            }

            let transaction = ({
                name: (monedas.find(m => m.id === t.moneda)).nombre,
                type: t.tipo_operacion === 1 ? "Compra" : "Venta",
                amount: t.cantidad,
                value: Math.round(t.valor_actual),
                id: t.usuarios_id
            })

            allTransactions.push(transaction);


        })

        setListItems(allTransactions);
        setFinalMount(montoFinal);
        //console.log("monto total", finalMount);

    }, [monedas])




    const handleExit = () => {
        exit()
        navigate(appRoutes.login)
    }






    return (

        <div className="mainWrapper">
            <MakeTransaction className="sectionWrapper" name={"Transacciones"} monedas={monedas} />
            
            <ItemList className="section" name={"Transacciones"} items={listItems} />
            <Link className="sugerencias" to="/SuggestedOperations" >Sugerencias</Link>
            <br />
            
            <AmountInvestment className="sectionWrapper" name={"Monto Final de las Inversiones"} amount={finalMount} />
            
            <Graphics className="sectionWrapper" trans = {transacUser} coins ={monedas} />
            <br />
            <input type="button" value="Salir" onClick={handleExit} />
        </div>

    )
}


export default Dashboard