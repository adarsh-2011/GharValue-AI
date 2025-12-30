import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PredictionForm = () => {
    const [locations, setLocations] = useState([]);
    const [sqft, setSqft] = useState(1000);
    const [bhk, setBhk] = useState(2);
    const [bath, setBath] = useState(2);
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/get_location_names')
            .then(response => {
                setLocations(response.data.locations);
                if (response.data.locations.length > 0) {
                    setLocation(response.data.locations[0]);
                }
            })
            .catch(err => console.error("backend error", err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setPrice(null);

        axios.post('http://127.0.0.1:5000/predict', {
            total_sqft: sqft,
            bhk: bhk,
            bath: bath,
            location: location
        })
            .then(response => {
                setPrice(response.data.estimated_price);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    return (
        <div className="w-full max-w-lg bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/50">
            <div className="p-6 md:p-8 space-y-5">

                {/* Result Header if Price exists */}
                {price !== null ? (
                    <div className="text-center animate-fade-in-down mb-2">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Estimated Value</p>
                        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            ₹ {price.toFixed(2)} <span className="text-2xl text-gray-600">Lakhs</span>
                        </h2>
                    </div>
                ) : (
                    <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Details</h2>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Area Slider */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Area (Sq. Ft)</label>
                            <span className="text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded text-sm">{sqft}</span>
                        </div>
                        <input
                            type="range"
                            min="300" max="5000" step="50"
                            value={sqft}
                            onChange={(e) => { setSqft(e.target.value); setPrice(null); }}
                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all"
                        />
                    </div>

                    {/* Row: BHK & Bath */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bedroom (BHK)</label>
                            <div className="relative">
                                <select
                                    value={bhk}
                                    onChange={(e) => { setBhk(e.target.value); setPrice(null); }}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm font-semibold rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 appearance-none"
                                >
                                    {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} BHK</option>)}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bathroom</label>
                            <div className="relative">
                                <select
                                    value={bath}
                                    onChange={(e) => { setBath(e.target.value); setPrice(null); }}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm font-semibold rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 appearance-none"
                                >
                                    {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} Bath</option>)}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location</label>
                        <div className="relative">
                            <select
                                value={location}
                                onChange={(e) => { setLocation(e.target.value); setPrice(null); }}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm font-semibold rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 appearance-none capitalize"
                            >
                                {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3.5 rounded-xl text-white font-bold tracking-wide transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-indigo-500/30'}`}
                    >
                        {loading ? "Calculating..." : "PREDICT PRICE"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PredictionForm;
