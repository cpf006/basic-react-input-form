import React, { createContext, useState, useEffect } from 'react';

export const DefaultValuesContext = createContext();

export const DefaultValuesProvider = ({ children }) => {
  const [defaultValues, setDefaultValues] = useState({
    sample_size: null,
    sample_mean: null,
    standard_deviation: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchDefaultValues = async () => {
      try { 
        const response = await fetch('defaultValues.json');
        const data = await response.json();
        setDefaultValues(data);
      } catch (err) {
        console.error('Error fetching default values:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultValues();
  }, []);

  return (
    <DefaultValuesContext.Provider value={{ defaultValues, loading }}>
      {children}
    </DefaultValuesContext.Provider>
  );
};