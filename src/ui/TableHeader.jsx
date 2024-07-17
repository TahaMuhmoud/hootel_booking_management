import PropTypes from "prop-types";
import TableCell from "./TableCell";

function TableHeader({ numCols = 8, list }) {
  return (
    <div
      className={`max-h-16 col-span-full row-span-1 items-center bg-primary text-secondary sm:text-lg font-semibold`}
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

TableHeader.propTypes = { numCols: PropTypes.number, list: PropTypes.array };

export default TableHeader;
