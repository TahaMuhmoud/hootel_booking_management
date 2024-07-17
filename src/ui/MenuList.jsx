import PropTypes from "prop-types";
import { useState } from "react";
import VerticalList from "./VerticalList";

function MenuList({ list, setShowMenu }) {
  const [selected, setSelected] = useState(null);
  return (
    <div className="z-10  bg-primary text-secondary menu-list w-full absolute top-full right-0 p-10">
      <VerticalList
        list={list}
        selectedItem={selected}
        onClick={(e, i) => {
          setSelected(i);
          setShowMenu(false);
        }}
      />
    </div>
  );
}

MenuList.propTypes = {
  list: PropTypes.array,
  setShowMenu: PropTypes.func,
};

export default MenuList;
