import Card from '../components/ui/Card'; // Importa el componente Card
import '../index.css'; // Importa tu archivo CSS

const Home = () => {
  const cardsData = [
    {
      title: 'Pacientes',
      description: 'Gestiona la información de los pacientes.',
      imageUrl: 'https://images.pexels.com/photos/1350560/pexels-photo-1350560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: '/pacientes'
    },
    {
      title: 'Medicinas',
      description: 'Gestiona la información de las Medicinas.',
      imageUrl: 'https://images.pexels.com/photos/5910953/pexels-photo-5910953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: '/medicinas'
    },
    {
      title: 'Estadisticas',
      description: 'Información Estadistica.',
      imageUrl: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: '/graficos'
    },
    {
      title:'Entregas',
      description:'Gestiona la información de las Entregas',
      imageUrl:'https://images.pexels.com/photos/6646967/pexels-photo-6646967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link:'/entregas'
    },
    {
      title:'Donantes',
      description:'Gestiona la información de los Donantes',
      imageUrl:'https://images.pexels.com/photos/6646906/pexels-photo-6646906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link:'/donantes'
    },
    {
      title:'Pruebas',
      description:'Pruebas',
      imageUrl:'https://images.pexels.com/photos/163016/crash-test-collision-60-km-h-distraction-163016.jpeg',
      link:'/pruebas'
    },
    {
      title:'Reporte',
      description:'Reportes',
      imageUrl:'https://images.pexels.com/photos/163016/crash-test-collision-60-km-h-distraction-163016.jpeg',
      link:'/reporte'
    }
  ];

  return (
    <div className="flex items-start justify-start h-full">
      <div className="flex flex-col gap-8 w-full p-8">
        <div className="text-indigo-950 font-bold text-2xl">
          Bienvenido
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              link={card.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
