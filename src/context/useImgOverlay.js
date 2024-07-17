import { useContext } from "react";
import { ImgOverLayContext } from "./ImgOverLayContext";

export function useImgOverlay() {
  const [imgOverlayShow, setImgOverlayShow] = useContext(ImgOverLayContext);
  return [imgOverlayShow, setImgOverlayShow];
}
