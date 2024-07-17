import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

function Table({ children, numCols, count }) {
  const [searchParams] = useSearchParams();
  //
  const currPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const from = (currPage - 1) * PAGE_SIZE;
  let to = from + PAGE_SIZE - 1;
  to = to >= count ? count : to;
  let numRows = to >= count ? to - from : to - from + 1;

  //
  return (
    <div
      className="w-full text-sm bg-secondary text-primary border-2 border-primary"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numCols}, 1fr)`,
        gridTemplateRows: `repeat(${numRows}, 1fr)`,
      }}
    >
      {children}
    </div>
  );
}

Table.propTypes = {
  children: PropTypes.any,
  numCols: PropTypes.number,
  count: PropTypes.number,
};

export default Table;
