import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'


const AuthLayout = () => {
  return (
    <>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div
            style={{
              clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#26589e] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          >
          </div>  
        </div>

        <div className="h-full flex items-center justify-center">
          <div className="bg-white rounded-sm shadow-xl p-8 max-w-md w-full mx-auto">
            <div className="flex flex-col items-center mb-4">
              <h2 className="text-3xl font-bold text-[#2c3e50v] mb-2">Autenticación</h2>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      
      <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />      

    </>
  );
};

export default AuthLayout;