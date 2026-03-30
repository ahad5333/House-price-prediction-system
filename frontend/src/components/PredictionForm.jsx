import React from 'react';
import { FEATURE_LABELS, FEATURE_DESCRIPTIONS, OCEAN_PROXIMITY_OPTIONS, FEATURE_RANGES } from '../constants';

export const PredictionForm = ({ onSubmit, loading = false, defaultValues = {} }) => {
  const [formData, setFormData] = React.useState({
    longitude: -122.4,
    latitude: 37.7,
    housing_median_age: 25,
    total_rooms: 2000,
    total_bedrooms: 400,
    population: 900,
    households: 350,
    median_income: 4.5,
    ocean_proximity: '<1H OCEAN',
    ...defaultValues
  });

  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numValue = ['ocean_proximity'].includes(name) ? value : parseFloat(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: numValue
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Fields that can have negative values
    const allowNegative = ['longitude', 'latitude'];
    
    Object.keys(formData).forEach(key => {
      const value = formData[key];
      
      if (typeof value === 'number') {
        if (isNaN(value)) {
          newErrors[key] = 'Must be a valid number';
        } else if (!allowNegative.includes(key) && value < 0) {
          newErrors[key] = 'Must be non-negative';
        }
      }
    });

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Longitude */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">
            {FEATURE_LABELS.longitude}
          </label>
          <input
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            step={FEATURE_RANGES.longitude.step}
            min={FEATURE_RANGES.longitude.min}
            max={FEATURE_RANGES.longitude.max}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            title={FEATURE_DESCRIPTIONS.longitude}
          />
          <p className="text-xs text-slate-500 mt-1">{FEATURE_DESCRIPTIONS.longitude}</p>
          {errors.longitude && <p className="text-red-500 text-xs mt-1">{errors.longitude}</p>}
        </div>

        {/* Latitude */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">
            {FEATURE_LABELS.latitude}
          </label>
          <input
            type="number"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            step={FEATURE_RANGES.latitude.step}
            min={FEATURE_RANGES.latitude.min}
            max={FEATURE_RANGES.latitude.max}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            title={FEATURE_DESCRIPTIONS.latitude}
          />
          <p className="text-xs text-slate-500 mt-1">{FEATURE_DESCRIPTIONS.latitude}</p>
          {errors.latitude && <p className="text-red-500 text-xs mt-1">{errors.latitude}</p>}
        </div>

        {/* Housing Median Age */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">
            {FEATURE_LABELS.housing_median_age}
          </label>
          <input
            type="number"
            name="housing_median_age"
            value={formData.housing_median_age}
            onChange={handleChange}
            step={FEATURE_RANGES.housing_median_age.step}
            min={FEATURE_RANGES.housing_median_age.min}
            max={FEATURE_RANGES.housing_median_age.max}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            title={FEATURE_DESCRIPTIONS.housing_median_age}
          />
          <p className="text-xs text-slate-500 mt-1">{FEATURE_DESCRIPTIONS.housing_median_age}</p>
          {errors.housing_median_age && <p className="text-red-500 text-xs mt-1">{errors.housing_median_age}</p>}
        </div>

        {/* Total Rooms */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">
            {FEATURE_LABELS.total_rooms}
          </label>
          <input
            type="number"
            name="total_rooms"
            value={formData.total_rooms}
            onChange={handleChange}
            step={FEATURE_RANGES.total_rooms.step}
            min={FEATURE_RANGES.total_rooms.min}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            title={FEATURE_DESCRIPTIONS.total_rooms}
          />
          <p className="text-xs text-slate-500 mt-1">{FEATURE_DESCRIPTIONS.total_rooms}</p>
          {errors.total_rooms && <p className="text-red-500 text-xs mt-1">{errors.total_rooms}</p>}
        </div>

        {/* Total Bedrooms */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">
            {FEATURE_LABELS.total_bedrooms}
          </label>
          <input
            type="number"
            name="total_bedrooms"
            value={formData.total_bedrooms}
            onChange={handleChange}
            step={FEATURE_RANGES.total_bedrooms.step}
            min={FEATURE_RANGES.total_bedrooms.min}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            title={FEATURE_DESCRIPTIONS.total_bedrooms}
          />
          <p className="text-xs text-slate-500 mt-1">{FEATURE_DESCRIPTIONS.total_bedrooms}</p>
          {errors.total_bedrooms && <p className="text-red-500 text-xs mt-1">{errors.total_bedrooms}</p>}
        </div>

        {/* Population */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">
            {FEATURE_LABELS.population}
          </label>
          <input
            type="number"
            name="population"
            value={formData.population}
            onChange={handleChange}
            step={FEATURE_RANGES.population.step}
            min={FEATURE_RANGES.population.min}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            title={FEATURE_DESCRIPTIONS.population}
          />
          <p className="text-xs text-slate-500 mt-1">{FEATURE_DESCRIPTIONS.population}</p>
          {errors.population && <p className="text-red-500 text-xs mt-1">{errors.population}</p>}
        </div>

        {/* Households */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">
            {FEATURE_LABELS.households}
          </label>
          <input
            type="number"
            name="households"
            value={formData.households}
            onChange={handleChange}
            step={FEATURE_RANGES.households.step}
            min={FEATURE_RANGES.households.min}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            title={FEATURE_DESCRIPTIONS.households}
          />
          <p className="text-xs text-slate-500 mt-1">{FEATURE_DESCRIPTIONS.households}</p>
          {errors.households && <p className="text-red-500 text-xs mt-1">{errors.households}</p>}
        </div>

        {/* Median Income */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">
            {FEATURE_LABELS.median_income}
          </label>
          <input
            type="number"
            name="median_income"
            value={formData.median_income}
            onChange={handleChange}
            step={FEATURE_RANGES.median_income.step}
            min={FEATURE_RANGES.median_income.min}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            title={FEATURE_DESCRIPTIONS.median_income}
          />
          <p className="text-xs text-slate-500 mt-1">{FEATURE_DESCRIPTIONS.median_income}</p>
          {errors.median_income && <p className="text-red-500 text-xs mt-1">{errors.median_income}</p>}
        </div>

        {/* Ocean Proximity */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">
            {FEATURE_LABELS.ocean_proximity}
          </label>
          <select
            name="ocean_proximity"
            value={formData.ocean_proximity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            title={FEATURE_DESCRIPTIONS.ocean_proximity}
          >
            {OCEAN_PROXIMITY_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <p className="text-xs text-slate-500 mt-1">{FEATURE_DESCRIPTIONS.ocean_proximity}</p>
          {errors.ocean_proximity && <p className="text-red-500 text-xs mt-1">{errors.ocean_proximity}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⏳</span> Predicting...
          </span>
        ) : (
          'Predict Price'
        )}
      </button>
    </form>
  );
};
