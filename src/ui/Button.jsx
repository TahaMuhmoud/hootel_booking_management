import PropTypes from "prop-types";

const Button = ({
  onClick,
  children,
  type,
  disabled,
  className,
  icon,
  leftIcon,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${className} w-fit bg-primary text-secondary sm:text-lg font-bold hover:bg-secondary hover:text-primary disabled:text-secondary border-[1px] border-primary rounded-md px-3 py-1 disabled:bg-gray-500/40`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {leftIcon} {children} {icon}
      </div>
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.any,
  leftIcon: PropTypes.any,
};

export default Button;
