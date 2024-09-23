import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="lg:pt-20 pt-0 lg:pl-8 h-full">
      <div className="rounded-2xl bg-white py-10 overflow-hidden m-5 lg:m-0 2xl:py-16 xl:py-8 lg:rounded-tl-2xl lg:rounded-bl-2xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
            
            <div className="w-full xl:col-span-5 lg:col-span-6 2xl:-mx-5 xl:-mx-0">
              <div className="flex items-center text-sm font-medium text-gray-500 justify-center lg:justify-start">
                <span className="bg-blue-600 py-1 px-3 rounded-2xl text-xs font-medium text-white mr-3">#1</span>
                Investment app
              </div>
              <h1 className="py-8 text-center text-gray-900 font-bold font-manrope text-5xl lg:text-left leading-[70px]">
                The new standard for <span className="text-blue-600">Modern investor</span>
              </h1>
              <p className="text-gray-500 text-lg text-center lg:text-left">
                When you’re ready to invest, quickly execute your orders with Complex and outdated.
              </p>
              

              {/* TODO: acomodar la altura del input cuando la pantalla es muy pequeña*/}
              <div className="relative p-1.5 my-10 flex items-center gap-y-4 h-auto md:h-16 flex-col md:flex-row justify-between rounded-full md:shadow-[0px 15px 30px -4px rgba(16, 24, 40, 0.03)] border border-transparent md:bg-white transition-all duration-500 hover:border-blue-600 focus-within:border-blue-600">
                <input
                  type="text"
                  name="email"
                  placeholder="Enter email to get started"
                  className="text-base rounded-full text-gray-900 flex-1 py-4 px-6 shadow-[0px 15px 30px -4px rgba(16, 24, 40, 0.03)] md:shadow-none bg-white md:bg-transparent shadow-none placeholder:text-gray-400 focus:outline-none md:w-fit w-full"
                />
                <button className="bg-blue-600 rounded-full py-3 px-7 text-base font-semibold text-white hover:bg-blue-700 cursor-pointer transition-all duration-500 md:w-fit w-full">
                  Get Started
                </button>
              </div>

            </div>
            

            <div className="w-full xl:col-span-7 lg:col-span-6 flex justify-center items-center">
              <div className="w-full lg:w-[60.8125rem] xl:ml-16 h-64 lg:h-80">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/Sagg08DrO5U?autoplay=0&mute=0&controls=0"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-2xl"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;