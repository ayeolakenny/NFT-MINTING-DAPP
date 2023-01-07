import Image from "next/image";
import { useEffect, useState } from "react";

export const Artworks = ({ artworks }: any) => {
  const [end, setEnd] = useState(4);
  const [count] = useState(4);
  const [nfts, setNfts] = useState([]);

  const getNfts = () => artworks.slice(0, end);

  useEffect(() => {
    setNfts(getNfts());
  }, [artworks, end]);

  return (
    <div className="bg-[#131835] py-10">
      <div className="w-4/5 mx-auto">
        <h4 className="text-gradient uppercase text-2xl">Artworks</h4>
        <div className="flex flex-wrap justify-center items-center mt-4">
          {nfts.map((nft: any, i: number) => (
            <a
              href={nft.url}
              target="_blank"
              key={i}
              className="relative shadow-xl shadow-black p-3 bg-white rounded-lg w-64 h-64 object-contain bg-no-repeat bg-cover overflow-hidden mr-2 mb-2 cursor-pointer transition-all duration-75 delay-100 hover:shadow-[#bd255f]"
              style={{ backgroundImage: `url(${nft.imageURL})` }}
            >
              <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center label-gradient p-2 w-full text-white text-sm">
                <p>ayeolakenny NFT #{nft.id}</p>
                <div className="flex justify-center items-center space-x-2">
                  <Image
                    src="/assets/ethlogo.png"
                    className="w-5 cursor-pointer"
                    width={50}
                    height={50}
                    alt="ayeolakenny-nft"
                  />
                  {nft.cost}
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="flex justify-center items-center mx-auto mt-4">
          {artworks.length > 0 && artworks.length > nfts.length ? (
            <button
              className="shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] p-2 rounded-full cursor-pointer my-4"
              onClick={() => setEnd(end + count)}
            >
              Load more
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
