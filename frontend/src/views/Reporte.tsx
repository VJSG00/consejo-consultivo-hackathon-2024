import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const data = {
    name: "Juan Pérez",
    id: "12",
    fecha: "2024-09-26",
    Entrega: [
        { name: "Paracetamol", brand: "Genéricos S.A.", cost: 5.00 },
        { name: "Ibuprofeno", brand: "Farmacéutica XYZ", cost: 8.50 },
        { name: "Gasas Estériles", brand: "MedSupply", cost: 12.00 },
    ],
    Total: [
        { name: "Paracetamol", brand: "Genéricos S.A.", cost: 5.00 },
        { name: "Ibuprofeno", brand: "Farmacéutica XYZ", cost: 8.50 },
        { name: "Gasas Estériles", brand: "MedSupply", cost: 12.00 },
    ],
    stockDurationChart: {
        data: [
            { name: "Paracetamol", daysInStock: 10 },
            { name: "Ibuprofeno", daysInStock: 15 },
            { name: "Gasas Estériles", daysInStock: 20 },
        ],
        chartType: "bar",
    },
    communityDistributionChart: {
        data: [
            { name: "Comunidad A", value: 50 },
            { name: "Comunidad B", value: 30 },
            { name: "Comunidad C", value: 20 },
        ],
        chartType: "pie",
    },
    foundationAdminSignature: "Elena Rodríguez",
};


const PdfGenerator: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const generatePDF = () => {
        const doc = new jsPDF();

        doc.text(`Nombre del Donante: ${data.name}`, 10, 10);
        doc.text(`ID del Donante: ${data.id}`, 10, 20);
        doc.text(`Fecha de la Donación: ${data.fecha}`, 10, 30);

        doc.text(`Los medicamentos donados por ${data.name} fueron entregados`, 10, 40);
        doc.text(`a la comunidad. A continuación, se desglosan varias listas con los nombres`, 10, 50)
        doc.text(`de los medicamentos e insumos, la marca y el costo.`, 10, 60)
        if (selectedOption === 'option1') {
            doc.text('Lista de Medicamentos e Insumos Donados', 10, 80);
            autoTable(doc, {
                startY: 90,
                head: [['Nombre del Medicamento/Insumo', 'Marca', 'Costo']],
                body: data.donatedItems.map(item => [item.name, item.brand, item.cost]),
            });
        } else if (selectedOption === 'option2') {
            doc.text('Lista de Medicamentos e Insumos Donados', 10, 90);
            autoTable(doc, {
                startY: 100,
                head: [['Nombre del Medicamento/Insumo', 'Marca', 'Costo']],
                body: dataOption2.map(item => [item.name, 'Marca 2', 'Costo 2']),
            });
        } else if (selectedOption === 'option3') {
            doc.text('Lista de Medicamentos e Insumos Donados', 10, 110);
            autoTable(doc, {
                startY: 120,
                head: [['Nombre del Medicamento/Insumo', 'Marca', 'Costo']],
                body: dataOption3.map(item => [item.name, 'Marca 3', 'Costo 3']),
            });


            doc.text('La fundación agradece profundamente a [Nombre del Donante] por su buena voluntad al haber ayudado a la fundación y a las personas que más lo necesitan.', 10, 280);
            doc.text('Firma de la Administradora de la Fundación:', 10, 290);
            doc.text('Elena [Apellido]', 10, 300);

            doc.save('reporte.pdf');
        };

        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Generador de Reportes en PDF</h1>
                <select
                    className="mb-4 p-2 border border-gray-300 rounded"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value="">Selecciona una opción</option>
                    <option value="option1">Opción 1</option>
                    <option value="option2">Opción 2</option>
                    <option value="option3">Opción 3</option>
                </select>
                <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={generatePDF}
                >
                    Generar PDF
                </button>

                {selectedOption && (
                    <div>
                        <div id="barChart" className="mt-4">
                            <BarChart width={600} height={300} data={
                                selectedOption === 'option1' ? dataOption1 :
                                    selectedOption === 'option2' ? dataOption2 :
                                        dataOption3
                            }>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </div>

                        <div id="pieChart" className="mt-4">
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={selectedOption === 'option1' ? dataOption1 :
                                        selectedOption === 'option2' ? dataOption2 :
                                            dataOption3}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={150}
                                    fill="#8884d8"
                                    label
                                >
                                    {dataOption3.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </div>
                    </div>
                )}
            </div>
        );
    };
}

export default PdfGenerator;
