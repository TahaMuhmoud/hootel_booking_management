import Header from "../../ui/Header";
import { useState } from "react";
import CabinsTable from "../../features/cabins/CabinsTable";
import AddCabin from "../../features/cabins/AddCabin";
import Button from "../../ui/Button";
import {
  CABIN_FILTER_OPTIONS,
  CABIN_SORT_OPTIONS,
} from "../../utils/constants";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  function handleShowAddForm() {
    setShowForm((is) => !is);
  }

  return (
    <div id="cabins" className="flex flex-col gap-5 ">
      <Header
        header="cabins"
        sortOptions={CABIN_SORT_OPTIONS}
        filterOptions={CABIN_FILTER_OPTIONS}
      />

      <CabinsTable />

      <Button onClick={handleShowAddForm}>
        <span className="flex items-center gap-3">
          Add Cabin {!showForm ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </span>
      </Button>
      {showForm && <AddCabin />}
    </div>
  );
}

Cabins.propTypes = {};

export default Cabins;
