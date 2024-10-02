import { Outlet } from 'react-router-dom'
import Header from '../components/HeaderTest'
import FooterFlowbite from '../components/Footer'



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

        <FooterFlowbite />
      </div>



    </>

  )
}
