import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const ImgOverLayContext = createContext();
const ImgOverLayContextProvider = ({ children }) => {
  const [imgOverlayShow, setImgOverlayShow] = useState({
    show: false,
    img: null,
  });
  return (
    <ImgOverLayContext.Provider value={[imgOverlayShow, setImgOverlayShow]}>
      {children}
    </ImgOverLayContext.Provider>
  );
};

ImgOverLayContextProvider.propTypes = { children: PropTypes.any };
export default ImgOverLayContextProvider;
