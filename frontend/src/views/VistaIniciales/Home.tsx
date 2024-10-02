import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <div className=" px-6 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#f1f1e6] to-[#35A1DA] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Propósito de Nuestra Asociación
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Nuestra Asociación se dedica a mejorar la calidad de vida de la
              comunidad a través de la donación de medicamentos. Facilitamos la
              conexión entre pacientes que necesitan medicamentos y donantes
              dispuestos a ayudar. Trabajamos en colaboración con organismos
              públicos y privados para asegurar que cada donación llegue a
              quienes más lo necesitan, promoviendo la transparencia, la
              participación comunitaria y la autogestión para la sostenibilidad
              de nuestros proyectos. Juntos, construimos un futuro más saludable
              y solidario para todos.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/contacto">
                <button className="py-2 rounded-sm bg-[#005d90] hover:bg-[#35a1da] transition duration-150">Contacto</button>
              </Link>
              <Link to="/info">
                <a className="text-sm font-semibold leading-6 text-gray-900">
                  Más información <span aria-hidden="true">→</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
