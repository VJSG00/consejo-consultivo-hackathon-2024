import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import Navbar from '../Pacientes/NavbarTest';
import Footer from '../Pacientes/Footer';
import DonorContactInfo from './InfoDonantes';
import DonorStatistics from './DonanteStatistics';
import DonorTableStats from './TablaDonates';
import AgeDistributionChart from '../../../components/Estadisticas/Distribuciones/AgeChart';
import ChronicDiseasesChart from '../../../components/Estadisticas/Distribuciones/EnfermedadesCronicas';
import { FaChartBar } from 'react-icons/fa';
import { fetchDatosMedicos } from '../../../api/VistaDonante';
import PaginatedTable from '../../../components/Tablas/PaginatedTableProps';
import ClipLoader from 'react-spinners/ClipLoader';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


type DonorContactInfo = {
  name: string;
  email: string;
  phone: string;
  lastDonationDate: string;
};

type DonorStats = {
  totalDonations: number;
  patientsServed: number;
};

type Med = {
  name: string;
  value: number;
};

type RequestedSupply = {
  id: string;
  name: string;
  marca: string;
  tipo: string;
  precio: number;
};

type AgeDistribution = {
  ageRange: string;
  count: number;
};

type ChronicDisease = {
  disease: string;
  count: number;
};

type DecodedToken = {
  id: number;
  role: string;
  email: string;
  idPaciente: number | null;
  idDonante: number;
  iat: number;
  exp: number;
};

