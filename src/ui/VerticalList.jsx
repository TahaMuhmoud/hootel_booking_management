import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function VerticalList({
  list,
  onClick,
  iconClassName,
  itemClassName,
  selectedItem,
}) {
  return (
    <ul className="w-full flex flex-col items-center">
      {list.map((item, i) => (
        <li
          key={item.path}
          className={`w-full text-xl font-bold transition-all duration-500 hover:bg-secondary hover:text-primary ${selectedItem === i || location.pathname === item.path ? "bg-secondary text-primary" : ""}`}
          onClick={(e) => onClick(e, i)}
        >
          <Link to={item.path} className="w-full p-5 flex items-center gap-3">
            <span className={`text-2xl ${iconClassName}`}>{item.icon}</span>
            <span className={`${itemClassName}`}>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

VerticalList.propTypes = {
  list: PropTypes.array,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  selectedItem: PropTypes.number,
};

export default VerticalList;
