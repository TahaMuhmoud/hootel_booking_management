import PropTypes from "prop-types";
import Button from "./Button";
import { MdDoubleArrow } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const from = (currPage - 1) * PAGE_SIZE;
  let to = from + PAGE_SIZE - 1;
  to = to >= count ? count : to;

  const pagesCount = Math.ceil(count / PAGE_SIZE);

  function next() {
    let page = currPage == pagesCount ? currPage : currPage + 1;
    searchParams.set("page", page);
    setSearchParams(searchParams);
  }

  function previos() {
    let page = currPage === 1 ? currPage : currPage - 1;
    searchParams.set("page", page);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex justify-between items-center px-4 py-2">
      <div className="">
        from {from} to {to} of {count}
      </div>
      <div className="flex justify-between items-center gap-2">
        <Button
          icon={<MdDoubleArrow className="rotate-180" />}
          className="text-sm font-bold py-3"
          onClick={previos}
          disabled={currPage == 1}
        />
        {currPage}
        <Button
          icon={<MdDoubleArrow />}
          className="text-sm font-bold py-3 "
          onClick={next}
          disabled={currPage == pagesCount}
        />
      </div>
    </div>
  );
}

Pagination.propTypes = {
  count: PropTypes.number,
};

export default Pagination;