const DonorView: React.FC = () => {
  
  const [loading, setLoading] = useState(true);
  
  const [donorContactInfo, setDonorContactInfo] = useState<DonorContactInfo>({
    name: '',
    email: '',
    phone: '',
    lastDonationDate: ''
  });

  const [donorStats, setDonorStats] = useState<DonorStats>({
    totalDonations: 0,
    patientsServed: 0
  });

  const [essentialMeds, setEssentialMeds] = useState<Med[]>([]);
  const [requestedSupplies, setRequestedSupplies] = useState<RequestedSupply[]>([]);
  const [basicMeds, setBasicMeds] = useState<Med[]>([]);
  const [ageDistribution, setAgeDistribution] = useState<AgeDistribution[]>([]);
  const [chronicDiseases, setChronicDiseases] = useState<ChronicDisease[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('AUTH_TOKEN'); // Asumiendo que el token está almacenado en localStorage
        if (!token) {
          throw new Error('No token found');
        }

        const decoded: DecodedToken = jwtDecode(token);
        const idDonante = decoded.idDonante;

        console.log(idDonante)
        const data = await fetchDatosMedicos(idDonante);

        setDonorContactInfo({
          name: data.donante.nombre,
          email: data.donante.correo,
          phone: data.donante.telefono,
          lastDonationDate: new Date(data.ultimaEntrega.fechaDonante).toLocaleDateString()
        });

        setDonorStats({
          totalDonations: data.totalDonaciones,
          patientsServed: data.pacientesAtendidos
        });

        setEssentialMeds(data.medicamentosEsenciales.map(med => ({
          name: med.nombreMedicamento,
          value: med.cantidad
        })));

        setBasicMeds(data.medicamentosBasicos.map(med => ({
          name: med.nombreMedicamento,
          value: med.cantidad
        })));

        setRequestedSupplies(data.medicamentosDonados.map(med => ({
          id: med.nombre + med.marca, // Assuming unique combination of name and brand
          name: med.nombre,
          marca: med.marca,
          tipo: med.tipo.join(', '),
          precio: med.precio
        })));

        // Simulated data for age distribution and chronic diseases
        setAgeDistribution([
          { ageRange: '0-5', count: 10 },
          { ageRange: '5-10', count: 15 },
          { ageRange: '10-15', count: 20 },
          { ageRange: '15-20', count: 25 },
          { ageRange: '20-30', count: 30 },
          { ageRange: '30-40', count: 35 },
          { ageRange: '40-50', count: 40 },
          { ageRange: '50-60', count: 45 },
          { ageRange: '60-70', count: 50 },
          { ageRange: '70-80', count: 55 },
          { ageRange: '80-90', count: 60 },
          { ageRange: '90+', count: 65 }
        ]);

        setChronicDiseases([
          { disease: 'Diabetes', count: 30 },
          { disease: 'Hipertensión', count: 25 },
          { disease: 'Asma', count: 20 },
          { disease: 'Cáncer', count: 15 },
          { disease: 'Enfermedad Cardíaca', count: 10 }
        ]);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const generarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');

    // Encabezado del Reporte
    doc.text('Reporte de Donación', 100, 20, { align: 'center' });
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');

    doc.text(`Nombre del Donador: ${donorContactInfo.name}`, 15, 30);
    doc.text(`Telefono: ${donorContactInfo.phone}`, 15, 40);
    doc.text(`Correo: ${donorContactInfo.email}`, 15, 50);
    doc.text(`Fecha de la Donación: ${donorContactInfo.lastDonationDate}`, 15, 60);
    doc.text('Tabla de Medicamentos Donados', 15, 75);

    // Tabla con los medicamentos donados
    const columns = ['Nombre', 'Marca', 'Tipo', 'Precio'];

    const data = requestedSupplies.map((medicamento) => [
      medicamento.name,
      medicamento.marca,
      medicamento.tipo,
      medicamento.precio,
    ]);

    autoTable(doc, {
      head: [columns],
      body: data,
      startY: 80,
    });

    // Añadir página
    doc.addPage();

    // Agradecimiento y detalles adicionales
    const agradecimiento = `Estimado/a ${donorContactInfo.name},

    Queremos expresar nuestro más sincero agradecimiento por su generosa donación. Su apoyo es fundamental para nosotros y nos permite promover el bienestar de la comunidad. Gracias a su contribución, podemos mejorar la calidad de vida y los servicios públicos.`;

    const agradecimientoDividido = doc.splitTextToSize(agradecimiento, 185);
    doc.text(agradecimientoDividido, 15, 30);

    doc.text(`Comunidad atendida: ${donorContactInfo.lastDonationDate}`, 15, 90);
    doc.text(`Personas que recibieron la donacion: ${donorStats.patientsServed}`, 15, 100);

    const final = `Apreciamos profundamente su compromiso y esperamos seguir contando con su valiosa colaboración en el futuro.

   Atentamente, 
   Elena Gonzalez`;

    const finaldividido = doc.splitTextToSize(final, 185);
    doc.text(finaldividido, 15, 130);

    // Guardar el PDF con el nombre del donante
    doc.save(`Reporte_${donorContactInfo.name}.pdf`);
  };



  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <ClipLoader size={50} color={"#005d90"} loading={loading} />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto p-4">
        <DonorContactInfo {...donorContactInfo} />
        <div className="flex justify-between mb-4">
          <button
            onClick={generarPDF}
            className="flex items-center text-white px-4 py-2 rounded-lg hover:bg-[#35a1da]"
          >
            <FaChartBar className="mr-2" />
            Generar Reporte
          </button>
        </div>
  
        <div className="grid mx-16">
          <DonorTableStats essentialMeds={essentialMeds} basicMeds={basicMeds} />
        </div>
        <div className="grid mx-16 mt-4">
          <PaginatedTable
            items={requestedSupplies}
            columns={[
              { key: 'name', label: 'Nombre' },
              { key: 'marca', label: 'Marca' },
              { key: 'tipo', label: 'Tipo' },
              { key: 'precio', label: 'Precio' }
            ]}
            searchKeys={['name', 'marca', 'tipo']}
          />
        </div>
        <div className="grid grid-cols-3 gap-16 mt-9">
          <AgeDistributionChart data={ageDistribution} />
          <ChronicDiseasesChart data={chronicDiseases} />
          <DonorStatistics data={donorStats} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DonorView;
