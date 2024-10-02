import SideBar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <>
      <div className="flex h-screen bg-gray-100">

        <SideBar />

        <div className="flex-1 overflow-y-auto px-16 py-16">
          <div className="relative bg-white rounded-lg shadow-2xl p-8">

            <Outlet />
          </div>


        </div>

      </div>

    </>
  )
}
