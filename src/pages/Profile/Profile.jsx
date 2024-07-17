import { useState } from "react";
import Button from "../../ui/Button";
import { useUser } from "../../features/auth/useUser";
import Spinner from "../../ui/Sppiner";
import UpdateAccount from "../../features/profile/UpdateAccount";
import ProfileImg from "../../ui/ProfileImg";
import { useImgOverlay } from "../../context/useImgOverlay";

function Profile() {
  const [, setImgOverlayShow] = useImgOverlay();
  const [editClicked, setEditClicked] = useState(false);
  const { user, isUserLoading } = useUser();

  function handleEditClick() {
    setEditClicked((is) => !is);
  }

  if (isUserLoading) return <Spinner />;
  function handleImgToShow(e) {
    setImgOverlayShow({ img: e.target.src, show: true });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
      <div className="flex flex-col gap-5">
        <div className="w-full h-72 relative">
          <div className="w-full h-[200px] bg-third">
            <img
              src={user.user_metadata.bgImg}
              className="w-full h-full object-center object-cover"
              onClick={handleImgToShow}
            />
          </div>
          <div className="w-44 bg-black aspect-square overflow-hidden rounded-full absolute bottom-0 left-7 border-4 border-third">
            <ProfileImg
              img={user.user_metadata.avatar}
              onClick={handleImgToShow}
            />
          </div>
          <div className="absolute bottom-10 right-7">
            <Button onClick={handleEditClick}>update</Button>
          </div>
        </div>

        <div className="pt- px-5 flex flex-col gap-5 text-lg font-semibold">
          <h3 className="text-3xl font-bold">
            {user.user_metadata.fullName
              ? user.user_metadata.fullName
              : "Some One"}
          </h3>
          <div>Birth date : {user.user_metadata.birthDate}</div>
          <div>Phone number : {user.user_metadata.phone}</div>
          <div className="grid">
            Details :
            <span>
              {user.user_metadata.details
                ? user.user_metadata.details
                : `Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            placeat sit sed et sequi impedit quas quis? Id dolorum reiciendis,
            error adipisci corporis quis magni cum quasi sed nemo nesciunt.`}
            </span>
          </div>
        </div>
      </div>

      {editClicked && <UpdateAccount />}
    </div>
  );
}

Profile.propTypes = {};

export default Profile;
