import React from "react";

interface PatientInfoProps {
  name: string;
  phone: string;
  address: string;
  status: string;
}

const PatientInfo: React.FC<PatientInfoProps> = ({
  name,
  phone,
  address,
  status,
}) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h2 className="text-2xl font-bold">Bienvenido, {name}</h2>
      <h2 className="text-xl font-bold mt-2">Sus datos son:</h2>
      <p>
        <strong>Cédula:</strong> {phone}
      </p>
      <p>
        <strong>Dirección:</strong> {address}
      </p>
      <p>
        <strong>Status:</strong> {status}
      </p>
    </div>
  );
};

export default PatientInfo;
