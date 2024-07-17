import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainHeader from "../../features/main/MainHeader";
import Sidebar from "../../features/main/Sidebar";
import { FaChartSimple } from "react-icons/fa6";
import { MdOutlineCabin } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { TbBrandBooking } from "react-icons/tb";
import HeaderProfileData from "../../features/main/HeaderProfileData";
import ImgOverlay from "../../ui/ImgOverlay";
import { useImgOverlay } from "../../context/useImgOverlay";

const ROUNTING_LIST = [
  { label: "Dashboard", path: "/", icon: <FaChartSimple /> },
  { label: "Cabins", path: "/cabins", icon: <MdOutlineCabin /> },
  { label: "Bookings", path: "/bookings", icon: <TbBrandBooking /> },
  { label: "Settings", path: "/settings", icon: <IoSettingsOutline /> },
];

const AppLayout = () => {
  const [imgOverlayShow] = useImgOverlay();
  return (
    <div className="h-screen grid grid-cols-12 grid-rows-12">
      {imgOverlayShow.show && <ImgOverlay />}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
      <MainHeader list={ROUNTING_LIST} />
      <Sidebar list={ROUNTING_LIST} />
      <HeaderProfileData />
      <main className="col-span-12 lg:col-span-11 xl:col-span-10 row-span-10 lg:row-span-11 p-2 sm:p-5 w-full overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
