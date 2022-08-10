import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Registro from "./Registro";
//import { getCoins } from "../features/coinSlice";


const Login = () => {

    const [formInputs, setFormInputs] = useState({});

    const handleChange = (event) => {
        const {target} = event
        setFormInputs(p => ({...p, [target.name] : target.value }))
    }

  
    let navigate = useNavigate();

    const fetchLogin = () => {

        let activeUser;

        fetch("https://crypto.develotion.com/login.php", {
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                "usuario": formInputs.user,
                "password": formInputs.pass
            }),

        })
            .then(resp => resp.json())
            .then(data => {

                if (data.codigo == 200) {
                    //console.log(data);
                    activeUser = data;
                    localStorage.setItem("apikey", activeUser.apiKey);
                    localStorage.setItem("idUsuario", activeUser.id);
                    //console.log(activeUser);
                    navigate("/Dashboard");

                    alert(`Bienvenido/a ${formInputs.user}!`);
                } else {
                    alert("El Usuario y/o contraseña son incorrectos, vuelva a intentarlo.");
                }
            })



    }


    return (

        <div>

            <h1>Login</h1>
            <br />
            <label>Usuario:
                <input name="user" type="text"  onChange={handleChange} />
            </label>
            <br />
            <label>Contraseña:
                <input name="pass" type="text"  onChange={handleChange} />
            </label>
            <br />
            <input type="button" value="Ingresar" onClick={fetchLogin} disabled={!formInputs.user || !formInputs.pass} />
            <hr />
            <p>Si usted no esta logueado, registrese ... </p>
            <Registro />

        </div>


    );



}





export default Login;