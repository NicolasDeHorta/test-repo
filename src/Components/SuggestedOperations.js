import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const SuggestedOperations = () => {

    const [transaction, SetTransaction] = useState([]);
    const [lastTransaction, SetLastTransaction] = useState([]);
    const [coins, setCoins] = useState([]);
    const [output, setOutPut] = useState([]);


    useEffect(() => {

        let obtenerMonedas = async () => {
            const data = await fetch("https://crypto.develotion.com/monedas.php", {
                headers: {
                    "Content-Type": "application/json",
                    "apikey": localStorage.getItem("apikey")
                }
            })

            const dataJson = await data.json()
            setCoins(dataJson.monedas);
            //return dataJson.monedas;
        }

        obtenerMonedas();

    }, [])





    useEffect(() => {

        let idUser = localStorage.getItem("idUsuario");

        fetch(`https://crypto.develotion.com/transacciones.php?idUsuario=${idUser}`, {
            headers: {
                "Content-Type": "application/json",
                "apikey": localStorage.getItem("apikey")
            }
        })
            .then(resp => resp.json())
            .then(data => {
                SetTransaction(data.transacciones);
            })



    }, [])




    const serchLastTransaction = idCoin => {

        let filterTransaction = transaction.filter(t => t.moneda === idCoin);
        let lastTransaction = filterTransaction[filterTransaction.length - 1];

        return lastTransaction;

    }


    useEffect(() => {

        let obj;
        let list = [];

        for (let i = 0; i < transaction.length; i++) {
            //debugger
            const element = transaction[i].moneda;
            obj = serchLastTransaction(element);
            if (obj != null) {
                list.push(obj);
            }

        }

        const result = list.reduce((acc,item)=>{
            if(!acc.includes(item)){
                acc.push(item);
            }
            return acc;
          },[])

        SetLastTransaction(result);



    }, [transaction]);


    useEffect(() => {

        let obj;
        let decision = [];

        for (let i = 0; i < lastTransaction.length; i++) {
            const lT = lastTransaction[i];
            for (let j = 0; j < coins.length; j++) {
                const c = coins[j];
                if (lT.moneda === c.id && lT.tipo_operacion === 1 && lT.valor_actual < c.cotizacion) {
                    //vender
                    obj = {
                        moneda: c.nombre,
                        cot: c.cotizacion,
                        va: lT.valor_actual,
                        op: 2
                    }
                    decision.push(obj);
                } else if (lT.moneda === c.id && lT.tipo_operacion === 2 && lT.valor_actual > c.cotizacion) {
                    //comprar
                    obj = {
                        moneda: c.nombre,
                        cot: c.cotizacion,
                        va: lT.valor_actual,
                        op: 1
                    }
                    decision.push(obj);
                }

            }


        }

        setOutPut(decision);

        // debugger
        // console.log(decision);
        // console.log(coins);


    }, [lastTransaction]);












    return (
        <div>
            <h1>Inteligencia Artificial - Sugerencias de ejecuciones ... </h1>

            <ul>
                {output.map((item, index) => item.op === 1 ? <li key={index}>Conviene COMPRAR la moneda {item.moneda} ya que se VENDIO a {item.va} y su cotizacion es {item.cot}</li> :
                    <li key={index}>Conviene VENDER la moneda {item.moneda} ya que se COMPRO a {item.va} y su cotizacion es {item.cot}</li>)}
            </ul>

            <Link to="/Dashboard">Volver a Dashboard</Link>
        </div>
    )

}

