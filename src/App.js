import React from 'react';
import SampleForm from './components/SampleForm';
import { DefaultValuesProvider } from './context/DefaultValuesContext';

const App = () => {
  return (
    <div className="app-container">
      <DefaultValuesProvider>
        <SampleForm />
      </DefaultValuesProvider>
    </div>
  );
};

export default App;
