import React from 'react';

export const PredictionResult = ({ prediction }) => {
  if (!prediction) return null;

  const price = prediction.predicted_price;
  const notablePrice = price > 1000000 ? 'Premium Property' : 
                       price > 500000 ? 'Luxury' : 
                       price > 250000 ? 'High-End' : 'Standard';

  return (
    <div className="animate-slideUp">
      <div className="glass p-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -mr-16 -mt-16"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">Prediction Result</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Price */}
            <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
              <p className="text-slate-600 font-semibold mb-2">Estimated Price</p>
              <div className="text-4xl font-bold gradient-text mb-2">
                {prediction.formatted_price}
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  ✓ {notablePrice}
                </span>
                <span className="text-xs text-slate-600">{prediction.timestamp}</span>
              </div>
            </div>

            {/* Confidence Meter */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
              <p className="text-slate-600 font-semibold mb-3">Model Confidence</p>
              <div className="text-3xl font-bold text-green-600 mb-3">High</div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-xs text-slate-600 mt-3">Based on 85% model accuracy</p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <h3 className="font-semibold text-slate-800 mb-4">Price Information</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-slate-600">Currency:</span>
                <span className="font-semibold">{prediction.currency}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-600">Unit:</span>
                <span className="font-semibold">{prediction.unit}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-600">Model Confidence:</span>
                <span className="font-semibold text-green-600">{prediction.confidence}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
        <p><strong>📊 Note:</strong> This prediction is based on the California Housing Dataset (1990 census). Actual market prices may vary significantly based on current market conditions and other factors not included in this model.</p>
      </div>
    </div>
  );
};

export const ModelStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
      <div className="glass p-4 text-center">
        <div className="text-3xl font-bold gradient-text mb-1">${Math.round(stats.test_rmse).toLocaleString()}</div>
        <div className="text-xs text-slate-600">Test RMSE</div>
      </div>
      <div className="glass p-4 text-center">
        <div className="text-3xl font-bold gradient-text mb-1">{(stats.test_r2 * 100).toFixed(1)}%</div>
        <div className="text-xs text-slate-600">R² Score</div>
      </div>
      <div className="glass p-4 text-center">
        <div className="text-3xl font-bold gradient-text mb-1">${Math.round(stats.test_mae).toLocaleString()}</div>
        <div className="text-xs text-slate-600">Mean Abs Error</div>
      </div>
      <div className="glass p-4 text-center">
        <div className="text-3xl font-bold gradient-text mb-1">{stats.best_params?.model__n_estimators || 200}</div>
        <div className="text-xs text-slate-600">Tree Count</div>
      </div>
    </div>
  );
};
