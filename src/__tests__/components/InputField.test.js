import { render, screen } from '@testing-library/react';
import InputField from '../../components/InputField';

describe('InputField Component', () => {
  it('renders input field with label', () => {
    render(<InputField label="Sample size:" type="number" name="sample_size" register={() => {}} />);
    expect(screen.getByLabelText(/Sample size:/i)).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    render(
      <InputField
        label="Sample size:"
        type="number"
        name="sample_size"
        register={() => {}}
        errorMessage="Sample size must be a whole number >= 2"
      />
    );
    expect(screen.getByText(/Sample size must be a whole number >= 2/i)).toBeInTheDocument();
  });
});
