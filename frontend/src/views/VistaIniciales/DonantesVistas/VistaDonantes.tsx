import React from 'react';
import Navbar from '../VistaPacientes/NavbarTest';
import Footer from '../VistaPacientes/Footer';
import DonorContactInfo from './InfoDonantes';
import DonorStatistics from './DonanteStatistics';
import DonorTableStats from './TablaDonates';
import AgeDistributionChart from '../../components/Estadisticas/Distribuciones/AgeChart';
import ChronicDiseasesChart from '../../components/Estadisticas/Distribuciones/EnfermedadesCronicas';
import { FaChartBar, FaUserFriends } from 'react-icons/fa';

const DonorView: React.FC = () => {
  const donorContactInfo = {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '+58 123-456-7890',
    lastDonationDate: '2024-09-20'
  };

  const donorStats = {
    totalDonations: 150,
    patientsServed: 120
  };

  const essentialMeds = [
    { name: 'Paracetamol', value: 50 },
    { name: 'Ibuprofeno', value: 30 },
    { name: 'Amoxicilina', value: 20 }
  ];

  const requestedSupplies = [
    { name: 'Guantes', value: 40 },
    { name: 'Mascarillas', value: 35 },
    { name: 'Jeringas', value: 25 }
  ];

  const basicMeds = [
    { name: 'Vitamina C', value: 45 },
    { name: 'Antibióticos', value: 30 },
    { name: 'Antihistamínicos', value: 25 }
  ];

  const ageDistribution = [
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
  ];

  const chronicDiseases = [
    { disease: 'Diabetes', count: 30 },
    { disease: 'Hipertensión', count: 25 },
    { disease: 'Asma', count: 20 },
    { disease: 'Cáncer', count: 15 },
    { disease: 'Enfermedad Cardíaca', count: 10 }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto p-4">
        <DonorContactInfo {...donorContactInfo} />
        <div className="flex justify-between mb-4">
          <button className=" flex items-center  text-white px-4 py-2 rounded-lg hover:bg-[#35a1da]">
            <FaChartBar className="mr-2" />
            Ver Estadísticas
          </button>
          <button className="flex items-center bg-[#005d90] text-white px-4 py-2 rounded-lg hover:bg-[#35a1da]">
            <FaUserFriends className="mr-2" />
            Ver Donantes
          </button>
        </div >

        <div className="grid mx-16">
          <DonorTableStats essentialMeds={essentialMeds} requestedSupplies={requestedSupplies} basicMeds={basicMeds} />
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
};

export default DonorView;
