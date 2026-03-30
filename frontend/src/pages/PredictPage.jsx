import React from 'react';
import { PredictionForm } from '../components/PredictionForm';
import { PredictionResult, ModelStats } from '../components/PredictionResult';
import { ErrorAlert, SuccessAlert, LoadingSpinner } from '../components/Layout';
import { predictAPI } from '../services/api';

export default function PredictPage() {
  const [result, setResult] = React.useState(null);
  const [stats, setStats] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  React.useEffect(() => {
    // Load model stats
    const loadStats = async () => {
      try {
        const response = await predictAPI.getModelInfo();
        setStats(response.data.metrics);
      } catch (err) {
        console.error('Error loading model stats:', err);
      }
    };
    loadStats();
  }, []);

  const handlePredict = async (formData) => {
    setLoading(true);
    setError('');
    setSuccess('');
    setResult(null);

    try {
      const response = await predictAPI.predict(formData);
      setResult(response.data);
      setSuccess('Prediction completed successfully!');
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Failed to predict. Please try again.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Predict House Prices
          </h1>
          <p className="text-xl text-slate-600">
            Enter property details to get an AI-powered price estimation
          </p>
        </div>

        {/* Error and Success Alerts */}
        {error && <ErrorAlert message={error} onClose={() => setError('')} />}
        {success && <SuccessAlert message={success} onClose={() => setSuccess('')} />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="glass p-8 h-fit">
            <h2 className="text-2xl font-bold mb-6">Property Details</h2>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <PredictionForm onSubmit={handlePredict} loading={loading} />
            )}
          </div>

          {/* Result */}
          <div>
            {result ? (
              <>
                <PredictionResult prediction={result} />
                {stats && <ModelStats stats={stats} />}
              </>
            ) : (
              <div className="glass p-8 text-center py-20">
                <p className="text-slate-500 text-lg">
                  Fill in the form and click "Predict Price" to see results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
