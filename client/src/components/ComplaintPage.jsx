import { useState } from 'react';
import { useForm } from 'react-hook-form';

function ComplaintPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [status, setStatus] = useState(null); // 'success', 'loading', null

    const onSubmit = async (data) => {
        setStatus('loading');
        try {
            const response = await fetch('http://localhost:5000/api/complaints', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Complaint Registered:", result);
                setStatus('success');
            } else {
                alert("Failed to register complaint.");
                setStatus(null);
            }
        } catch (error) {
            console.error("Error:", error);
            setStatus(null);
            alert("Network error.");
        }
    };

    if (status === 'success') {
        return (
            <div className="max-w-xl mx-auto p-10 mt-10 text-center bg-white rounded-2xl shadow-xl border border-red-100">
                <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                    📢
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Complaint Registered</h2>
                <p className="text-gray-600 mb-8">
                    Your grievance details have been forwarded to the local Agriculture Officer. Reference ID: <span className="font-mono font-bold">CMP-{Math.floor(Math.random() * 10000)}</span>.
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => setStatus(null)}
                        className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-300 transition"
                    >
                        Close
                    </button>
                    <a href="tel:18001801551" className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition flex items-center gap-2">
                        <span>📞</span> Call Helpline
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-red-900 mb-2">Lodge a Complaint</h1>
            <p className="text-gray-600 mb-8">Report issues related to seeds, fertilizers, or water supply directly.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-lg border border-red-50 space-y-6 relative overflow-hidden">
                {status === 'loading' && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                        <input
                            {...register("name", { required: true })}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="Your Name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Mobile</label>
                        <input
                            {...register("mobile", { required: true, pattern: /^\d{10}$/ })}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="10-digit Mobile"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Department</label>
                    <select {...register("department")} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none">
                        <option>Seed Quality Issue</option>
                        <option>Fertilizer Shortage</option>
                        <option>Irrigation / Water</option>
                        <option>Loan / Subsidy Issue</option>
                        <option>Other / Crop Damage</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Complaint Details</label>
                    <textarea
                        {...register("details", { required: true })}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-500 outline-none h-32"
                        placeholder="Please describe your issue in detail..."
                    ></textarea>
                    {errors.details && <span className="text-red-500 text-xs">Details are required</span>}
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg text-sm text-yellow-800 border border-yellow-200">
                    ℹ️ For immediate assistance, you can also call the Kisan Call Center at <strong>1800-180-1551</strong>.
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transform active:scale-95 transition-all shadow-lg shadow-red-200"
                >
                    Submit Complaint
                </button>
            </form>
        </div>
    );
}

export default ComplaintPage;
