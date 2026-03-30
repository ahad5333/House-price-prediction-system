import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              🚀 AI-Powered Real Estate
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Predict House Prices with AI
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Advanced machine learning model trained on thousands of properties to predict exact house values in seconds
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="/predict" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              Start Predicting →
            </a>
            <a href="/dashboard" className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all">
              View Model Metrics
            </a>
          </div>

          <img 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect x='50' y='150' width='80' height='120' fill='%230284c7' opacity='0.7'/%3E%3Crect x='160' y='100' width='80' height='170' fill='%230284c7'/%3E%3Crect x='270' y='120' width='80' height='150' fill='%230284c7' opacity='0.8'/%3E%3C/svg%3E"
            alt="Houses"
            className="w-64 h-48 mx-auto rounded-lg shadow-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Why Choose HousePrice AI?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'High Accuracy',
                description: 'Our model achieves 85% accuracy using advanced machine learning algorithms'
              },
              {
                icon: '⚡',
                title: 'Instant Results',
                description: 'Get price predictions in seconds with our optimized neural network'
              },
              {
                icon: '📊',
                title: 'Data-Driven',
                description: 'Based on real estate data from thousands of properties and market trends'
              },
              {
                icon: '🔒',
                title: 'Privacy First',
                description: 'Your data is secure and never stored on our servers'
              },
              {
                icon: '💰',
                title: 'Free to Use',
                description: 'Unlimited predictions with no hidden costs or premium plans'
              },
              {
                icon: '🔧',
                title: 'Easy Integration',
                description: 'REST API available for seamless integration with your applications'
              }
            ].map((feature, index) => (
              <div key={index} className="glass p-8 card-hover">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Enter Details',
                content: 'Input property information like location, size, and age'
              },
              {
                step: '2',
                title: 'Process Data',
                content: 'Our AI processes and normalizes your input data'
              },
              {
                step: '3',
                title: 'Predict',
                content: 'Machine learning model generates accurate price prediction'
              },
              {
                step: '4',
                title: 'Get Results',
                content: 'Receive instant price estimation with confidence metrics'
              }
            ].map((item, index) => (
              <div key={index} className="glass p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">{item.step}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '20K+', label: 'Properties Analyzed' },
              { number: '85%', label: 'Model Accuracy' },
              { number: '0.1s', label: 'Average Response Time' },
              { number: '24/7', label: 'Service Availability' }
            ].map((stat, index) => (
              <div key={index} className="glass p-8 text-center">
                <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <p className="text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Predict?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get started with HousePrice AI in just a few clicks
          </p>
          <a 
            href="/predict"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:shadow-xl transition-all"
          >
            Start Predicting Now →
          </a>
        </div>
      </section>
    </div>
  );
}
