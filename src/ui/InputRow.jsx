import PropTypes from "prop-types";

function InputRow({
  label,
  type,
  name,
  value,
  options,
  error,
  className,
  onChange = () => {},
}) {
  return (
    <div className={`w-full relative flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={name} className={`text-lg font-medium`}>
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        value={type !== "file" ? value : undefined}
        className=" outline-none w-full h-full p-2 px-4 text-xl border-b-primary border-b-4 rounded-full bg-gradient-to-t from-primary/20 to-secondary"
        {...options}
        onChange={onChange}
      />
      {error && <div className="text-lg text-red-500">{error}</div>}
    </div>
  );
}

InputRow.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.object,
  error: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputRow;
