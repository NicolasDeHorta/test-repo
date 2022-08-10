

export const ItemList = ({ items, name }) => {

    return (

        <div>
            <h2>Lista de {name}</h2>
            <table className="tableWrapper">
                <tr>
                    <th>Moneda</th>
                    <th>Operacion</th>
                    <th>Cantidad</th>
                    <th>Valor actual</th>
                </tr>
                {items.map((item, index) => <tr key={index}><td>{item.name}</td> <td>{item.type}</td><td>{item.amount}</td><td>{item.value}</td></tr>)}
                
            </table>
            {/* <ul>
                {items.map((item, index) => <li key={index}>{item.name} | {item.type} | {item.amount} | {item.value}</li>)}
            </ul> */}
        </div>
    )
}

