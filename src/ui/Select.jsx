import PropTypes from "prop-types";

function Select({ label, onChange, options, register, className, value }) {
  // console.log(options);
  return (
    <div className={`text-lg font-semibold flex gap-4 ${className}`}>
      <label htmlFor={label}>{label}</label>
      <select
        className="border border-black text-sm"
        name={label}
        id={label}
        onChange={onChange}
        {...register}
        value={value}
      >
        {options?.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className=" text-sm lg:text-lg"
          >
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  register: PropTypes.any,
  className: PropTypes.string,
  value: PropTypes.string,
};

export default Select;
