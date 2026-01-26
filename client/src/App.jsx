import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import EnrollmentForm from './components/EnrollmentForm';
import FarmerList from './components/FarmerList';
import SeedMarket from './components/SeedMarket';
import FertilizerMarket from './components/FertilizerMarket';
import AdminPanel from './components/AdminPanel';
import AIAssistant from './components/AIAssistant';
import StaffLogin from './components/StaffLogin';
import FarmerSalesPage from './components/FarmerSalesPage';
import ComplaintPage from './components/ComplaintPage';

function Home() {
  return (
    <div className="flex flex-col items-center">
      <header className="mb-12 text-center max-w-2xl px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-green-900 mb-6 tracking-tight">
          Farmer's <span className="text-green-600">Companion</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Empowering agriculture with AI-driven insights, direct government seed tracking, and smart resource management.
        </p>
      </header>

      <main className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 px-4">

        {/* Seed Card */}
        <Link to="/seeds" className="bg-white p-8 rounded-3xl shadow-lg border border-green-50 hover:shadow-2xl hover:-translate-y-1 transition-all group">
          <div className="bg-green-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
            <span className="text-2xl group-hover:text-white">🌱</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Seed Availability</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Real-time stock of government-approved seeds.
          </p>
          <div className="mt-6 font-bold text-green-600 flex items-center gap-2">
            Browse Seeds <span>→</span>
          </div>
        </Link>

        {/* Fertilizer Card */}
        <Link to="/fertilizers" className="bg-white p-8 rounded-3xl shadow-lg border border-orange-50 hover:shadow-2xl hover:-translate-y-1 transition-all group">
          <div className="bg-orange-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors">
            <span className="text-2xl group-hover:text-white">🧪</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Fertilizers</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Check stock for Urea, DAP, and other essential fertilizers.
          </p>
          <div className="mt-6 font-bold text-orange-600 flex items-center gap-2">
            Check Stock <span>→</span>
          </div>
        </Link>

        {/* AI Card */}
        <Link to="/ai-assistant" className="bg-white p-8 rounded-3xl shadow-lg border border-blue-50 hover:shadow-2xl hover:-translate-y-1 transition-all group">
          <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
            <span className="text-2xl group-hover:text-white">🤖</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">AI Assistant</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Ask our AI about crops, weather, or pest control.
          </p>
          <div className="mt-6 font-bold text-blue-600 flex items-center gap-2">
            Ask AI <span>→</span>
          </div>
        </Link>

        {/* Enrollment Card */}
        <Link to="/enroll" className="bg-white p-8 rounded-3xl shadow-lg border border-purple-50 hover:shadow-2xl hover:-translate-y-1 transition-all group">
          <div className="bg-purple-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
            <span className="text-2xl group-hover:text-white">📝</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Enrollment</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Register into the national farmer database.
          </p>
          <div className="mt-6 font-bold text-purple-600 flex items-center gap-2">
            Register <span>→</span>
          </div>
        </Link>

        {/* Sell Seeds Cards */}
        <Link to="/sell-seeds" className="bg-white p-8 rounded-3xl shadow-lg border border-lime-50 hover:shadow-2xl hover:-translate-y-1 transition-all group">
          <div className="bg-lime-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-lime-600 transition-colors">
            <span className="text-2xl group-hover:text-white">💰</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Sell to Govt</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Sell your seeds directly to the government at MSP.
          </p>
          <div className="mt-6 font-bold text-lime-600 flex items-center gap-2">
            Start Selling <span>→</span>
          </div>
        </Link>

        {/* Complaints Card */}
        <Link to="/complaints" className="bg-white p-8 rounded-3xl shadow-lg border border-red-50 hover:shadow-2xl hover:-translate-y-1 transition-all group">
          <div className="bg-red-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
            <span className="text-2xl group-hover:text-white">📢</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Complaints</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Report issues regarding seeds, fertilizers or water.
          </p>
          <div className="mt-6 font-bold text-red-600 flex items-center gap-2">
            File Complaint <span>→</span>
          </div>
        </Link>

      </main>

      <div className="bg-green-900 text-white w-full py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">For Government Staff</h3>
          <p className="mb-8 text-green-200">Manage seed inventory, fertilizers, and update availability status.</p>
          <Link to="/admin" className="bg-white text-green-900 px-8 py-3 rounded-full font-bold hover:bg-green-50 transition-colors">
            Access Staff Portal
          </Link>
        </div>
      </div>
    </div>
  );
}

function NavBar({ isAuthenticated, onLogout }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = (path) => location.pathname === path ? "bg-green-700 text-white" : "text-green-700 hover:bg-green-50";

  const NavLink = ({ to, label }) => (
    <Link
      to={to}
      onClick={() => setIsOpen(false)}
      className={`block px-4 py-2 rounded-lg font-medium transition-all ${isActive(to)}`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-sm mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-green-800 flex items-center gap-2 shrink-0">
            <span className="text-3xl">🌾</span> <span className="tracking-tight">AgriApp</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" label="Home" />
            <NavLink to="/seeds" label="Seeds" />
            <NavLink to="/sell-seeds" label="Sell" />
            <NavLink to="/fertilizers" label="Fertilizers" />
            <NavLink to="/complaints" label="Complaints" />
            <NavLink to="/ai-assistant" label="AI Help" />

            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            {isAuthenticated ? (
              <>
                <NavLink to="/admin" label="Admin" />
                <button onClick={onLogout} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 ml-2 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="px-5 py-2 bg-green-800 text-white rounded-lg font-bold hover:bg-green-900 transition-shadow shadow-md">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-green-800 hover:bg-green-50 focus:outline-none"
            >
              {isOpen ? (
                <span className="text-2xl">✕</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-green-50 px-2 pt-2 pb-6 space-y-1 shadow-lg">
          <NavLink to="/" label="Home" />
          <NavLink to="/seeds" label="Seeds" />
          <NavLink to="/sell-seeds" label="Sell Seeds" />
          <NavLink to="/fertilizers" label="Fertilizers" />
          <NavLink to="/complaints" label="Complaints" />
          <NavLink to="/ai-assistant" label="AI Assistant" />
          <div className="border-t border-gray-100 my-2"></div>
          {isAuthenticated ? (
            <>
              <NavLink to="/admin" label="Admin Portal" />
              <button
                onClick={() => { onLogout(); setIsOpen(false); }}
                className="w-full text-left px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-4 px-4 py-3 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 shadow"
            >
              Staff Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col font-sans">
      <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enroll" element={<EnrollmentForm />} />
          <Route path="/farmers" element={<FarmerList />} />
          <Route path="/seeds" element={<SeedMarket />} />
          <Route path="/sell-seeds" element={<FarmerSalesPage />} />
          <Route path="/complaints" element={<ComplaintPage />} />
          <Route path="/fertilizers" element={<FertilizerMarket />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />

          <Route path="/login" element={<StaffLogin setIsAuthenticated={setIsAuthenticated} />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <footer className="bg-white border-t border-green-100 p-8 text-center text-gray-500 text-sm mt-auto">
        &copy; 2024 Farmer's Companion App. All rights reserved.
      </footer>
    </div>
  )
}

export default App
