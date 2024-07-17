import { BiLogOut } from "react-icons/bi";
import { useUser } from "../auth/useUser";
import { useLogout } from "../auth/useLogout";
import { useNavigate } from "react-router-dom";
import ProfileImg from "../../ui/ProfileImg";
import { CircleLoader } from "react-spinners";
import { SECONDARY_COLOR } from "../../utils/constants";

function HeaderProfileData() {
  const navigate = useNavigate();
  const { user } = useUser();
  let { logout, isLogingOut } = useLogout();
  function handleLogout() {
    logout();
  }
  return (
    <div className="bg-third flex items-center justify-between col-span-12 lg:col-span-11 xl:col-span-10 row-span-1 p-2 px-10">
      <div className=""></div>
      <div className="h-full flex items-center justify-between gap-4">
        <div
          className="h-full cursor-pointer flex items-center gap-4 p-1 pr-2 rounded-full bg-secondary hover:bg-transparent hover:border border-primary"
          onClick={() => navigate(`/account`)}
        >
          <div className="img h-full aspect-square rounded-full border-[1px] overflow-hidden border-primary bg-red-500">
            <ProfileImg img={user?.user_metadata?.avatar} />
          </div>
          <div className="name text-lg font-bold">
            {user?.user_metadata.fullName
              ? user?.user_metadata.fullName
              : "Some One"}
          </div>
        </div>

        <div className="">
          {isLogingOut ? (
            <div className="absolute top-7 left-1/2 -translate-x-1/2 text-secondary text-lg font-semibold bg-primary p-4 rounded-xl flex items-center gap-5">
              Loging Out <CircleLoader color={SECONDARY_COLOR} size={35} />
            </div>
          ) : (
            <BiLogOut
              size={25}
              className="cursor-pointer"
              onClick={handleLogout}
            />
          )}
        </div>
      </div>
    </div>
  );
}

HeaderProfileData.propTypes = {};

export default HeaderProfileData;
