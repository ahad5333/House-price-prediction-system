export const OCEAN_PROXIMITY_OPTIONS = [
  '<1H OCEAN',
  'INLAND',
  'NEAR OCEAN',
  'NEAR BAY',
  'ISLAND'
];

export const FEATURE_RANGES = {
  longitude: { min: -125, max: -114, step: 0.01 },
  latitude: { min: 32, max: 42, step: 0.01 },
  housing_median_age: { min: 0, max: 100, step: 1 },
  total_rooms: { min: 0, max: 100000, step: 100 },
  total_bedrooms: { min: 0, max: 10000, step: 100 },
  population: { min: 0, max: 50000, step: 100 },
  households: { min: 0, max: 10000, step: 100 },
  median_income: { min: 0, max: 20, step: 0.1 },
};

export const FEATURE_LABELS = {
  longitude: 'Longitude',
  latitude: 'Latitude',
  housing_median_age: 'Housing Median Age',
  total_rooms: 'Total Rooms',
  total_bedrooms: 'Total Bedrooms',
  population: 'Population',
  households: 'Households',
  median_income: 'Median Income',
  ocean_proximity: 'Ocean Proximity',
};

export const FEATURE_DESCRIPTIONS = {
  longitude: 'Geographic longitude coordinate (-125 to -114)',
  latitude: 'Geographic latitude coordinate (32 to 42)',
  housing_median_age: 'Median age of houses in the block (0-100 years)',
  total_rooms: 'Total number of rooms in the block',
  total_bedrooms: 'Total number of bedrooms in the block',
  population: 'Total population count in the block',
  households: 'Number of households in the block',
  median_income: 'Median income level (in tens of thousands)',
  ocean_proximity: 'Proximity to the ocean or bay',
};

export const DEFAULT_FORM_VALUES = {
  longitude: -122.4,
  latitude: 37.7,
  housing_median_age: 25,
  total_rooms: 2000,
  total_bedrooms: 400,
  population: 900,
  households: 350,
  median_income: 4.5,
  ocean_proximity: '<1H OCEAN',
};
