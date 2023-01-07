import Image from "next/image";

export const Footer = () => {
  return (
    <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
      <div className="w-full flex flex-col justify-between items-center my-4">
        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full text-center text-base text-white">
          <p className="mx-2 cursor-pointer">Explore</p>
          <p className="mx-2 cursor-pointer">Features</p>
          <p className="mx-2 cursor-pointer">Community</p>
        </div>
        <div className="flex justify-center items-center mt-2">
          <Image
            src="/assets/ethlogo.png"
            alt="ethlogo"
            width={100}
            height={100}
            className="w-8"
          />
          <span className="text-white text-sm">
            ayeolakenny (c) 2014 - 2023 with Love ❤ Ayeola️ Kehinde
          </span>
        </div>
      </div>
    </div>
  );
};
