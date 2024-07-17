import { DotLoader } from "react-spinners";
import { PRIMARY_COLOR } from "../utils/constants";

const FullPageSppiner = () => {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <DotLoader size={40} color={PRIMARY_COLOR} />
    </div>
  );
};

export default FullPageSppiner;
