import React from 'react';
import { predictAPI } from '../services/api';
import { LoadingSpinner } from '../components/Layout';

export default function DashboardPage() {
  const [modelInfo, setModelInfo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadModelInfo = async () => {
      try {
        const response = await predictAPI.getModelInfo();
        setModelInfo(response.data);
      } catch (error) {
        console.error('Error loading model info:', error);
      } finally {
        setLoading(false);
      }
    };
    loadModelInfo();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Model Dashboard</h1>
          <p className="text-xl text-slate-600">
            Performance metrics and insights from our trained model
          </p>
        </div>

        {modelInfo && (
          <>
            {/* Model Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass p-6">
                <h3 className="font-semibold text-slate-700 mb-2">Model Type</h3>
                <p className="text-2xl font-bold text-blue-600">{modelInfo.model}</p>
              </div>
              <div className="glass p-6">
                <h3 className="font-semibold text-slate-700 mb-2">Version</h3>
                <p className="text-2xl font-bold text-purple-600">{modelInfo.version}</p>
              </div>
              <div className="glass p-6">
                <h3 className="font-semibold text-slate-700 mb-2">Training Date</h3>
                <p className="text-sm text-slate-600">{new Date(modelInfo.training_date).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="glass p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Performance Metrics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Training Metrics */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-4 border-b border-white/20 pb-2">Training Set</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">RMSE</span>
                      <span className="font-bold text-lg">${modelInfo.metrics.train_rmse?.toFixed(2).toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">R² Score</span>
                      <span className="font-bold text-lg">{(modelInfo.metrics.train_r2 * 100).toFixed(2)}%</span>
                    </div>
                  </div>
                </div>

                {/* Testing Metrics */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-4 border-b border-white/20 pb-2">Test Set</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">RMSE</span>
                      <span className="font-bold text-lg">${modelInfo.metrics.test_rmse?.toFixed(2).toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">R² Score</span>
                      <span className="font-bold text-lg">{(modelInfo.metrics.test_r2 * 100).toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <h3 className="font-semibold text-slate-800 mb-3">Model Accuracy</h3>
                <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-full transition-all duration-500"
                    style={{ width: `${(modelInfo.metrics.test_r2 || 0) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  {(modelInfo.metrics.test_r2 * 100).toFixed(1)}% - Model explains test variance
                </p>
              </div>
            </div>

            {/* Best Parameters */}
            <div className="glass p-8">
              <h2 className="text-2xl font-bold mb-6">Best Hyperparameters</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modelInfo.best_params && Object.entries(modelInfo.best_params).map(([key, value]) => (
                  <div key={key} className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg border border-white/20">
                    <p className="text-xs text-slate-600 uppercase tracking-wide font-semibold">{key.replace('model__', '')}</p>
                    <p className="text-lg font-bold text-slate-800 mt-1">{JSON.stringify(value)}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
