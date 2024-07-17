import PropTypes from "prop-types";

function Stat({ colSpans, label, value, icon, iconBgColor }) {
  return (
    <div
      className={`col-span-${colSpans} grid grid-cols-3 gap-3 items-center bg-third text-primary text-xl font-semibold p-3 rounded-xl`}
    >
      <div
        className={`icon col-span-1 h-full aspect-square max-h-20 ${iconBgColor} grid place-items-center rounded-full font-bold text-2xl`}
      >
        {icon}
      </div>
      <div className="info col-span-2">
        <div className="label">{label}</div>
        <div className="value">{value}</div>
      </div>
    </div>
  );
}

Stat.propTypes = {
  colSpans: PropTypes.number,
  value: PropTypes.any,
  label: PropTypes.string,
  icon: PropTypes.any,
  iconBgColor: PropTypes.string,
};

export default Stat;
