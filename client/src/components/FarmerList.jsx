import { useState, useEffect } from 'react';

function FarmerList() {
    const [farmers, setFarmers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://farmer-helper-flame.vercel.app/api/farmers')
            .then(res => res.json())
            .then(data => {
                setFarmers(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-green-100 min-h-[50vh]">
            <h2 className="text-3xl font-bold text-green-800 mb-6">Enrolled Farmers</h2>

            {farmers.length === 0 ? (
                <p className="text-gray-500 text-center">No farmers enrolled yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-green-50">
                                <th className="p-3 text-green-800 font-semibold border-b">Name</th>
                                <th className="p-3 text-green-800 font-semibold border-b">Location</th>
                                <th className="p-3 text-green-800 font-semibold border-b">Main Crop</th>
                                <th className="p-3 text-green-800 font-semibold border-b">Land Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {farmers.map((farmer) => (
                                <tr key={farmer._id} className="hover:bg-gray-50">
                                    <td className="p-3 border-b text-gray-700">{farmer.name}</td>
                                    <td className="p-3 border-b text-gray-600">{farmer.location}</td>
                                    <td className="p-3 border-b text-gray-600">{farmer.mainCrop}</td>
                                    <td className="p-3 border-b text-gray-600">{farmer.landSize} Acres</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default FarmerList;
