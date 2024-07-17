import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LOGO } from "../../utils/constants";
import { useState } from "react";
import VerticalList from "../../ui/VerticalList";

function Sidebar({ list }) {
  const [selected, setSelected] = useState(null);

  return (
    <aside className="sidebar bg-primary text-secondary hidden lg:flex col-span-2 lg:col-span-1 xl:col-span-2 row-span-11 lg:row-span-full bg flex-col items-center gap-24 xl:gap-10 p-2 xl:p-5 pt-32 xl:pt-20">
      <div className="logo text-4xl font-bold rotate-90 xl:rotate-0">
        <Link to="/">{LOGO}</Link>
      </div>
      <VerticalList
        list={list}
        selectedItem={selected}
        onClick={(e, i) => {
          setSelected(i);
        }}
        itemClassName="hidden xl:inline-block"
      />
    </aside>
  );
}

Sidebar.propTypes = { list: PropTypes.array };

export default Sidebar;
