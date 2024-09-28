const Info = () => {
  return (
    <div id="Info" className="relative bg-white overflow-hidden mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100"></polygon>
          </svg>

          <div className="pt-1"></div>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h2 className="m-6 text-3xl font-extrabold text-[#26589e] sm:text-3xl md:text-4xl">
                Quiénes somos
              </h2>

              <p className="text-[#2c3e50]">
              Somos una fundación sin fines de lucro dedicada a recolectar y distribuir medicamentos y suministros médicos a pacientes con enfermedades crónicas en diversas áreas de Barquisimeto, Venezuela.
              </p>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover object-top sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://img.freepik.com/foto-gratis/equipo-medicos-especialistas-jovenes-pie-pasillo-hospital_1303-21202.jpg"
          alt="Ambulatorio"
        />
      </div>
    </div>
  );
};

export default Info;
