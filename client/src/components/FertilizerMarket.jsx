import { useState, useEffect } from 'react';

function FertilizerMarket() {
    const [fertilizers, setFertilizers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null); // For Modal
    const [buyForm, setBuyForm] = useState({ farmerName: '', mobile: '', quantity: '' });

    useEffect(() => {
        fetch('https://farmer-helper-flame.vercel.app/api/fertilizers')
            .then(res => res.json())
            .then(data => {
                setFertilizers(data);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    }, []);

    const handleBuyClick = (item) => {
        setSelectedItem(item);
        setBuyForm({ farmerName: '', mobile: '', quantity: '' });
    };

    const handleBuySubmit = async (e) => {
        e.preventDefault();
        if (!selectedItem) return;

        const requestData = {
            ...buyForm,
            productName: selectedItem.name,
            productType: 'Fertilizer',
            quantity: Number(buyForm.quantity)
        };

        try {
            const res = await fetch('https://farmer-helper-flame.vercel.app/api/buy-requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            });
            if (res.ok) {
                alert("Purchase Request Sent Successfully!");
                setSelectedItem(null); // Close Modal
            } else {
                alert("Failed to send request.");
            }
        } catch (err) {
            console.error(err);
            alert("Network Error");
        }
    };

    if (loading) return <div className="text-center p-10">Loading fertilizers...</div>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-green-800 mb-2 text-center">Fertilizer Stock (Govt. Subsidized)</h2>
            <p className="text-center text-gray-600 mb-8">Check real-time availability of fertilizers at local depots.</p>

            {fertilizers.length === 0 ? (
                <div className="text-center bg-white p-8 rounded-xl shadow">
                    <p className="text-gray-500">No fertilizers listed yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fertilizers.map((item) => (
                        <div key={item._id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-50 hover:shadow-xl transition-shadow group">
                            <div className="h-48 overflow-hidden bg-gray-200 relative">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Fertilizer' }}
                                />
                                {!item.availability && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <span className="bg-red-600 text-white px-3 py-1 rounded-full font-bold">Out of Stock</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                                    <div className="text-right">
                                        <div className="bg-orange-100 text-orange-800 text-sm font-bold px-2 py-1 rounded">₹{item.price}</div>
                                        <div className="text-xs text-gray-500 mt-1">per {item.weight}</div>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className={`text-sm font-medium ${item.availability ? 'text-green-600' : 'text-red-500'}`}>
                                        {item.availability ? '● Available Now' : '● Out of Stock'}
                                    </span>
                                    <button
                                        onClick={() => handleBuyClick(item)}
                                        disabled={!item.availability}
                                        className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-bold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Buy Request Modal */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fade-in">
                        <h3 className="text-2xl font-bold text-green-900 mb-4">Buy {selectedItem.name}</h3>
                        <form onSubmit={handleBuySubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700">Your Name</label>
                                <input
                                    required
                                    className="w-full border p-2 rounded-lg"
                                    value={buyForm.farmerName}
                                    onChange={e => setBuyForm({ ...buyForm, farmerName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700">Mobile Number</label>
                                <input
                                    required
                                    className="w-full border p-2 rounded-lg"
                                    value={buyForm.mobile}
                                    onChange={e => setBuyForm({ ...buyForm, mobile: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700">Quantity (units/bags)</label>
                                <input
                                    type="number"
                                    required
                                    className="w-full border p-2 rounded-lg"
                                    value={buyForm.quantity}
                                    onChange={e => setBuyForm({ ...buyForm, quantity: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-4 mt-6">
                                <button type="button" onClick={() => setSelectedItem(null)} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-300">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 bg-green-700 text-white py-3 rounded-xl font-bold hover:bg-green-800">
                                    Send Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FertilizerMarket;
