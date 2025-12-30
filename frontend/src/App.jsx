import React, { useState } from 'react';
import PredictionForm from './components/PredictionForm';

function App() {
  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-indigo-900 via-slate-800 to-slate-900 -z-0 rounded-b-[3rem] shadow-2xl"></div>

      {/* Header - Compact */}
      <header className="relative z-10 pt-6 pb-2 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <h1 className="text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
            GharValue<span className="text-transparent bg-clip-text bg-gradient-to-tr from-cyan-400 to-blue-500">.ai</span>
          </h1>
        </div>
        <p className="text-sm text-blue-100 font-medium tracking-widest uppercase opacity-80">
          AI-Powered Indian House Price Prediction
        </p>
      </header>

      {/* Main Content - Centered */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        <PredictionForm />
      </main>

      {/* Footer - Fixed & Small */}
      <footer className="relative z-10 py-3 text-center text-xs text-gray-500 font-medium">
        Built by Adarsh Srivastava | NIT Patna
      </footer>
    </div>
  );
}

export default App;
