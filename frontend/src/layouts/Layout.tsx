import {Outlet} from 'react-router-dom'
import SideBar from '../components/Sidebar'
//import Navbar from '../components/Navbar/Navbar'
// import { SideBar2 } from '../components/SideBar2'


export default function Layout() {
    return (
      <>
  
          <div>

  
                  <div className="flex h-screen bg-gray-100">  
                      
                        <SideBar/>
  


                      <div className="flex flex-col flex-1 overflow-y-auto">

                      <section className='m-10 p-10 bg-white shadow-md rounded-md '>
  
                          <Outlet/>
  
                      </section>
  
                      </div>
                      </div>
  
          </div>             
      
  
      </>
    
    )
  }
