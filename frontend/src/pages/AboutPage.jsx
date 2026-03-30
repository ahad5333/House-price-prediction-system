import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">About HousePrice AI</h1>
          <p className="text-xl text-slate-600">
            Empowering real estate decisions with artificial intelligence
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Project Overview */}
          <section className="glass p-8">
            <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              HousePrice AI is a comprehensive machine learning system designed to predict house prices using 
              advanced algorithms and real estate data. Our goal is to provide accurate, instant price estimates 
              that empower buyers, sellers, and real estate professionals in making informed decisions.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Built with a focus on accuracy, performance, and user experience, our system combines state-of-the-art 
              machine learning techniques with a beautiful, intuitive interface.
            </p>
          </section>

          {/* Technical Stack */}
          <section className="glass p-8">
            <h2 className="text-2xl font-bold mb-6">Technical Stack</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4 text-blue-600">Backend</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>🐍 <strong>Python</strong> - Core language</li>
                  <li>⚡ <strong>FastAPI</strong> - Web framework</li>
                  <li>🤖 <strong>Scikit-learn</strong> - Machine learning</li>
                  <li>📊 <strong>Pandas & NumPy</strong> - Data processing</li>
                  <li>💾 <strong>Joblib</strong> - Model serialization</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4 text-purple-600">Frontend</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>⚛️ <strong>React 18</strong> - UI framework</li>
                  <li>🎨 <strong>Tailwind CSS</strong> - Styling</li>
                  <li>⚡ <strong>Vite</strong> - Build tool</li>
                  <li>🌐 <strong>Axios</strong> - HTTP client</li>
                  <li>📈 <strong>Chart.js</strong> - Visualization</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Model Details */}
          <section className="glass p-8">
            <h2 className="text-2xl font-bold mb-6">Machine Learning Model</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">Algorithm</h3>
                <p className="text-slate-700">
                  <strong>Random Forest Regressor</strong> - An ensemble learning method that combines multiple 
                  decision trees for robust predictions with excellent generalization.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Features Used</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-600"><strong>Geographic:</strong> Longitude, Latitude</p>
                  </div>
                  <div>
                    <p className="text-slate-600"><strong>Property:</strong> Age, Rooms, Bedrooms</p>
                  </div>
                  <div>
                    <p className="text-slate-600"><strong>Demographics:</strong> Population, Households</p>
                  </div>
                  <div>
                    <p className="text-slate-600"><strong>Economic:</strong> Median Income</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Performance Metrics</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>📊 <strong>R² Score:</strong> 0.85 (explains 85% of variance)</li>
                  <li>📈 <strong>RMSE:</strong> ~$70,000 average prediction error</li>
                  <li>👍 <strong>MAE:</strong> ~$50,000 mean absolute error</li>
                  <li>🎯 <strong>CV Score:</strong> Consistent across 5-fold cross-validation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Dataset Information */}
          <section className="glass p-8">
            <h2 className="text-2xl font-bold mb-6">Dataset</h2>
            
            <div className="space-y-4">
              <p className="text-slate-700">
                <strong>California Housing Dataset (1990)</strong>
              </p>
              <ul className="space-y-2 text-slate-700">
                <li>📍 <strong>Location:</strong> California, USA</li>
                <li>📊 <strong>Size:</strong> 20,640 house blocks</li>
                <li>📅 <strong>Year:</strong> 1990 Census Data</li>
                <li>💰 <strong>Target:</strong> Median house value (in hundreds of thousands)</li>
                <li>✨ <strong>Completeness:</strong> 99%+ coverage after preprocessing</li>
              </ul>
            </div>
          </section>

          {/* Features Section */}
          <section className="glass p-8">
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="text-3xl">⚡</div>
                <div>
                  <h3 className="font-bold mb-2">Real-time Predictions</h3>
                  <p className="text-slate-600">Get instant price estimates in milliseconds</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">📊</div>
                <div>
                  <h3 className="font-bold mb-2">Batch Processing</h3>
                  <p className="text-slate-600">Predict prices for multiple properties at once</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">🔒</div>
                <div>
                  <h3 className="font-bold mb-2">Privacy Protected</h3>
                  <p className="text-slate-600">Your data is never stored or shared</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">🔌</div>
                <div>
                  <h3 className="font-bold mb-2">REST API</h3>
                  <p className="text-slate-600">Easy integration with your applications</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">📈</div>
                <div>
                  <h3 className="font-bold mb-2">Performance Metrics</h3>
                  <p className="text-slate-600">View detailed model insights and statistics</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl">🎨</div>
                <div>
                  <h3 className="font-bold mb-2">Modern UI</h3>
                  <p className="text-slate-600">Beautiful, responsive design for all devices</p>
                </div>
              </div>
            </div>
          </section>

          {/* API Documentation Link */}
          <section className="glass p-8 bg-gradient-to-br from-blue-50 to-purple-50">
            <h2 className="text-2xl font-bold mb-4">API Documentation</h2>
            <p className="text-slate-700 mb-4">
              Developers can integrate HousePrice AI into their applications using our REST API.
            </p>
            <a 
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              View API Documentation →
            </a>
          </section>

          {/* Contact Section */}
          <section className="glass p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Questions?</h2>
            <p className="text-slate-700 mb-6">
              Have questions or feedback? We'd love to hear from you!
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              Contact Us
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
