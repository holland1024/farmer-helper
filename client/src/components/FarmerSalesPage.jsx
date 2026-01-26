import { useState } from 'react';
import { useForm } from 'react-hook-form';

function FarmerSalesPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = async (data) => {
        console.log("Farmer Sale Data:", data);
        try {
            const response = await fetch('http://localhost:5000/api/sales', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                alert("Failed to submit. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting sale:", error);
            alert("Network error. Please try again.");
        }
    };

    if (submitted) {
        return (
            <div className="max-w-xl mx-auto p-10 mt-10 text-center bg-white rounded-2xl shadow-xl border border-green-100">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                    ✓
                </div>
                <h2 className="text-3xl font-bold text-green-800 mb-4">Request Sent!</h2>
                <p className="text-gray-600 mb-8">
                    Your request to sell seeds to the government has been recorded. An officer will contact you within 24 hours.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition"
                >
                    Submit Another Request
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-green-900 mb-2">Sell Seeds to Government</h1>
            <p className="text-gray-600 mb-8">Govt. offers fair MSP prices for high-quality certified seeds.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-lg border border-green-50 space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Farmer Name</label>
                        <input
                            {...register("name", { required: true })}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="Your Name"
                        />
                        {errors.name && <span className="text-red-500 text-xs">Name is required</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
                        <input
                            type="tel"
                            {...register("mobile", { required: true, pattern: /^[0-9]{10}$/ })}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="10-digit Mobile"
                        />
                        {errors.mobile && <span className="text-red-500 text-xs">Valid mobile required</span>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Seed Variety</label>
                    <select {...register("seedType", { required: true })} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                        <option value="">Select Seed Type</option>
                        <option value="Rice (Paddy)">Rice (Paddy)</option>
                        <option value="Wheat">Wheat</option>
                        <option value="Maize">Maize</option>
                        <option value="Groundnut">Groundnut</option>
                        <option value="Pulses">Pulses (Dal)</option>
                    </select>
                    {errors.seedType && <span className="text-red-500 text-xs">Please select a seed type</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Quantity (kg)</label>
                        <input
                            type="number"
                            {...register("quantity", { required: true, min: 1 })}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="e.g 100"
                        />
                        {errors.quantity && <span className="text-red-500 text-xs">Valid Qty required</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Expected Price (₹/kg)</label>
                        <input
                            type="number"
                            {...register("price", { required: true })}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="e.g 40"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Address / Village</label>
                    <textarea
                        {...register("address", { required: true })}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none h-24"
                        placeholder="Your full address..."
                    ></textarea>
                    {errors.address && <span className="text-red-500 text-xs">Address is required</span>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-800 transform active:scale-95 transition-all shadow-lg shadow-green-200"
                >
                    Submit Sale Request
                </button>
            </form>
        </div>
    );
}

export default FarmerSalesPage;
