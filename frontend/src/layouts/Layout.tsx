import { Outlet } from 'react-router-dom'
//import SideBar from '../components/Sidebar'
import Header from '../views/VistaIniciales/components/Header'
//import Navbar from '../components/Navbar/Navbar'
// import { SideBar2 } from '../components/SideBar2'


export default function Layout() {
  return (
    <>

      <div>



          <Header />



          <div className="flex flex-col flex-1 overflow-y-auto">

            <section className='m-10 p-10'>

              <Outlet />

            </section>

          </div>
        </div>



    </>

  )
}
