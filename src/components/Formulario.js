import React, { Fragment, useState } from "react";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";

const Formulario = ({ crearCita }) => {
  const [cita, actualizarCita] = useState({
    nombreP: "",
    apellidoP: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  const [error, actualizarError] = useState(false);

  //funcion que se ejecuta cada vez que el usuario escribe en un input
  const actualizarState = (e) => {
    actualizarCita({
      //pre operator, copia los parametros de mi objeto
      ...cita,
      [e.target.name]: e.target.value,
    });
    //para saber en donde estoy escribiendo
    console.log(e.target.value);
  };

  //Extraer los valores

  const { nombreP, apellidoP, fecha, hora, sintomas } = cita;

  //function enviar datos

  const submitCita = (e) => {
    //para prevenir el metodo query string
    e.preventDefault();
    console.log("Enviando form");
    //validacion
    if (
      nombreP.trim() === "" ||
      apellidoP.trim() === "" ||
      fecha.trim() === "" ||
      (hora.trim() === "") | (sintomas.trim() === "")
    ) {
      actualizarError(true);
      return;
    }

    //Eliminar el mensaje de erro si pasa
    actualizarError(false);

    //Asignar ID
    cita.id = uuid();
    console.log(cita);

    //Crear la cita
    crearCita(cita);

    //Reiniciar el form
    actualizarCita({
      nombreP: "",
      apellidoP: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <Fragment>
      <h2>Crear Cita</h2>
      {error ? (
        <p className="alerta-error"> Todos los campos son obligatorios </p>
      ) : null}
      <form onSubmit={submitCita}>
        <label>Nombre Paciente</label>
        <input
          type="text"
          name="nombreP"
          className="u-full-width"
          placeholder="Nombre "
          onChange={actualizarState}
          value={nombreP}
        />
        <label>Apellido Paciente</label>
        <input
          type="text"
          name="apellidoP"
          className="u-full-width"
          placeholder="Apellido"
          onChange={actualizarState}
          value={apellidoP}
        />
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />
        <label> Síntomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>
        <button type="submit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </Fragment>
  );
};

//Documentación
Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
};
export default Formulario;
