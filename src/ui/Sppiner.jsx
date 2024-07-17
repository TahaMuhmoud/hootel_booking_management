import { DotLoader } from "react-spinners";
import { PRIMARY_COLOR } from "../utils/constants";

const Sppiner = () => {
  return (
    <div className="w-full h-full grid place-items-center">
      <DotLoader size={40} color={PRIMARY_COLOR} />
    </div>
  );
};

export default Sppiner;
