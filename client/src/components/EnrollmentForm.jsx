import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EnrollmentForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: '',
        landSize: '',
        mainCrop: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dbUrl = 'https://farmer-helper-flame.vercel.app/api/farmers';
            // Fallback for demo if backend not fully ready or blocked

            const res = await fetch(dbUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error('Failed to enroll');

            navigate('/farmers'); // Go to list view
        } catch (err) {
            console.error(err);
            setError('Error submitting form. Ensure server is running.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-green-100">
            <h2 className="text-3xl font-bold text-green-800 mb-6">Farmer Enrollment</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                    <input
                        type="text" name="name" required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                    <input
                        type="tel" name="phone" required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Location</label>
                    <input
                        type="text" name="location" required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        onChange={handleChange}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Land Size (Acres)</label>
                        <input
                            type="number" name="landSize" required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Main Crop</label>
                        <input
                            type="text" name="mainCrop" required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors mt-4">
                    Enroll Farmer
                </button>
            </form>
        </div>
    );
}

export default EnrollmentForm;
