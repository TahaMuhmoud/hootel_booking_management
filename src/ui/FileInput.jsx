import { useState } from "react";
import PropTypes from "prop-types";
import { FaCheckDouble } from "react-icons/fa";

function FileInput({ label, icon, name, options, error, className }) {
  const [isImageSelected, setIsImageSelected] = useState(false);

  function handleSelectedImage() {
    setIsImageSelected(true);
  }
  return (
    <div className={`w-fit flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={name}
        className="bg-primary text-secondary text-lg font-bold p-3 px-5 flex gap-3 items-center cursor-pointer hover:bg-secondary hover:text-primary"
      >
        {icon}
        {label}
        {isImageSelected && <FaCheckDouble />}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        onInput={handleSelectedImage}
        {...options}
        className={`hidden`}
      />
      {error && <div className="text-lg text-red-500">{error}</div>}
    </div>
  );
}

FileInput.propTypes = {
  label: PropTypes.any,
  icon: PropTypes.any,
  options: PropTypes.any,
  name: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
};

export default FileInput;
