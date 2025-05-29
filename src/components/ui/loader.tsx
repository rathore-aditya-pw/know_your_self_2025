import type { FC } from "react";

interface props {
  size?: number;
}
const Loader: FC<props> = ({ size = 32 }) => {
  return (
    <div
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      className="border-4 border-t-[#5a4bda] border-[#cfcfcf] rounded-full animate-spin"
    ></div>
  );
};

export default Loader;
