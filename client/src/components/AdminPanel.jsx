import { useState, useEffect } from 'react';
import API_BASE_URL from '../config';

function AdminPanel() {
    const [activeTab, setActiveTab] = useState('seeds'); // 'seeds', 'fertilizers', 'sales', 'requests', 'complaints'

    const [seeds, setSeeds] = useState([]);
    const [fertilizers, setFertilizers] = useState([]);
    // New Data States
    const [sales, setSales] = useState([]);
    const [requests, setRequests] = useState([]);
    const [complaints, setComplaints] = useState([]);

    const [seedForm, setSeedForm] = useState({ name: '', description: '', imageUrl: '', price: '', availability: true });
    const [fertForm, setFertForm] = useState({ name: '', description: '', imageUrl: '', price: '', weight: '', availability: true });

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchSeeds();
        fetchFertilizers();
        fetchSales();
        fetchRequests();
        fetchComplaints();
    }, []);

    // API Calls
    const fetchSeeds = () => fetch(`${API_BASE_URL}/api/seeds`).then(res => res.json()).then(setSeeds);
    const fetchFertilizers = () => fetch(`${API_BASE_URL}/api/fertilizers`).then(res => res.json()).then(setFertilizers);
    const fetchSales = () => fetch(`${API_BASE_URL}/api/sales`).then(res => res.json()).then(setSales);
    const fetchRequests = () => fetch(`${API_BASE_URL}/api/buy-requests`).then(res => res.json()).then(setRequests);
    const fetchComplaints = () => fetch(`${API_BASE_URL}/api/complaints`).then(res => res.json()).then(setComplaints);

    const handleSeedChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setSeedForm({ ...seedForm, [e.target.name]: value });
    };

    const handleFertChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFertForm({ ...fertForm, [e.target.name]: value });
    };

    const submitSeed = async (e) => {
        e.preventDefault();
        await fetch(`${API_BASE_URL}/api/seeds`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(seedForm)
        });
        setSeedForm({ name: '', description: '', imageUrl: '', price: '', availability: true });
        setShowForm(false);
        fetchSeeds();
    };

    const submitFertilizer = async (e) => {
        e.preventDefault();
        await fetch(`${API_BASE_URL}/api/fertilizers`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fertForm)
        });
        setFertForm({ name: '', description: '', imageUrl: '', price: '', weight: '', availability: true });
        setShowForm(false);
        fetchFertilizers();
    };

    const toggleStatus = async (type, id, currentStatus) => {
        const endpoint = type === 'seed' ? `seeds/${id}` : `fertilizers/${id}`;
        await fetch(`${API_BASE_URL}/api/${endpoint}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ availability: !currentStatus })
        });
        type === 'seed' ? fetchSeeds() : fetchFertilizers();
    };

    // Helper for Tab Buttons
    const TabButton = ({ name, label, color }) => (
        <button
            onClick={() => setActiveTab(name)}
            className={`px-4 py-1 rounded-md font-medium transition-all ${activeTab === name ? `bg-white shadow text-${color}-700` : 'text-gray-600'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold text-gray-800">🏛️ Staff Portal</h2>
                <div className="flex flex-wrap bg-gray-200 rounded-lg p-1 gap-1">
                    <TabButton name="seeds" label="Seeds" color="green" />
                    <TabButton name="fertilizers" label="Fertilizers" color="orange" />
                    <TabButton name="sales" label="Farmer Sales" color="blue" />
                    <TabButton name="requests" label="Buyer Requests" color="purple" />
                    <TabButton name="complaints" label="Complaints" color="red" />
                </div>
            </div>

            {/* Forms for Inventory */}
            {(activeTab === 'seeds' || activeTab === 'fertilizers') && (
                <button
                    onClick={() => setShowForm(!showForm)}
                    className={`w-full mb-6 py-3 rounded-xl font-bold text-white shadow-lg transition-transform hover:scale-[1.01] ${activeTab === 'seeds' ? 'bg-green-600' : 'bg-orange-600'}`}
                >
                    {showForm ? 'Close Form' : `+ Add New ${activeTab === 'seeds' ? 'Seed' : 'Fertilizer'}`}
                </button>
            )}

            {showForm && activeTab === 'seeds' && (
                <form onSubmit={submitSeed} className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 mb-8 space-y-4">
                    <h3 className="tex-xl font-bold text-green-800">Add Seed</h3>
                    <input name="name" value={seedForm.name} onChange={handleSeedChange} className="w-full border p-2 rounded" placeholder="Seed Name" required />
                    <input name="imageUrl" value={seedForm.imageUrl} onChange={handleSeedChange} className="w-full border p-2 rounded" placeholder="Image URL" required />
                    <textarea name="description" value={seedForm.description} onChange={handleSeedChange} className="w-full border p-2 rounded" placeholder="Description" />
                    <div className="flex gap-4">
                        <input type="number" name="price" value={seedForm.price} onChange={handleSeedChange} className="w-full border p-2 rounded" placeholder="Price (₹/kg)" required />
                        <label className="flex items-center gap-2"><input type="checkbox" name="availability" checked={seedForm.availability} onChange={handleSeedChange} /> Available</label>
                    </div>
                    <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded font-bold">Save Seed</button>
                </form>
            )}

            {showForm && activeTab === 'fertilizers' && (
                <form onSubmit={submitFertilizer} className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100 mb-8 space-y-4">
                    <h3 className="tex-xl font-bold text-orange-800">Add Fertilizer</h3>
                    <input name="name" value={fertForm.name} onChange={handleFertChange} className="w-full border p-2 rounded" placeholder="Fertilizer Name (e.g. Urea)" required />
                    <input name="imageUrl" value={fertForm.imageUrl} onChange={handleFertChange} className="w-full border p-2 rounded" placeholder="Image URL" required />
                    <textarea name="description" value={fertForm.description} onChange={handleFertChange} className="w-full border p-2 rounded" placeholder="Usage details..." />
                    <div className="flex gap-4">
                        <input type="number" name="price" value={fertForm.price} onChange={handleFertChange} className="w-full border p-2 rounded" placeholder="Price (₹)" required />
                        <input name="weight" value={fertForm.weight} onChange={handleFertChange} className="w-full border p-2 rounded" placeholder="Weight (e.g. 50kg)" required />
                    </div>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2"><input type="checkbox" name="availability" checked={fertForm.availability} onChange={handleFertChange} /> Available</label>
                    </div>
                    <button type="submit" className="bg-orange-600 text-white px-6 py-2 rounded font-bold">Save Fertilizer</button>
                </form>
            )}

            <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            {(activeTab === 'seeds' || activeTab === 'fertilizers') && (
                                <>
                                    <th className="p-4 font-semibold">Name</th>
                                    <th className="p-4 font-semibold">Details</th>
                                    <th className="p-4 font-semibold">Status</th>
                                    <th className="p-4 font-semibold">Action</th>
                                </>
                            )}
                            {activeTab === 'sales' && (
                                <>
                                    <th className="p-4 font-semibold">Farmer Name</th>
                                    <th className="p-4 font-semibold">Crop / Qty</th>
                                    <th className="p-4 font-semibold">Price Expected</th>
                                    <th className="p-4 font-semibold">Contact / Status</th>
                                </>
                            )}
                            {activeTab === 'requests' && (
                                <>
                                    <th className="p-4 font-semibold">Buyer Name</th>
                                    <th className="p-4 font-semibold">Item Requested</th>
                                    <th className="p-4 font-semibold">Qty</th>
                                    <th className="p-4 font-semibold">Contact</th>
                                </>
                            )}
                            {activeTab === 'complaints' && (
                                <>
                                    <th className="p-4 font-semibold">Name</th>
                                    <th className="p-4 font-semibold">Issue</th>
                                    <th className="p-4 font-semibold">Department</th>
                                    <th className="p-4 font-semibold">Contact</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {/* INVENTORY LIST */}
                        {(activeTab === 'seeds' || activeTab === 'fertilizers') && (activeTab === 'seeds' ? seeds : fertilizers).map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img src={item.imageUrl} className="w-10 h-10 rounded object-cover bg-gray-200" alt="" />
                                        <span className="font-medium text-gray-800">{item.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-gray-600">
                                    ₹{item.price} {item.weight ? `per ${item.weight}` : '/kg'}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${item.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {item.availability ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={() => toggleStatus(activeTab === 'seeds' ? 'seed' : 'fertilizer', item._id, item.availability)}
                                        className="text-blue-600 hover:underline text-sm font-medium"
                                    >
                                        Toggle
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {/* SALES LIST */}
                        {activeTab === 'sales' && sales.map((sale) => (
                            <tr key={sale._id} className="hover:bg-blue-50">
                                <td className="p-4 font-bold text-gray-800">{sale.name}</td>
                                <td className="p-4 text-gray-600">{sale.seedType} <span className="text-xs bg-blue-100 text-blue-800 px-2 rounded-full">{sale.quantity}kg</span></td>
                                <td className="p-4 font-mono text-green-700">₹{sale.price}/kg</td>
                                <td className="p-4 text-sm">
                                    <div>📞 {sale.mobile}</div>
                                    <div className="text-xs text-gray-400">{sale.address}</div>
                                </td>
                            </tr>
                        ))}

                        {/* BUYER REQUESTS LIST */}
                        {activeTab === 'requests' && requests.map((req) => (
                            <tr key={req._id} className="hover:bg-purple-50">
                                <td className="p-4 font-bold text-gray-800">{req.farmerName}</td>
                                <td className="p-4">
                                    {req.productName}
                                    <span className="ml-2 text-xs uppercase font-bold tracking-wider text-gray-400">{req.productType}</span>
                                </td>
                                <td className="p-4 font-bold text-purple-700">{req.quantity} units</td>
                                <td className="p-4 text-sm">📞 {req.mobile}</td>
                            </tr>
                        ))}

                        {/* COMPLAINTS LIST */}
                        {activeTab === 'complaints' && complaints.map((comp) => (
                            <tr key={comp._id} className="hover:bg-red-50">
                                <td className="p-4 font-bold text-gray-800">{comp.name}</td>
                                <td className="p-4 text-sm text-gray-600 max-w-xs truncate" title={comp.details}>{comp.details}</td>
                                <td className="p-4 text-sm">
                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">{comp.department}</span>
                                </td>
                                <td className="p-4 text-sm">📞 {comp.mobile}</td>
                            </tr>
                        ))}

                        {/* EMPTY STATES */}
                        {activeTab === 'seeds' && seeds.length === 0 && <tr><td colSpan="4" className="p-8 text-center text-gray-400">No seeds.</td></tr>}
                        {activeTab === 'fertilizers' && fertilizers.length === 0 && <tr><td colSpan="4" className="p-8 text-center text-gray-400">No fertilizers.</td></tr>}
                        {activeTab === 'sales' && sales.length === 0 && <tr><td colSpan="4" className="p-8 text-center text-gray-400">No sales requests.</td></tr>}
                        {activeTab === 'requests' && requests.length === 0 && <tr><td colSpan="4" className="p-8 text-center text-gray-400">No buyer requests.</td></tr>}
                        {activeTab === 'complaints' && complaints.length === 0 && <tr><td colSpan="4" className="p-8 text-center text-gray-400">No complaints.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminPanel;
