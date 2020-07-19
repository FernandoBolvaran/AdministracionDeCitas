import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  //Citas en local Storage
  //JSON.parse convierte mi item en JSON que es mas facil para leer
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  //si no hay citas iniciales inicia como un arreglo vacio
  if (!citasIniciales) {
    citasIniciales = [];
  }
  //Arregl de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //Use Effect  para realizar ciertas  operaciones cuiando el state cambia
  useEffect(() => {
    if (citasIniciales) {
      //lo convierte en un  string q es lo unico que soporta el localStorage
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
    //hacer que ese use effect se ejecute solo 1 vez en este caso el state de citas
  }, [citas, citasIniciales]);

  //Funcion que toma las citas actuales y agrega la nueva
  const crearCita = (cita) => {
    //sacar una copia del estado y usar la function que modifica el staate (guardar citas)
    guardarCitas([...citas, cita]);
  };

  //Function q eliminia una cita por su id
  const eliminarCita = (id) => {
    //crear un nuevo arreglo, itera o recorre la cita y que la eliminie por id pero me traiga la que son diferentes !==
    const nuevaCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevaCitas);
  };

  //Mensaje Condicional
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";
  return (
    <Fragment>
      <h1> Administrador de pacientes </h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half  column">
            <h2> {titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default App;
