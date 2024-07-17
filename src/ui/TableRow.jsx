import PropTypes from "prop-types";
import TableCell from "./TableCell";

function TableRow({ numCols, list = [], bgColor = "bg-secondary" }) {
  return (
    <div
      className={`max-h-16 py-1 col-span-full row-span-1 items-center ${bgColor} text-primary font-bold border-b-2 border-primary`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numCols}, 1fr)`,
      }}
    >
      {list.map((item, i) => (
        <TableCell
          key={i}
          innerText={item.label}
          numOfColSpan={item.colSpans}
          bgColor={item.bgColor}
        />
      ))}
    </div>
  );
}

TableRow.propTypes = {
  numCols: PropTypes.number,
  list: PropTypes.array,
  bgColor: PropTypes.string,
};

export default TableRow;
