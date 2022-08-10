import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../App";


const Registro = () => {

    const [departamentos, setDepartamentos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [formData, setFormData] = useState({})

    const navigate = useNavigate();


    const handleFormData = ({ target }) => {
        setFormData(prev => ({ ...prev, [target.name]: target.value }))
        console.log(formData);
    }


    useEffect(() => {
        fetch("https://crypto.develotion.com/departamentos.php")
            .then(resp => resp.json())
            .then(data => {
                setDepartamentos(data.departamentos)
            });

    }, [])

    useEffect(() => {
        
        formData.idDepartamento && fetch(`https://crypto.develotion.com/ciudades.php?idDepartamento=${formData.idDepartamento}`)
            .then(resp => resp.json())
            .then(data => {
                setCiudades(data.ciudades)               
            });
    }, [formData.idDepartamento])

    const register = () => {

        let activeUser;


        fetch("https://crypto.develotion.com/usuarios.php", {
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(formData),

        })
            .then(resp => resp.json())
            .then(data => {
                //console.log(data);
                if (data.codigo === 200) {
                    activeUser = data;
                    localStorage.setItem("apikey", activeUser.apiKey);
                    localStorage.setItem("idUsuario", activeUser.id);
                    alert("Usuario registrado satisfactoriamente !");
                    navigate(appRoutes.Dashboard);
                    //user.id = data.id;
                } else {
                    alert(data.mensaje);
                }

            });


    }

    const handleRegister = () => {
        register();
        
    }


    return (

        <div>

            <h1>Registrarse</h1>
            <br />
            <label>Usuario:
                <input type="text" name="usuario" onChange={handleFormData} />
            </label>
            <br />
            <label>Contraseña:
                <input type="text" name="password" onChange={handleFormData} />
            </label>
            <br />
            <label>Departamento
                <select name="idDepartamento" onChange={handleFormData}>
                    {departamentos.map(dep => <option key={dep.id} value={dep.id} >{dep.nombre}</option>)}
                </select>
            </label>
            <br />
            <label>Ciudad
                <select name="idCiudad" onChange={handleFormData}>
                    {ciudades?.map(ciu => <option key={ciu.id} value={ciu.id}>{ciu.nombre}</option>)}
                </select>
            </label>
            <br />

            <input type="button" value="Registrarse" onClick={handleRegister} />

        </div>



    );




}

export default Registro;