import PropTypes from "prop-types";
import { useImgOverlay } from "../context/useImgOverlay";

function ImgOverlay() {
  const [imgOverlayShow, setImgOverlayShow] = useImgOverlay();
  return (
    <div className="w-screen h-screen bg-black/90 grid place-items-center absolute top-0 left-0 z-[10000000]">
      <div
        className="bg-transparent w-full h-full absolute"
        onClick={() =>
          setImgOverlayShow({
            show: false,
          })
        }
      ></div>
      <div className="bg-black/20 w-[600px] aspect-square p-2 rounded-2xl border-2 border-primary absolute z-50">
        <div className="w-full h-full rounded-2xl overflow-hidden">
          <img
            src={imgOverlayShow.img}
            className="w-full h-full object-cover"
            alt="img"
          />
        </div>
      </div>
    </div>
  );
}

ImgOverlay.propTypes = {
  src: PropTypes.string,
};

export default ImgOverlay;
