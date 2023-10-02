import { render, screen, fireEvent } from '@testing-library/react';
import { DefaultValuesContext } from '../../context/DefaultValuesContext';
import SampleForm from '../../components/SampleForm';

const mockDefaultValues = {
  sample_size: 10,
  sample_mean: 2.5,
  standard_deviation: 0.1,
};

describe('SampleForm Component', () => {
  it('renders form fields with default values', () => {
    render(
      <DefaultValuesContext.Provider value={{ defaultValues: mockDefaultValues, loading: false, error: null }}>
        <SampleForm />
      </DefaultValuesContext.Provider>
    );

    expect(screen.getByLabelText(/Sample size:/i).value).toBe('10');
    expect(screen.getByLabelText(/Sample Mean:/i).value).toBe('2.5');
    expect(screen.getByLabelText(/Standard Deviation:/i).value).toBe('0.1');
  });

  it('enables Hypothesized mean field when Perform hypothesis test is checked', () => {
    render(
      <DefaultValuesContext.Provider value={{ defaultValues: mockDefaultValues, loading: false, error: null }}>
        <SampleForm />
      </DefaultValuesContext.Provider>
    );

    const checkbox = screen.getByLabelText(/Perform hypothesis test/i);
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(screen.getByLabelText(/Hypothesized mean:/i)).not.toBeDisabled();
  });
});
