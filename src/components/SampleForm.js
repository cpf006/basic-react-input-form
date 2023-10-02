import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DefaultValuesContext } from '../context/DefaultValuesContext';
import '../styles/SampleForm.css';

const SampleForm = () => {
  const { defaultValues, loading, error } = useContext(DefaultValuesContext);
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    defaultValues: defaultValues
  });

  const performHypothesisTest = watch("perform_hypothesis");

  const onSubmit = (data) => {
    console.log(data);
    // Here is where we would handle passing the data back to the server
  };

  useEffect(() => {
    if (!loading) {
      for (const key in defaultValues) {
        setValue(key, defaultValues[key]);
      }
    }
  }, [defaultValues, loading, setValue]);

  return (
    <div className="form-container">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <div className="label-container">
            {errors.sample_size && <div className="error">{errors.sample_size.message}</div>}
            <label className="label">Sample size:</label>
          </div>
          <input
            type="number"
            name="sample_size"
            data-testid="sample_size"
            {...register("sample_size", {
              required: "Sample size is required",
              pattern: {
                value: /^[0-9]*(\.[0-9]+)?$/,
                message: "Must be a valid numeric value"
              },
              validate: value => (value >= 2 && Number.isInteger(parseFloat(value))) || "Sample size must be a whole number >= 2"
            })}
            className={`input ${errors.sample_size ? 'input-error' : ''}`}
          />
        </div>

        <div className="form-group">
          <div className="label-container">
            {errors.sample_mean && <div className="error">{errors.sample_mean.message}</div>}
            <label className="label">Sample Mean:</label>
          </div>
          <input
            type="text"
            name="sample_mean"
            data-testid="sample_mean"
            {...register("sample_mean", {
              required: "Sample mean is required",
              pattern: {
                value: /^[0-9]*(\.[0-9]+)?$/,
                message: "Must be a valid numeric value"
              }
            })}
            className={`input ${errors.sample_mean ? 'input-error' : ''}`}
          />
        </div>

        <div className="form-group">
          <div className="label-container">
            {errors.standard_deviation && <div className="error">{errors.standard_deviation.message}</div>}
            <label className="label">Standard Deviation:</label>
          </div>
          <input
            type="text"
            name="standard_deviation"
            data-testid="standard_deviation"
            {...register("standard_deviation", {
              required: "Standard deviation is required",
              pattern: {
                value: /^[0-9]*(\.[0-9]+)?$/,
                message: "Must be a valid numeric value"
              },
              validate: value => (value > 0) || "Standard deviation must be > 0"
            })}
            className={`input ${errors.standard_deviation ? 'input-error' : ''}`}
          />
        </div>

        <div className="form-group">
          <div className="label-container">
            <label className="label">
              <input
                type="checkbox"
                name="perform_hypothesis"
                data-testid="perform_hypothesis"
                {...register("perform_hypothesis")}
              />
              Perform hypothesis test
            </label>
          </div>
        </div>

        <div className="form-group hypothesized-input">
          <div className="label-container">
            {errors.hypothesized_mean && <div className="error">{errors.hypothesized_mean.message}</div>}
            <label className={`label ${!performHypothesisTest ? 'disabled' : ''}`}>Hypothesized mean:</label>
          </div>
          <input
            type="text"
            name="hypothesized_mean"
            data-testid="hypothesized_mean"
            {...register("hypothesized_mean", {
              required: performHypothesisTest ? "Hypothesized mean is required" : false,
              pattern: {
                value: /^[0-9]*(\.[0-9]+)?$/,
                message: "Must be a valid numeric value"
              }
            })}
            className={`input ${errors.hypothesized_mean ? 'input-error' : ''}`}
            disabled={!performHypothesisTest}
          />
        </div>

        <div className="button-group">
          <button type="submit" className="button-ok">OK</button>
          <button type="button" onClick={() => reset(defaultValues)} className="button-reset">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default SampleForm;
