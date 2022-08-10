import React, { useState, useEffect, useRef } from "react";

import "./graphics.css";

//GRAFICA DE COMPRAS/VENTAS/MONEDA INDIVIDUAL
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Bar, Pie, PolarArea } from "react-chartjs-2";

//Datos para grafica de compras
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale
);

const Graphics = ({ trans, coins }) => {
  const [transCompraName, setTransCompraName] = useState([]);
  const [transCompraImport, setTransCompraImport] = useState([]);
  const [transVentaName, setTransVentaName] = useState([]);
  const [transVentaImport, setTransVentaImport] = useState([]);
  const [transReduce, setTransReduce] = useState([]);
  const [onlyOneTrans, SetOnlyOneTrans] = useState({});

  const mon = useRef(null);

  useEffect(() => {
    //datos para tabla compra
    const transCompra = trans.filter((m) => m.tipo_operacion === 1);
    const transCompraName = transCompra.map(
      (m) => coins.find((n) => n.id === m.moneda).nombre
    );
    const transImportCompra = transCompra.map((m) =>
      Math.round(m.valor_actual)
    );
    //datos para tabla Venta
    const transVenta = trans.filter((m) => m.tipo_operacion === 2);
    const transVentaName = transVenta.map(
      (m) => coins.find((n) => n.id === m.moneda).nombre
    );
    const transImportVenta = transVenta.map((m) => Math.round(m.valor_actual));
    //datos para tabla por moneda
    let hash = {};
    let orden = trans.filter((o) =>
      hash[o.moneda] ? false : (hash[o.moneda] = true)
    );
    //debugger

    const onlyTransOneCoin = trans.filter(
      (t) => t.moneda === mon.current.value
    );

    SetOnlyOneTrans(onlyTransOneCoin);
    setTransReduce(orden);
    setTransCompraName(transCompraName);
    setTransCompraImport(transImportCompra);
    setTransVentaName(transVentaName);
    setTransVentaImport(transImportVenta);
  }, [trans]);

  return (
    <div>
      <h2>Graficas</h2>
      <div className="graphWrapper">
        <br />
        <div className="graph">
          <Bar
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Grafica de montos comprados por moneda",
                },
              },
            }}
            data={{
              labels: transCompraName,
              datasets: [
                {
                  label: "Compras/Monedas",
                  data: transCompraImport,
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ],
            }}
          />
        </div>
        <br />
        <hr />
        <div className="graph">
          <Pie
            data={{
              labels: transVentaName,
              datasets: [
                {
                  label: "# of Votes",
                  data: transVentaImport,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
        <br />
        <hr />
        <div className="graph">
          <PolarArea
            data={{
              labels: transCompraName,
              datasets: [
                {
                  label: "# of Votes",
                  data: onlyOneTrans,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                    "rgba(255, 159, 64, 0.5)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>

        <br />

        <label>
          Moneda
          <select name="moneda" ref={mon}>
            {transReduce.map((m) => (
              <option key={m.id} value={m.moneda}>
                {coins.find((c) => c.id === m.moneda).nombre}
              </option>
            ))}
          </select>
        </label>
        <br />
      </div>
    </div>
  );
};

export default Graphics;
