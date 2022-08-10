
const AmountInvestment = ({amount, name}) => {

    let saldo = "";

    if (amount > 0) {
        saldo = "POSITIVO"
    } else if (amount < 0) {
        saldo = "NEGATIVO"
    } else {
        saldo = "CERO"
    }

    return (


        <div>
            <h2>{name}</h2>
            <b>El monto actual de sus inversiones es {saldo} : {amount}</b>


        </div>


    );
}

export default AmountInvestment