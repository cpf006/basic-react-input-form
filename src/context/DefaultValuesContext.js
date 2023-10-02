import React, { createContext, useState, useEffect } from 'react';

export const DefaultValuesContext = createContext();

export const DefaultValuesProvider = ({ children }) => {
  const [defaultValues, setDefaultValues] = useState({
    sample_size: null,
    sample_mean: null,
    standard_deviation: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/context/defaultValues.json')
      .then((response) => response.json())
      .then((data) => {
        setDefaultValues(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching default values:', error);
        setLoading(false);
      });
  }, []);

  return (
    <DefaultValuesContext.Provider value={{ defaultValues, loading }}>
      {children}
    </DefaultValuesContext.Provider>
  );
};