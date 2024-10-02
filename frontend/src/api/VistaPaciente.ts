import axios from 'axios';

export const fetchPacienteData = async (id: number) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/vista-paciente/${id}`
    const response = await axios.get(url);
    console.log('Datos recibidos del backend:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
