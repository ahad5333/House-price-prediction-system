import React from 'react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">🏠</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            HousePrice AI
          </h1>
        </div>
        
        <nav className="hidden md:flex gap-8">
          <a href="/" className="hover:text-blue-600 font-medium">Home</a>
          <a href="/predict" className="hover:text-blue-600 font-medium">Predict</a>
          <a href="/dashboard" className="hover:text-blue-600 font-medium">Dashboard</a>
          <a href="/about" className="hover:text-blue-600 font-medium">About</a>
        </nav>

        <button className="hidden md:block px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg">
          Get Started
        </button>
      </div>
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="border-t border-white/20 bg-white/50 backdrop-blur-md mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">HousePrice AI</h3>
            <p className="text-sm text-slate-600">Advanced ML-powered house price prediction system</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="text-sm space-y-1 text-slate-600">
              <li><a href="/predict" className="hover:text-blue-600">Predict</a></li>
              <li><a href="/dashboard" className="hover:text-blue-600">Dashboard</a></li>
              <li><a href="#" className="hover:text-blue-600">API Docs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="text-sm space-y-1 text-slate-600">
              <li><a href="/about" className="hover:text-blue-600">About</a></li>
              <li><a href="#" className="hover:text-blue-600">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-600">GitHub</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="text-sm space-y-1 text-slate-600">
              <li><a href="#" className="hover:text-blue-600">Privacy</a></li>
              <li><a href="#" className="hover:text-blue-600">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center text-sm text-slate-600">
          <p>&copy; 2024 HousePrice AI. Built with React, FastAPI & TailwindCSS</p>
        </div>
      </div>
    </footer>
  );
};

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
};

export const ErrorAlert = ({ message, onClose }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex justify-between items-start animate-slideUp">
      <div>
        <h3 className="font-semibold text-red-900">Error</h3>
        <p className="text-red-700 text-sm mt-1">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-red-700 hover:text-red-900">✕</button>
      )}
    </div>
  );
};

export const SuccessAlert = ({ message, onClose }) => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex justify-between items-start animate-slideUp">
      <div>
        <h3 className="font-semibold text-green-900">Success</h3>
        <p className="text-green-700 text-sm mt-1">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-green-700 hover:text-green-900">✕</button>
      )}
    </div>
  );
};
