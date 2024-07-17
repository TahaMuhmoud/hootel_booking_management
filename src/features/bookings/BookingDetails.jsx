import PropTypes from "prop-types";

import GuestCard from "../../ui/GuestCard";
import CabinCard from "../../ui/CabinCard";
import { useLocation } from "react-router-dom";

function BookingDetails() {
  const { state: booking } = useLocation();
  return (
    <div className="flex flex-col gap-10 p-5 sm:p-10">
      <GuestCard guest={booking.guests} />
      <div className="grid grid-cols-6 text-lg font-bold">
        <div className="col-span-3 flex flex-col items-center p-2 bg-[#eee] border-[1px] border-primary">
          <span className="text=xl font-bold">From</span>
          <span>{booking.startDate}</span>
        </div>

        <div className="col-span-3 flex flex-col items-center p-2">
          <span className="text=xl font-bold">numNights</span>
          <span>{booking.numNights}</span>
        </div>
        <div className="col-span-3 flex flex-col items-center p-2">
          <span className="text=xl font-bold">numGuests</span>
          <span>{booking.numGuests}</span>
        </div>
        <div className="col-span-3 flex flex-col items-center p-2 bg-[#eee] border-[1px] border-primary">
          <span className="text=xl font-bold">To</span>
          <span>{booking.endDate}</span>
        </div>
      </div>
      <CabinCard booking={booking} />
    </div>
  );
}

export default BookingDetails;
