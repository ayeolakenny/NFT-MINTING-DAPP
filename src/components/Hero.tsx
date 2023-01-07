import Image from "next/image";
import { payToMint } from "../client-evm-interface";
import { setAlert, setGlobalState, useGlobalState } from "../store";

export const Hero = () => {
  const [nfts] = useGlobalState("nfts");
  const onMintNFT = async () => {
    setGlobalState("loading", {
      show: true,
      msg: "Minting new NFT to your account",
    });
    await payToMint()
      .then(() => setAlert("Minting successful...", "green"))
      .catch(() => setGlobalState("loading", { show: false, msg: "" }));
  };

  return (
    <div className="bg-[url('https://images.unsplash.com/photo-1672135483622-c5e769736c8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=79')] bg-no-repeat bg-cover ">
      <div className="flex flex-col justify-center items-center mx-auto py-10">
        <h1 className="text-white text-5xl font-boldi text-center">
          Ayeolakenny
          <br />
          <span className="text-gradient">NFTs</span> Collection
        </h1>

        <p className="text-white font-semibold text-sm mt-3">
          Mint and collect the hottest NFTs around.
        </p>

        <button
          className="shadow-xl shadow-black text-white bg-[#ab68ce] hover:bg-[#c8c2cc] p-2 rounded-full cursor-pointer my-4"
          onClick={onMintNFT}
        >
          Mint Now
        </button>

        <a
          href="https://ayeolakenny.vercel.app"
          className="flex justify-center space-x-2 items-center bg-[#000000ad] rounded-full my-4 pr-3 cursor-pointer"
          target="_blank"
        >
          <Image
            src="/assets/owner.jpeg"
            width={35}
            height={35}
            alt="avatar"
            className="object-contain rounded-full"
          />
          <div className="flex flex-col font-semibold text-white text-sm">
            <span>0x4f...146e</span>
            <span className="text-[#ab68ce]">ayeolakenny</span>
          </div>
        </a>

        <p className="text-sm font-medium text-center">
          Hey! My name is Kehinde and I'm a fullstack React.js/Node.js developer
          from Lagos, <br />
          Nigeria currently pursuing a degree in Computer Science. I aspire
          toward a career that will allow me to channel my creativity through
          crafting <br />
          scalable software and engaging experiences.
        </p>

        <ul className="flex flex-row justify-center space-x-2 items-center my-4">
          <a
            href="#"
            className="bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2"
          >
            <Image
              src="/assets/github_icon.png"
              width={50}
              height={50}
              alt="Github"
            />
          </a>
          <a
            href="#"
            className="bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2"
          >
            <Image
              src="/assets/facebook_icon.png"
              width={50}
              height={50}
              alt="Github"
            />
          </a>
          <a
            href="#"
            className="bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2"
          >
            <Image
              src="/assets/linkedIn_icon.png"
              width={50}
              height={50}
              alt="Github"
            />
          </a>
          <a
            href="#"
            className="bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2"
          >
            <Image
              src="/assets/twitter_icon.png"
              width={50}
              height={50}
              alt="Github"
            />
          </a>
          <a
            href="#"
            className="bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2"
          >
            <Image
              src="/assets/medium_icon.png"
              width={50}
              height={50}
              alt="Github"
            />
          </a>
        </ul>
        <div className="shadow-xl shadow-black flex justify-center items-center w-10 h-10 rounded-full bg-white cursor-pointer p-3 ml-4 text-black hover:bg-[#bd255f] hover:text-white transition-all duration-75 delay-100">
          <span className="text-sm font-bold">{nfts.length}/22</span>
        </div>
      </div>
    </div>
  );
};
