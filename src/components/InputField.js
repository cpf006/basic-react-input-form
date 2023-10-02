import PropTypes from 'prop-types';

const InputField = ({ label, type, name, defaultValue, register, validation, disabled, errorMessage }) => {
  return (
    <div className="form-group">
      <label className="label" style={{ color: disabled ? 'gray' : 'inherit' }}>{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        {...register(name, validation)}
        className="input"
        disabled={disabled}
      />
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  register: PropTypes.func.isRequired,
  validation: PropTypes.object,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default InputField;
