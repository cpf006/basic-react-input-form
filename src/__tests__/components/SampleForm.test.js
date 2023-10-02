import { render, screen, fireEvent, act } from '@testing-library/react';
import { DefaultValuesContext } from '../../context/DefaultValuesContext';
import SampleForm from '../../components/SampleForm';

const mockDefaultValues = {
  sample_size: '10',
  sample_mean: '2.5',
  standard_deviation: '0.1',
  perform_hypothesis: false,
  hypothesized_mean: ''
};

describe('SampleForm Component', () => {
  // Set up the component for each test
  beforeEach(() => {
    render(
      <DefaultValuesContext.Provider value={{ defaultValues: mockDefaultValues, loading: false, error: null }}>
        <SampleForm />
      </DefaultValuesContext.Provider>
    );
  });

  it('renders form fields with default values', () => {
    expect(screen.getByTestId('sample_size').value).toBe('10');
    expect(screen.getByTestId('sample_mean').value).toBe('2.5');
    expect(screen.getByTestId('standard_deviation').value).toBe('0.1');
  });

  it('enables Hypothesized mean field when Perform hypothesis test is checked', () => {
    const checkbox = screen.getByTestId('perform_hypothesis');
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked;
    expect(screen.getByTestId('hypothesized_mean')).not.toBeDisabled;
  });

  it('shows and hides error message based on input validation for sample size', async () => {
    // Ensure the error message is not present on initial render
    expect(screen.queryByText("Sample size must be a whole number >= 2")).not.toBeInTheDocument;
  
    // Make the sample size input invalid
    await act(async () => {
      fireEvent.change(screen.getByTestId('sample_size'), { target: { value: '1.5' } });
      fireEvent.click(screen.getByText('OK'));
    });
  
    // Verify that the error message is displayed
    expect(screen.getByText("Sample size must be a whole number >= 2")).toBeInTheDocument;
  
    // Correct the input
    await act(async () => {
      fireEvent.change(screen.getByTestId('sample_size'), { target: { value: '3' } });
      fireEvent.click(screen.getByText('OK'));
    });
  
    // Verify that the error message is no longer displayed
    expect(screen.queryByText("Sample size must be a whole number >= 2")).not.toBeInTheDocument;
  });

  it('shows error when sample size is less than 2', async () => {
    const input = screen.getByTestId('sample_size');
    fireEvent.change(input, { target: { value: '1' } });
    fireEvent.blur(input);
    await act(async () => {
      fireEvent.click(screen.getByText('OK'));
    });

    expect(screen.getByText("Sample size must be a whole number >= 2")).toBeInTheDocument;
  });

  it('shows error when sample size is not a whole number', async () => {
    const input = screen.getByTestId('sample_size');
    fireEvent.change(input, { target: { value: '2.5' } });
    fireEvent.blur(input);
    await act(async () => {
      fireEvent.click(screen.getByText('OK'));
    });

    expect(screen.getByText("Sample size must be a whole number >= 2")).toBeInTheDocument;
  });

  it('shows error when sample size is not a numeric value', async () => {
    const input = screen.getByTestId('sample_mean');
    fireEvent.change(input, { target: { value: 'abc' } }); // Entering a non-numeric value
    fireEvent.blur(input);
    await act(async () => {
      fireEvent.click(screen.getByText('OK'));
    });

    expect(screen.getByText("Must be a valid numeric value")).toBeInTheDocument;
  });

  it('shows error when hypothesized mean is empty and perform hypothesis is checked', async () => {
    const checkbox = screen.getByTestId('perform_hypothesis');
    fireEvent.click(checkbox);
    const input = screen.getByTestId('hypothesized_mean');
    fireEvent.blur(input);
    await act(async () => {
      fireEvent.click(screen.getByText('OK'));
    });

    expect(screen.getByText("Hypothesized mean is required")).toBeInTheDocument;
  });

  it('shows error when sample mean is empty', async () => {
    const input = screen.getByTestId('sample_mean');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    await act(async () => {
      fireEvent.click(screen.getByText('OK'));
    });

    expect(screen.getByText("Sample mean is required")).toBeInTheDocument;
  });

  it('shows error when standard deviation is less than or equal to 0', async () => {
    const input = screen.getByTestId('standard_deviation');
    await act(async () => {
      fireEvent.change(input, { target: { value: '0' } });
      fireEvent.blur(input);
      fireEvent.click(screen.getByText('OK'));
    });

    expect(screen.getByText("Standard deviation must be > 0")).toBeInTheDocument;

    await act(async () => {
      fireEvent.change(input, { target: { value: '-1' } });
      fireEvent.blur(input);
      fireEvent.click(screen.getByText('OK'));
    });
  
    expect(screen.getByText("Standard deviation must be > 0")).toBeInTheDocument;

    await act(async () => {
      fireEvent.change(input, { target: { value: '1' } });
      fireEvent.blur(input);
      fireEvent.click(screen.getByText('OK'));
    });

    expect(screen.queryByText("Standard deviation must be > 0")).not.toBeInTheDocument;
  });

  it('displays submitted values in a table and clears them on reset', async () => {
    // Change a value
    const sampleSizeInput = screen.getByTestId('sample_size');
    fireEvent.change(sampleSizeInput, { target: { value: '15' } });
    fireEvent.blur(sampleSizeInput)

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByText('OK'));
    });

    // Check if the changed value is displayed in the table
    const displayedSampleSize = screen.getByText('15');
    expect(displayedSampleSize).toBeInTheDocument;

    // Click the reset button
    await act(async () => {
      fireEvent.click(screen.getByText('Reset'));
    });

    // Check values have been reset and the display table is gone
    expect(sampleSizeInput.value).toBe('10');
    expect(screen.queryByText('15')).not.toBeInTheDocument;
  });
});