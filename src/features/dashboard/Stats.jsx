import PropTypes from "prop-types";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, stays, numDays }) {
  const numBookings = bookings?.length;
  //
  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0) + "$";
  //
  let confirmedStayes = stays.filter(
    (item) => item.status === "check-in" || item.status === "check-out"
  );
  //
  const occupancy =
    confirmedStayes.reduce((acc, curr) => acc + curr.numNights, 0) /
    Number(numDays);
  //
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
      <Stat
        colSpans={1}
        icon={<HiOutlineBriefcase />}
        label="Bookings"
        value={numBookings}
        iconBgColor="bg-blue-200"
      />
      <Stat
        colSpans={1}
        icon={<HiOutlineBanknotes />}
        label="Sales"
        value={sales}
        iconBgColor="bg-indigo-200"
      />
      <Stat
        colSpans={1}
        icon={<HiOutlineCalendar />}
        label="Chick Ins"
        value={confirmedStayes.length}
        iconBgColor="bg-green-200"
      />
      <Stat
        colSpans={1}
        icon={<HiOutlineChartBar />}
        label="Occupany Rate"
        value={`${Math.round(occupancy)}%`}
        iconBgColor="bg-yellow-200"
      />
    </div>
  );
}

Stats.propTypes = {
  bookings: PropTypes.array,
  stays: PropTypes.array,
  numDays: PropTypes.number,
};

export default Stats;
