import { Card, HRTrimmed } from "flowbite-react";

const Services = () => {
  return (
    <div>
      <Card >
        <div className="flex flex-col justify-center items-center">
          <h1 className="p-5">Misión</h1>
          <p className="text-gray-500">
            Nuestra Asociación tiene como misión promover desarrollar
            actividades que conlleven a la búsqueda del bienestar de la
            comunidad en general, mediante alianzas con organismos públicos y
            privados permitiendo así, lograr mejorar la calidad de vida y
            obtener el mejoramiento de las funciones, en los servicios públicos.
          </p>
          <HRTrimmed className="bg-slate-300 w-full" />
          <h1 className="p-5">Visión</h1>
          <p className=" text-gray-500">
            Aspiramos que nuestra organización sea un modelo de gestión
            comunitario sin fines de lucro, solida y con presencia Nacional en
            donde la participación protagónica de la comunidad sea la base
            fundamental. Nuestra función es facilitar el proceso de cambio de la
            comunidad donde colaboramos con una labor participativa y
            transparente, siempre buscando la autonomía y autogestión, para la
            sustentabilidad de los proyectos y programas.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Services;
