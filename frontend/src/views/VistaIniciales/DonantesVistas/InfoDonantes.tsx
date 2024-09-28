import React from 'react';

interface DonorContactInfoProps {
  name: string;
  email: string;
  phone: string;
  lastDonationDate: string;
}

const DonorContactInfo: React.FC<DonorContactInfoProps> = ({ name, email, phone, lastDonationDate }) => (
  <div className="bg-white shadow-md rounded p-4 mb-4">
    <h2 className="text-2xl font-bold mb-2">Datos del Donante</h2>
    <p><strong>Nombre:</strong> {name}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Teléfono:</strong> {phone}</p>
    <p><strong>Fecha de la última donación:</strong> {lastDonationDate}</p>
  </div>
);

export default DonorContactInfo;
