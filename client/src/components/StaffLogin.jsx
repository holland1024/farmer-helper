import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StaffLogin({ setIsAuthenticated }) {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Hardcoded demo credentials
        if (credentials.username === 'gov_staff' && credentials.password === 'secure123') {
            setIsAuthenticated(true);
            navigate('/admin');
        } else {
            setError('Invalid ID or Password. Authorization Failed.');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-2xl w-full max-w-md border-t-8 border-green-700">
                <div className="text-center mb-8">
                    <span className="text-5xl block mb-4">🏛️</span>
                    <h2 className="text-2xl font-bold text-gray-800">Government Staff Login</h2>
                    <p className="text-gray-500 text-sm mt-2">Restricted Access Portal</p>
                </div>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Staff ID</label>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-colors"
                            placeholder="e.g. gov_staff"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-colors"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-800 text-white font-bold py-3 rounded-lg hover:bg-green-900 transition-colors shadow-lg"
                    >
                        Authenticate Access
                    </button>
                </form>

                <div className="mt-8 text-center text-xs text-gray-400">
                    Unauthorized access is prohibited and monitored.
                </div>
            </div>
        </div>
    );
}

export default StaffLogin;
