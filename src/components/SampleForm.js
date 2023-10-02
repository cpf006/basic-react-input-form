import { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DefaultValuesContext } from '../context/DefaultValuesContext';
import InputField from './InputField';
import '../styles/SampleForm.css';

const SampleForm = () => {
  const { defaultValues, loading, error } = useContext(DefaultValuesContext);
  const { register, handleSubmit, errors = {}, reset } = useForm({
    defaultValues: defaultValues
  });

  const [performHypothesisTest, setPerformHypothesisTest] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    // Here is where we would handle passing the data back to the server
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Sample size:"
          type="number"
          name="sample_size"
          register={register}
          validation={{
            required: "Sample size is required",
            validate: value => (value >= 2 && Number.isInteger(parseFloat(value))) || "Sample size must be a whole number >= 2"
          }}
          errorMessage={errors.sample_size?.message}
        />
        <InputField
          label="Sample Mean:"
          type="text"
          name="sample_mean"
          register={register}
          validation={{
            required: "Sample mean is required"
          }}
          errorMessage={errors.sample_mean?.message}
        />
        <InputField
          label="Standard Deviation:"
          type="text"
          name="standard_deviation"
          register={register}
          validation={{
            required: "Standard deviation is required",
            validate: value => (value > 0) || "Standard deviation must be > 0"
          }}
          errorMessage={errors.standard_deviation?.message}
        />
        <div className="form-group">
          <label className="label">
            <input
              type="checkbox"
              name="perform_hypothesis"
              ref={register}
              checked={performHypothesisTest}
              onChange={(e) => setPerformHypothesisTest(e.target.checked)}
            />
            Perform hypothesis test
          </label>
        </div>
        {performHypothesisTest && (
          <InputField
            label="Hypothesized mean:"
            type="text"
            name="hypothesized_mean"
            register={register}
            validation={{
              required: "Hypothesized mean is required"
            }}
            errorMessage={errors.hypothesized_mean?.message}
          />
        )}
        <button type="submit">OK</button>
        <button type="button" onClick={() => reset(defaultValues)}>Reset</button>
      </form>
    </div>
  );
};

export default SampleForm;