import { Fragment, useState } from "react";
import { BiDotsVertical } from "react-icons/bi";
import EditMenu from "../../ui/EditMenu";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDeleteBook } from "./useDeleteBook";
import { useBookings } from "./useBookings";
import Table from "../../ui/Table";
import TableHeader from "../../ui/TableHeader";
import TableRow from "../../ui/TableRow";
import Pagination from "../../ui/Pagination";
import Sppiner from "../../ui/Sppiner";
import { BsArrowRight } from "react-icons/bs";
import { format, formatDistanceToNow, isBefore, isToday } from "date-fns";

const BOOKING_TABLE_HEADER = [
  { label: "Cabin", colSpans: 1 },
  { label: "Guest", colSpans: 2 },
  { label: "Dates", colSpans: 3 },
  { label: "Status", colSpans: 2 },
  { label: "Price", colSpans: 1 },
];
const STATUS = [
  { label: "confirmed", color: "#0000ff" },
  { label: "check-in", color: "#008000" },
  { label: "check-out", color: "#ffa500" },
];
function filterStatusByName(label) {
  let status = STATUS.filter((item) => item.label == label);
  return status[0];
}
function filterBookings(bookings, filterBy) {
  switch (filterBy) {
    case "no-filter":
      return bookings;
    case "confirmed":
      return (bookings = bookings.filter(
        (book) => book.status === "confirmed"
      ));

    case "checked-in":
      return (bookings = bookings.filter((book) => book.status === "check-in"));

    case "checked-out":
      return (bookings = bookings.filter(
        (book) => book.status === "check-out"
      ));

    default:
      return bookings;
  }
}

function BookingsTable() {
  const [selected, setSelected] = useState(null);

  const [searchParams] = useSearchParams();
  const filterBy = searchParams.get("filterBy");
  const searchVal = searchParams.get("s");

  const navigate = useNavigate();

  let { bookings, count, isLoadingBookings } = useBookings();

  const { delteBook, isDeleting } = useDeleteBook();

  if (bookings) {
    bookings = filterBookings(bookings, filterBy);
    if (searchVal) {
      bookings = bookings.filter((book) =>
        book.guests.fullName.includes(searchVal)
      );
    }
  }

  function handleShowEditMenu(x) {
    setSelected((e) => (e === null ? x : e !== x ? x : null));
  }

  function handleDeletebook(id) {
    delteBook(id);
  }

  function handleEditbook(book) {
    navigate(`/edit-booking/${book.id}`, {
      state: { ...book },
    });
  }

  function handleShowbook(book) {
    navigate(`/booking-details/${book.id}`, {
      state: { ...book },
    });
  }
  let numCols = 10;
  return (
    <Table numCols={numCols} count={count}>
      <TableHeader numCols={numCols} list={BOOKING_TABLE_HEADER} />

      {isLoadingBookings ? (
        <div className="col-span-full row-start-2 row-end-none">
          <Sppiner />
        </div>
      ) : (
        bookings?.map((booking, i) => (
          <Fragment key={i}>
            <TableRow
              numCols={numCols}
              list={[
                {
                  label: booking.cabins.name,
                  colSpans: 1,
                },
                {
                  label: (
                    <div className="text-nowrap text-ellipsis overflow-hidden">
                      <span className="font-bold">
                        {booking.guests.fullName}
                      </span>
                      <span className="hidden md:block font-normal text-primary/70">
                        {booking.guests.email}
                      </span>
                    </div>
                  ),
                  colSpans: 2,
                },
                {
                  label: (
                    <div>
                      <span className=" font-bold hidden md:flex items-center gap-1 flex-wrap">
                        {isToday(booking.startDate)
                          ? "today"
                          : isBefore(booking.startDate, new Date())
                            ? formatDistanceToNow(booking.startDate) + " ago"
                            : formatDistanceToNow(booking.startDate) + " left"}
                        <BsArrowRight /> {booking.numNights} nights stay
                      </span>
                      <span className="font-normal text-primary/70">
                        {format(booking.startDate, "MMM dd yyyy")} -{" "}
                        {format(booking.endDate, "MMM dd yyyy")}
                      </span>
                    </div>
                  ),
                  colSpans: 3,
                },
                {
                  label: (
                    <>
                      <span
                        className={`hidden md:block w-fit px-2 py-1 rounded-full`}
                        style={{
                          background: `${filterStatusByName(booking.status).color}50`,
                          color: `${filterStatusByName(booking.status).color}`,
                        }}
                      >
                        {filterStatusByName(booking.status).label}
                      </span>
                      <span
                        className={`block md:hidden w-fit p-2 rounded-full animate-pulse`}
                        style={{
                          background: `${filterStatusByName(booking.status).color}80`,
                        }}
                      ></span>
                    </>
                  ),
                  colSpans: 2,
                },
                {
                  label: booking.cabins.regularPrice,
                  colSpans: 1,
                },

                {
                  label: (
                    <BiDotsVertical
                      size={35}
                      className=" cursor-pointer p-1 rounded-full"
                      onClick={() => handleShowEditMenu(i)}
                    />
                  ),
                  colSpans: 1,
                  bgColor: "secondary",
                },
              ]}
            />
            {selected === i && (
              <div key={i + 1000} className="col-span-full pl-4 sm:pl-10">
                <EditMenu
                  data={booking}
                  handleEdit={handleEditbook}
                  handleDelete={handleDeletebook}
                  isDeleting={isDeleting}
                  handleShow={handleShowbook}
                />
              </div>
            )}
          </Fragment>
        ))
      )}
      <div className="col-span-full row-span-1 items-center bg-secondary text-primary font-bold">
        <Pagination count={count} />
      </div>
    </Table>
  );
}

BookingsTable.propTypes = {};

export default BookingsTable;
