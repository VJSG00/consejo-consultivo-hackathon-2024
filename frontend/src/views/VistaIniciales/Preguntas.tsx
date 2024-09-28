import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  Card,
} from "flowbite-react";

const Preguntas = () => {
  return (
    <div>
      <h1 className="p-5 self-center text-center font-bold">
        Preguntas frecuentes
      </h1>
      <Card className="bg-[#f4f9ff] p-16">
        <Accordion collapseAll className="outline outline-gray-300">
          <AccordionPanel>
            <AccordionTitle className=" bg-white outline outline-gray-300">
              Comunidades atendidas
            </AccordionTitle>
            <AccordionContent className="bg-white">
              <p className="mb-2 text-gray-500 ">
              Atendemos las comunidades de Santos Luzardo, Barrio Lindo, Cardenales,
              Alambique y los Luises en Barquisimeto.
              </p>
              
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle className="bg-white text-md outline outline-gray-300 ">
              ¿Quienes componen nuestro personal?
            </AccordionTitle>
            <AccordionContent className="bg-white">
              <p className="mb-2 text-gray-500 dark:text-gray-400">
              Nuestro equipo está compuesto por profesionales de la salud, 
              voluntarios dedicados y personal administrativo comprometido con nuestra causa.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle className="bg-white outline outline-gray-300 ">
              Cómo donar
            </AccordionTitle>
            <AccordionContent className="bg-white">
              <p className="mb-2 text-gray-500 dark:text-gray-400">
              Puedes donar medicamentos y suministros médicos nuevos o en buen estado a través de nuestra página web, 
              en nuestras oficinas, o contactándonos directamente para 
              coordinar la recolección.
              </p>          
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle className=" bg-white outline outline-gray-300 ">
              Donde donar
            </AccordionTitle>
            <AccordionContent className="bg-white">
              <p className="mb-2 text-gray-500 dark:text-gray-400">
              Las donaciones deben ser entregadas en nuestra sede principal ubicada en 
              el ambulatorio dra. Laura Labellarte.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle className=" bg-white outline outline-gray-300 ">
              Periodo de retiro de medicinas
            </AccordionTitle>
            <AccordionContent className="bg-white">
              <p className="mb-2 text-gray-500 dark:text-gray-400">
              El periodo de retiro de medicinas se establece según la disponibilidad de 
              los medicamentos y la urgencia de cada caso. 
              Te notificaremos cuando tus medicamentos estén listos para ser retirados.
              </p>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel>
            <AccordionTitle className=" bg-white outline outline-gray-300 ">
              Horario de atención al cliente
            </AccordionTitle>
            <AccordionContent className="bg-white">
              <p className="mb-2 text-gray-500 dark:text-gray-400">
              Nuestro horario de atención al público es de lunes a viernes, de 9:00 a.m. a 5:00 p.m.
              </p>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </Card>
    </div>
  );
};

export default Preguntas;
