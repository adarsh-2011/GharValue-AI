import React from 'react';

const ResultCard = ({ price }) => {
    if (price === null) return null;

    return (
        <div className="mt-8 max-w-lg mx-auto bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl shadow-2xl p-1 text-white transform transition-all animate-fade-in-up">
            <div className="bg-white rounded-xl p-6 text-center text-gray-800">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Estimated Price</p>
                <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-800">
                    ₹ {price.toFixed(2)} Lakhs
                </h3>
                <p className="mt-4 text-xs text-gray-400">
                    * This is an AI estimate. Actual prices may vary.
                </p>
            </div>
        </div>
    );
};

export default ResultCard;
