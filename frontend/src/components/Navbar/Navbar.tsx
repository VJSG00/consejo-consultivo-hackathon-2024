// Navbar.jsx
export default function Navbar() {
  return (
    <nav className="navbar flex items-center justify-between bg-white border-b backdrop-blur-lg bg-opacity-80 px-6 py-3 shadow-md">
      <div className="navbar-brand flex items-center">
        {/* <img className="block h-12 w-auto" src="https://www.svgrepo.com/show/419882/healthcare-hospital-medical-2.svg" alt="Logo" /> */}
        <span className="text-xl font-semibold text-gray-800">MyApp</span>
      </div>
      <div className="navbar-actions flex items-center space-x-8">
        <a className="navbar-link text-gray-700 hover:text-indigo-700 text-sm font-medium" href="#">Login</a>
        <a className="navbar-button text-white bg-blue-600 hover:bg-blue-700 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-all duration-500" href="#">Sign up</a>
      </div>
    </nav>
  );
}
