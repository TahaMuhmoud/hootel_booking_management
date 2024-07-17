import { useState } from "react";
import PropTypes from "prop-types";
import { BiMenu } from "react-icons/bi";
import MenuList from "../../ui/MenuList";
import { Link } from "react-router-dom";
import { LOGO } from "../../utils/constants";

function MainHeader({ list }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className="relative text-secondary lg:hidden bg-primary col-span-full row-span-1 flex justify-between items-center px-10">
      <div className="logo text-2xl font-bold">
        <Link to="/">{LOGO}</Link>
      </div>
      <div
        className="menu lg:hidden cursor-pointer"
        onClick={() => setShowMenu((is) => !is)}
      >
        <BiMenu size={30} />
      </div>
      {showMenu && <MenuList list={list} setShowMenu={setShowMenu} />}
    </header>
  );
}

MainHeader.propTypes = {
  list: PropTypes.array,
};

export default MainHeader;
