import PropTypes from "prop-types";

function TableCell({
  numOfColSpan = 1,
  innerText,
  bgColor = "bg-secondary",
  className,
}) {
  return (
    <div
      className={`${className} h-full col-span-${numOfColSpan} bg-${bgColor} grid items-center overflow-hidden p-2`}
    >
      {innerText}
    </div>
  );
}

TableCell.propTypes = {
  numOfColSpan: PropTypes.number,
  innerText: PropTypes.any,
  bgColor: PropTypes.string,
  className: PropTypes.string,
};

export default TableCell;
