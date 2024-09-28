import React from "react";
import Navbar from "./NavbarTest";
import PatientInfo from "./PacienteInfo";
import MedicationsTable from "./MedicamentosTable";
import Footer from "./Footer";

const PatientView: React.FC = () => {
  const patient = {
    name: "Juan Pérez",
    phone: "123-456-7890",
    address: "Calle Falsa 123",
    status: "Activo",
  };

  const medications = [
    { name: "Medicamento 1", status: "Asignado", date: "2024-09-25" },
    { name: "Medicamento 2", status: "Sin fecha", date: "" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto p-4">
        <PatientInfo {...patient} />

        <MedicationsTable medications={medications} />
      </div>
      <Footer />
    </div>
  );
};

export default PatientView;
