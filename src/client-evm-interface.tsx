import abi from "./abis/contracts/Ayeolakenny.sol/Ayeolakenny.json";
import address from "./abis/contractAddress.json";
import { getGlobalState, setGlobalState } from "./store";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider | any;
  }
}

const contractAddress = address.address;
const contractAbi = abi.abi;
const opensea_url = `https://testnets.opensea.io/assets/goerli/${contractAddress}/`;

const getEthereumContract = () => {
  const { ethereum } = window;
  const connectedAccount = getGlobalState("connectedAccount");

  if (connectedAccount) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    return contract;
  } else {
    return getGlobalState("contract");
  }
};

const isWalletConnected = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });

    window.ethereum.on("chainChanged", (chainId: number) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0]);
      await isWalletConnected();
    });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0]);
    } else {
      alert("Please connect wallet.");
      console.log("No accounts found");
    }
  } catch (err) {
    reportError(err);
  }
};

const connectWallet = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0]);
  } catch (err) {
    reportError(err);
  }
};

const payToMint = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = getEthereumContract();
    const amount = ethers.utils.parseEther("0.001");

    await contract?.payToMint({
      from: connectedAccount,
      value: amount._hex,
    });

    // await contract?.loadNfts();
    window.location.reload();
  } catch (err) {
    reportError(err);
  }
};

const loadNfts = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) return alert("Please install Metamask");

    const contract = getEthereumContract();
    const nfts: any[] = await contract?.getAllNFTs();

    setGlobalState("nfts", structuredNfts(nfts));
  } catch (err) {
    reportError(err);
  }
};

const structuredNfts = (nfts: any) =>
  nfts
    .map((nft: any) => ({
      id: Number(nft.id),
      url: opensea_url + nft.id,
      buyer: nft.buyer,
      imageURL: nft.imageURL,
      cost: parseInt(nft.cost._hex) / 10 ** 18,
      timestamp: new Date(nft.timestamp.toNumber()).getTime(),
    }))
    .reverse();

const reportError = (error: any) => {
  console.log(error.message);
  throw new Error("No ethereum object.");
};

export { isWalletConnected, connectWallet, payToMint, loadNfts };
