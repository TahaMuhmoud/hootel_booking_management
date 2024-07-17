import PropTypes from "prop-types";

function GuestCard({ guest }) {
  return (
    <div className="flex items-center justify-between w-full bg-[#eee] rounded-full p-1">
      <div className="flex items-center gap-3">
        <div className="image h-16 aspect-square rounded-full overflow-hidden border-2 border-white ">
          <img src={guest.avatar} alt="" className="w-full h-full" />
        </div>
        <div className="info">
          <div className="text-xl font-bold">{guest.fullName}</div>
          <div className="text-lg text-[#3d3d3d]">{guest.email}</div>
        </div>
      </div>
      <div className="image h-16 aspect-square rounded-full overflow-hidden border-2 border-white">
        <img src={guest.countryFlag} alt="" className="w-full h-full" />
      </div>
    </div>
  );
}

GuestCard.propTypes = { guest: PropTypes.object };

export default GuestCard;
