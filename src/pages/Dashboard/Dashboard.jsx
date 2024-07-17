import { useRecentBookings } from "../../features/dashboard/useRecentBookings";
import Sppiner from "../../ui/Sppiner";
import Header from "../../ui/Header";
import { BOOKING_RECENT_OPTIONS } from "../../utils/constants";
import Stats from "../../features/dashboard/Stats";
import { useRecentStays } from "../../features/dashboard/useRecentStays";
import SalesChart from "../../features/dashboard/SalesChart";
import StaysDurationsChart from "../../features/dashboard/StaysDurationsChart";

function Dashboard() {
  const {
    isLoading: isLoadingBookings,
    bookings,
    numDays,
  } = useRecentBookings();

  const { isLoading: isLoadingStays, stays, confirmedStays } = useRecentStays();
  if (isLoadingBookings || isLoadingStays) return <Sppiner />;

  return (
    <div className="flex flex-col gap-5">
      <Header header="Dashboard" recentOptions={BOOKING_RECENT_OPTIONS} />
      <Stats bookings={bookings} stays={stays} numDays={numDays} />
      <div className="grid grid-cols-4 lg:grid-cols-6 gap-5">
        <SalesChart bookings={bookings} numDays={numDays} />
        <StaysDurationsChart confirmedStays={confirmedStays} />
      </div>
    </div>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
