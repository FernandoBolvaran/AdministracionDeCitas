import React from "react";
import PropTypes from "prop-types";

const Cita = ({ cita, eliminarCita }) => {
  return (
    <div className="cita">
      <p>
        Nombre Paciente: <span> {cita.nombreP}</span>
      </p>
      <p>
        Apellido: <span> {cita.apellidoP}</span>
      </p>
      <p>
        Fecha: <span> {cita.fecha}</span>
      </p>
      <p>
        Hora: <span> {cita.hora}</span>
      </p>
      <p>
        Síntomas: <span> {cita.sintomas}</span>
      </p>
      <button
        className="button eliminar u-full-width"
        onClick={() => eliminarCita(cita.id)}
      >
        {" "}
        Eliminar &times;
      </button>
    </div>
  );
};

//Documentación
Cita.propTypes = {
  cita: PropTypes.object.isRequired,
  eliminarCita: PropTypes.func.isRequired,
};
export default Cita;
