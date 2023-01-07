import Image from "next/image";
import { connectWallet } from "../client-evm-interface";
import { useGlobalState, truncate } from "../store";

export const Header = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  return (
    <nav className="w-4/5 flex justify-between md:justify-center items-center py-4 mx-auto">
      <div className="flex flex-row justify-start items-center md:flex-[0.5] flex-initial">
        <Image
          src="/assets/ethlogo.png"
          alt="eth logo"
          width={60}
          height={24}
          className="cursor-pointer"
        />
        <span className="text-white text-2xl ml-2">Kehinde</span>
      </div>
      <ul className="md:flex md:flex-[0.5] text-white hidden list-none flex-row justify-between items-center flex-initial">
        <li className="mx-4 cursor-pointer">Explore</li>
        <li className="mx-4 cursor-pointer">Features</li>
        <li className="mx-4 cursor-pointer">Community</li>
      </ul>
      {connectedAccount ? (
        <button className="shadow-xl shadow-black text-white bg-[#ab68ce] hover:bg-[#c8c2cc] md:text-xs p-2 rounded-full cursor-pointer">
          {truncate(connectedAccount, 4, 4, 11)}
        </button>
      ) : (
        <button
          className="shadow-xl shadow-black text-white bg-[#ab68ce] hover:bg-[#c8c2cc] md:text-xs p-2 rounded-full cursor-pointer"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </nav>
  );
};
