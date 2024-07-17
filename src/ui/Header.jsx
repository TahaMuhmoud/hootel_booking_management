import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import { firstLitterToUpper } from "../utils/helpers";

function Header({ header, sortOptions, filterOptions, recentOptions }) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex items-center justify-between flex-wrap gap-y-5 p-5 border-primary border-b-[1px] ">
      <h1 className="text-4xl font-bold col-span-2 ">
        {firstLitterToUpper(header)}
      </h1>
      <div className="flex flex-col items-end gap-1 col-span-2">
        {sortOptions && (
          <Select
            label={"sort"}
            onChange={(e) => {
              searchParams.set("sortBy", e.target.value);
              setSearchParams(searchParams);
            }}
            options={sortOptions}
          />
        )}
        {filterOptions && (
          <Select
            label={"filter"}
            onChange={(e) => {
              searchParams.set("filterBy", e.target.value);
              setSearchParams(searchParams);
            }}
            options={filterOptions}
          />
        )}
        {recentOptions && (
          <Select
            label={`Statistics for past ${searchParams.get("last") || 7} days`}
            value={searchParams.get("last") || "7"}
            onChange={(e) => {
              searchParams.set("last", e.target.value);
              setSearchParams(searchParams);
            }}
            options={recentOptions}
          />
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  header: PropTypes.string,
  sortOptions: PropTypes.array,
  filterOptions: PropTypes.array,
  recentOptions: PropTypes.array,
};

export default Header;
