import { useState } from "react";
import BookingsTable from "../../features/bookings/BookingsTable";
import Button from "../../ui/Button";
import Header from "../../ui/Header";
import AddBooking from "../../features/bookings/AddBooking";
import { BOOKING_FILTER_OPTIONS } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";
import InputRow from "../../ui/InputRow";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Bookings() {
  const [showForm, setShowForm] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  function handleShowAddForm() {
    setShowForm((is) => !is);
  }

  function handleSearch(e) {
    searchParams.set("s", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <div id="bookings" className="flex flex-col gap-5">
      <Header header="Bookings" filterOptions={BOOKING_FILTER_OPTIONS} />
      <InputRow
        label="search"
        name="search"
        type="text"
        value={searchParams?.get("s") ? searchParams?.get("s") : ""}
        onChange={handleSearch}
      />
      <BookingsTable />
      <Button
        onClick={handleShowAddForm}
        icon={!showForm ? <IoIosArrowDown /> : <IoIosArrowUp />}
      >
        Add Booking
      </Button>
      {showForm && <AddBooking />}
    </div>
  );
}

Bookings.propTypes = {};

export default Bookings;
