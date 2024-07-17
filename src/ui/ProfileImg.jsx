import PropTypes from "prop-types";
import { SUPABASE_Avatar_URL } from "../services/subabase";

function ProfileImg({ img, onClick }) {
  return (
    <img
      src={img ? img : `${SUPABASE_Avatar_URL}default.jpg`}
      alt=""
      className="w-full h-full object-cover"
      onClick={onClick}
    />
  );
}

ProfileImg.propTypes = { img: PropTypes.string, onClick: PropTypes.func };

export default ProfileImg;
